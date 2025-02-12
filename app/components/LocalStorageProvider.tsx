'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const LocalStorageContext = createContext<{
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}>({
  getItem: () => null,
  setItem: () => {},
});

export function LocalStorageProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const value = {
    getItem: (key: string) => {
      if (isClient) {
        return localStorage.getItem(key);
      }
      return null;
    },
    setItem: (key: string, value: string) => {
      if (isClient) {
        localStorage.setItem(key, value);
      }
    },
  };

  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export const useLocalStorageContext = () => useContext(LocalStorageContext); 