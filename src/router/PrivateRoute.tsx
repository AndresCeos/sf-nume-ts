import { Navigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

function PrivateRoute({ children }: any) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
