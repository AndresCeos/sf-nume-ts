import Modal from 'react-modal';

import { AppProvider } from '@/context/AppProvider';
import { AppRoutes } from '@/router/AppRoutes';

import '@/utils/i18n';

Modal.setAppElement('#root');

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
