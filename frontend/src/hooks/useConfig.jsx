import React, { createContext, useContext, useState, useEffect } from 'react';
import { config as defaultConfig } from '../config';

const ConfigContext = createContext(null);

export const useConfig = () => useContext(ConfigContext);

// Deep merge: saved values always WIN over defaults (handles nested objects)
const deepMerge = (defaults, saved) => {
  const result = { ...defaults };
  for (const key in saved) {
    if (
      saved[key] !== null &&
      typeof saved[key] === 'object' &&
      !Array.isArray(saved[key]) &&
      typeof defaults[key] === 'object' &&
      !Array.isArray(defaults[key])
    ) {
      result[key] = deepMerge(defaults[key] || {}, saved[key]);
    } else {
      result[key] = saved[key];
    }
  }
  return result;
};

// Backend API URL — in dev it uses the Vite proxy, in prod set VITE_API_URL env var
const API_URL = import.meta.env.VITE_API_URL || '';

export const ConfigProvider = ({ children }) => {
  const [appConfig, setAppConfig] = useState(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  // On mount: fetch from backend API (synced across all devices!)
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch(`${API_URL}/api/config`);
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setAppConfig(deepMerge(defaultConfig, data));
          }
        }
      } catch (e) {
        // Backend not available — fallback to localStorage
        console.warn('Backend not available, using localStorage fallback:', e.message);
        try {
          const saved = localStorage.getItem('birthday_config');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed?.sounds?.backgroundMusic?.includes('drive.google.com')) {
              parsed.sounds.backgroundMusic = '/b.mp3';
            }
            setAppConfig(deepMerge(defaultConfig, parsed));
          }
        } catch (localErr) {
          console.error('localStorage fallback also failed:', localErr);
        }
      } finally {
        setIsLoaded(true);
      }
    };

    loadConfig();
  }, []);

  const updateConfig = async (newConfig) => {
    setAppConfig(newConfig);

    // Always save locally as instant fallback
    localStorage.setItem('birthday_config', JSON.stringify(newConfig));

    // Also push to backend so all devices get the update
    try {
      const res = await fetch(`${API_URL}/api/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
      if (!res.ok) throw new Error('Backend returned error');
      console.log('✅ Config synced to backend successfully');
    } catch (e) {
      console.warn('⚠️ Backend sync failed, config only saved locally:', e.message);
    }
  };

  const resetConfig = async () => {
    setAppConfig(defaultConfig);
    localStorage.removeItem('birthday_config');
    try {
      await fetch(`${API_URL}/api/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultConfig),
      });
    } catch (e) {
      console.warn('Could not reset backend config:', e.message);
    }
  };

  return (
    <ConfigContext.Provider value={{ config: appConfig, updateConfig, resetConfig, isLoaded }}>
      {children}
    </ConfigContext.Provider>
  );
};
