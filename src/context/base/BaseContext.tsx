import { createContext, type Dispatch, type SetStateAction } from 'react';

import type { Settings, Views } from '@model/common';

import Point from '@entities/Point.ts';
import Route from '@entities/Route.ts';

interface BaseContextType {
  csvString: string;
  currentlyEditing: number;
  points: Point[];
  reset: () => void;
  routes: Route[];
  setCsvString: Dispatch<SetStateAction<string>>;
  setCurrentlyEditing: Dispatch<SetStateAction<number>>;
  setPoints: Dispatch<SetStateAction<Point[]>>;
  setRoutes: Dispatch<SetStateAction<Route[]>>;
  setSettings: Dispatch<SetStateAction<Settings>>;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
  settings: Settings;
  settingsOpen: boolean;
  setView: Dispatch<SetStateAction<Views>>;
  view: Views;
}

export const BaseContext = createContext<BaseContextType | undefined>(undefined);
