import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/Layout/MainLayout';
import Spinner from '@/components/Spinner';
import StatusBar from '@/components/StatusBar';
import ConsultProvider from '@/context/ConsultProvider';
import ConsultantPage from '@/pages/dashboard/ConsultantPage';
import HomePage from '@/pages/dashboard/HomePage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import LifePathPage from '@/pages/personal/LifePathPage';
import PinnaclePage from '@/pages/personal/PinnaclePage';
import TimeCirclePage from '@/pages/personal/TimeCirclePage';
import VibrationTimePage from '@/pages/personal/VibrationTimePage';

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
      { path: '/personal/pinnacle', element: <PinnaclePage /> },
      { path: '/personal/life-path', element: <LifePathPage /> },
      { path: '/personal/name', element: <HomePage /> },
      { path: '/personal/create-name', element: <HomePage /> },
      { path: '/personal/destiny-table', element: <HomePage /> },
      { path: '/personal/time-vibration', element: <VibrationTimePage /> },
      { path: '/personal/annual-returns', element: <HomePage /> },
      { path: '/personal/time-circle', element: <TimeCirclePage /> },
      { path: '/personal/annual-calendar', element: <HomePage /> },
      { path: '/personal/monthly-calendar', element: <HomePage /> },
      { path: '/consultant', element: <ConsultantPage /> },
      { path: '/config', element: <SettingsPage /> },
      { path: '/', element: <HomePage /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export default protectedRoutes;
