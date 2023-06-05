import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PublicRoute({ children }: any) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
}

export default PublicRoute;
