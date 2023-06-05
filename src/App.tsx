import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from '@/context/AuthProvider';
import Router from '@/router/Router';

import '@/utils/i18n';

Modal.setAppElement('#root');

function App() {
  return (
    <AuthProvider>
      <>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Toaster position="bottom-center" />
      </>
    </AuthProvider>
  );
}

export default App;
