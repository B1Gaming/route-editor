import { useContext } from 'react';

import { SnackbarContext } from '@context/snackbar/SnackbarContext.tsx';

const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
};

export default useSnackbar;
