import { createContext, type Dispatch, type SetStateAction } from 'react';

import type { SnackbarData } from '@model/common';

interface SnackbarContextType {
  setSnackbarData: Dispatch<SetStateAction<SnackbarData>>;
  snackbarData: SnackbarData;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);
