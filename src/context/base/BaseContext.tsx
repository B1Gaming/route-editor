import { createContext, type Dispatch, type SetStateAction } from 'react';

import Point from '@entities/Point.ts';
import Route from '@entities/Route.ts';

interface BaseContextType {
  csvString: string;
  currentlyEditing: number;
  page: Pages;
  points: Point[];
  reset: () => void;
  routes: Route[];
  setCsvString: Dispatch<SetStateAction<string>>;
  setCurrentlyEditing: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<Pages>>;
  setPoints: Dispatch<SetStateAction<Point[]>>;
  setRoutes: Dispatch<SetStateAction<Route[]>>;
  setSettings: Dispatch<SetStateAction<Settings>>;
  setSettingsOpen: Dispatch<SetStateAction<boolean>>;
  settings: Settings;
  settingsOpen: boolean;
}

export const BaseContext = createContext<BaseContextType | undefined>(undefined);
