import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import PublicRoute from './PublicRoute';

import Sidebar from '@/components/Sidebar';
import LoginPage from '@/pages/LoginPage';
import ConsultantPage from '@/pages/dashboard/ConsultantPage';
import HomePage from '@/pages/dashboard/HomePage';

function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      navbar...
      <div className="app">
        <Sidebar />
        <section className="app-content">
          {children}
        </section>
      </div>
    </>
  );
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
                <Route path="/" element={<HomePage />} />
                <Route path="/consultante" element={<ConsultantPage />} />
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
              <Route path="/" element={<LoginPage />} />
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
