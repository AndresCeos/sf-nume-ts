import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

function PrivateRoute({ children }: any) {
  const { isLoggedIn, user } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  if (user?.role === 'admin' && location.pathname !== '/dashboard/admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  const hasSignupCompleted = user?.userFirstName && user?.userLastName;

  if (!hasSignupCompleted && user?.role === 'employee') {
    return <Navigate to="/verification/employee-welcome" replace />;
  }

  if (!user?.organizationId && user?.role === 'employer') {
    return <Navigate to="/verification/organization-information" replace />;
  }
  if (!user?.organization?.phoneNumber && user?.role === 'employer') {
    return <Navigate to="/verification/organization-details" replace />;
  }
  if (!user?.reimbursementMethod && user?.role === 'employee') {
    return <Navigate to="/verification/reimbursement-method" replace />;
  }

  if (user?.role === 'employee' && user.reimbursementMethod?.unverifiedEmail) {
    const state = {
      message: t('pleaseVerifyYourEmailAddress'),
      showChangeMethodLink: true,
    };
    return <Navigate to="/verification/verify-reimbursement-method" state={state} replace />;
  }

  if (user?.role === 'employee' && user.reimbursementMethod?.unverifiedPhone) {
    const state = {
      message: t('pleaseVerifyYourPhoneNumber'),
      showCodeForm: true,
    };
    return <Navigate to="/verification/verify-reimbursement-method" state={state} replace />;
  }

  if (user?.role === 'employee' && user.reimbursementMethod?.unverifiedEmail) {
    const state = {
      message: t('pleaseVerifyYourPhoneNumber'),
    };
    return <Navigate to="/verification/verify-reimbursement-method" state={state} replace />;
  }

  if (!user?.emailVerified) {
    return <Navigate to="/verification/verify-account" replace />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
