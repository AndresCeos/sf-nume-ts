import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import PublicRoute from './PublicRoute';

import Home from '@/pages/dashboard/Home';
import Login from '@/pages/Login';

function MainContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col flex-1 w-full">{children}</div>;
}

function Router() {
  return (
    <Routes>
      <Route
        path="dashboard/*"
        element={(
          <MainContainer>
            <PrivateRoute>
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </PrivateRoute>
          </MainContainer>
        )}
      />
      <Route
        path="*"
        element={(
          <PublicRoute>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </PublicRoute>
        )}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Router;
