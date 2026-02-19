import React, { createContext, useContext, useRef, useCallback } from 'react';
import { SpaceBackgroundHandle } from '../components/SpaceBackground';

interface SpaceContextValue {
  bgRef: React.RefObject<SpaceBackgroundHandle>;
  triggerWarp: () => void;
}

const SpaceContext = createContext<SpaceContextValue | null>(null);

export const SpaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bgRef = useRef<SpaceBackgroundHandle>(null);

  const triggerWarp = useCallback(() => {
    bgRef.current?.triggerWarp();
  }, []);

  return (
    <SpaceContext.Provider value={{ bgRef, triggerWarp }}>
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpace = (): SpaceContextValue => {
  const ctx = useContext(SpaceContext);
  if (!ctx) throw new Error('useSpace must be used inside SpaceProvider');
  return ctx;
};
