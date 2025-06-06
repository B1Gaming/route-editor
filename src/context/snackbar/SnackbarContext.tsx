import { createContext, type Dispatch, type SetStateAction } from 'react';

interface SnackbarContextType {
  setSnackbarData: Dispatch<SetStateAction<SnackbarData>>;
  snackbarData: SnackbarData;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);
