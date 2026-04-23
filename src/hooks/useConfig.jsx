import React, { createContext, useContext, useState } from 'react';
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

export const ConfigProvider = ({ children }) => {
  // Initialize directly from localStorage so there is NO flash of default content on load
  const [appConfig, setAppConfig] = useState(() => {
    try {
      const savedConfig = localStorage.getItem('birthday_config');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        // Fix old Google Drive music links
        if (parsed?.sounds?.backgroundMusic?.includes('drive.google.com')) {
          parsed.sounds.backgroundMusic = '/b.mp3';
        }
        return deepMerge(defaultConfig, parsed);
      }
    } catch (e) {
      console.error('Failed to parse saved config:', e);
    }
    return defaultConfig;
  });

  const updateConfig = (newConfig) => {
    setAppConfig(newConfig);
    localStorage.setItem('birthday_config', JSON.stringify(newConfig));
  };

  const resetConfig = () => {
    setAppConfig(defaultConfig);
    localStorage.removeItem('birthday_config');
  };

  return (
    <ConfigContext.Provider value={{ config: appConfig, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
