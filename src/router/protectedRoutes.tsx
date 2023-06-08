import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import MainLayout from '@/components/Layout/MainLayout';
import Spinner from '@/components/Spinner';
import ConsultantPage from '@/pages/dashboard/ConsultantPage';
import HomePage from '@/pages/dashboard/HomePage';

function App() {
  return (
    <MainLayout>
      <Suspense
        fallback={(
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        )}
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
}

const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/consultant', element: <ConsultantPage /> },
      { path: '/', element: <HomePage /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];

export default protectedRoutes;
