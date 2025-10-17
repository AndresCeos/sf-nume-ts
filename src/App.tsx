import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';

import { AppProvider } from '@/context/AppProvider';
import { AppRoutes } from '@/router/AppRoutes';

import '@/utils/i18n';

Modal.setAppElement('#root');

function App() {
  return (
    <AppProvider>
      <Toaster />
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
