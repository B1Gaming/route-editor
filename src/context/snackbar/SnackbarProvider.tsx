import { FC, useCallback, useEffect, useRef, useState } from 'react';

import Snackbar from '@components/common/Snackbar.tsx';
import { SnackbarContext } from '@context/snackbar/SnackbarContext.tsx';

const SnackbarProvider: FC<GenericProviderProps> = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState<SnackbarData>({ color: 'primary', message: '' });
  const [isHiding, setIsHiding] = useState(false);
  const { color, message } = snackbarData;
  const timeoutId = useRef(0);

  const hideSnackbar = useCallback(() => {
    setIsHiding(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setSnackbarData({ message: '' });
      timeoutId.current = setTimeout(() => {
        setIsHiding(false);
      }, 100)
    }, 400);
  }, []);

  useEffect(() => {
    if (message) {
      setIsHiding(false);
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        hideSnackbar();
      }, 5000);
    }
  }, [hideSnackbar, message]);

  return <SnackbarContext.Provider value={{
    setSnackbarData,
    snackbarData
  }}>
    {children}
    {message &&
      <Snackbar
      color={color}
      isHiding={isHiding}
      message={message}
      onClick={() => hideSnackbar()}
    />}
  </SnackbarContext.Provider>;
};

export default SnackbarProvider;
