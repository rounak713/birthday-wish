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
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const ConfigProvider = ({ children }) => {
  const [appConfig, setAppConfig] = useState(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  // On mount: fetch from backend API (synced across all devices!)
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch(`${API_URL}/api/config`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`Failed to load config: ${res.status}`);
        }
        const data = await res.json();
        if (data && Object.keys(data).length > 0) {
          setAppConfig(deepMerge(defaultConfig, data));
        }
      } catch (e) {
        console.error('Database config load failed. Using bundled defaults only:', e.message);
      } finally {
        setIsLoaded(true);
      }
    };

    loadConfig();
  }, []);

  const updateConfig = async (newConfig) => {
    try {
      const res = await fetch(`${API_URL}/api/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
      if (!res.ok) throw new Error('Backend returned error');
      setAppConfig(newConfig);
      console.log('✅ Config synced to backend successfully');
      return { synced: true };
    } catch (e) {
      console.warn('⚠️ Backend sync failed, config not persisted:', e.message);
      return { synced: false, error: e.message };
    }
  };

  const resetConfig = async () => {
    try {
      const res = await fetch(`${API_URL}/api/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultConfig),
      });
      if (!res.ok) throw new Error('Backend returned error');
      setAppConfig(defaultConfig);
      return { synced: true };
    } catch (e) {
      console.warn('Could not reset backend config:', e.message);
      return { synced: false, error: e.message };
    }
  };

  return (
    <ConfigContext.Provider value={{ config: appConfig, updateConfig, resetConfig, isLoaded }}>
      {children}
    </ConfigContext.Provider>
  );
};
