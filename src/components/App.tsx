import '@components/App.css';
import ViewRouter from '@components/router/ViewRouter.tsx';
import BaseProvider from '@context/base/BaseProvider.tsx';
import SnackbarProvider from '@context/snackbar/SnackbarProvider.tsx';

export default function App() {
  return <BaseProvider>
    <SnackbarProvider>
      <ViewRouter/>
    </SnackbarProvider>
  </BaseProvider>;
}
