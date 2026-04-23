import React, { createContext, useContext, useState, useEffect } from 'react';
import { config as defaultConfig } from '../config';

const ConfigContext = createContext(null);

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
  const [appConfig, setAppConfig] = useState(defaultConfig);

  // Load from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('birthday_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // Force override any old Google Drive links that might be stuck in local storage
        if (parsed?.sounds?.backgroundMusic && parsed.sounds.backgroundMusic.includes('drive.google.com')) {
          parsed.sounds.backgroundMusic = "/b.mp3";
        }
        // Deep merge with default config to ensure new keys aren't lost
        setAppConfig({ ...defaultConfig, ...parsed });
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
  }, []);

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
