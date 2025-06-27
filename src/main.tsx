import { createRoot } from 'react-dom/client';

import App from '@components/App.tsx';
import BaseProvider from '@context/base/BaseProvider.tsx';
import SnackbarProvider from '@context/snackbar/SnackbarProvider.tsx';

createRoot(document.querySelector('body')!).render(
  <BaseProvider>
    <SnackbarProvider>
      <App/>
    </SnackbarProvider>
  </BaseProvider>
);
