import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/Layout/MainLayout';
import Spinner from '@/components/Spinner';
import StatusBar from '@/components/StatusBar';
import ConsultProvider from '@/context/ConsultProvider';
import ConsultantPage from '@/pages/dashboard/ConsultantPage';
import HomePage from '@/pages/dashboard/HomePage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import PinnaclePage from '@/pages/personal/PinnaclePage';

function App() {
  return (
    <ConsultProvider>
      <MainLayout>
        <Suspense
          fallback={(
            <div className="h-full w-full flex items-center justify-center">
              <Spinner size="xl" />
            </div>
          )}
        >
          <StatusBar />
          <Outlet />
        </Suspense>
      </MainLayout>
    </ConsultProvider>
  );
}

const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/personal/pinaculo', element: <PinnaclePage /> },
      { path: '/personal/camino', element: <HomePage /> },
      { path: '/personal/nombre', element: <HomePage /> },
      { path: '/personal/crear-nombre', element: <HomePage /> },
      { path: '/personal/destino', element: <HomePage /> },
      { path: '/personal/tiempo', element: <HomePage /> },
      { path: '/personal/retornos', element: <HomePage /> },
      { path: '/personal/circulo-tiempo', element: <HomePage /> },
      { path: '/personal/calendario', element: <HomePage /> },
      { path: '/personal/calendario-mensual', element: <HomePage /> },
      { path: '/consultante', element: <ConsultantPage /> },
      { path: '/config', element: <SettingsPage /> },
      { path: '/', element: <HomePage /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export default protectedRoutes;
