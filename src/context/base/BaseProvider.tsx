import { type FC, useState } from 'react';

import { BaseContext } from '@context/base/BaseContext.tsx';
import Point from '@entities/Point.ts';
import Route from '@entities/Route.ts';
import type { GenericProviderProps, Settings, Views } from '@model/common';


const BaseProvider: FC<GenericProviderProps> = ({ children }) => {
  const defaultSettings: Settings = {
    darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  };
  const cookieArray = document.cookie.split('settings=');
  if (cookieArray.length === 2) {
    const settingsString = Number(cookieArray.pop()).toString(2);
    if (settingsString?.length) {
      let key: keyof Settings;
      let index = 0;
      for (key in defaultSettings) {
        defaultSettings[key] = !!Number(settingsString[index]);
        index++;
      }
    }
  }

  const [csvString, setCsvString] = useState<string>('');
  const [currentlyEditing, setCurrentlyEditing] = useState<number>(-1);
  const [points, setPoints] = useState<Point[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [view, setView] = useState<Views>('home');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const reset = () => {
    setCsvString('');
    setCurrentlyEditing(-1);
    setPoints([]);
    setRoutes([]);
    setView('home');
  };

  return (
    <BaseContext.Provider
      value={{
        csvString,
        currentlyEditing,
        points,
        reset,
        routes,
        setCsvString,
        setCurrentlyEditing,
        setPoints,
        setRoutes,
        setSettings,
        setSettingsOpen,
        settings,
        settingsOpen,
        setView,
        view
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export default BaseProvider;
