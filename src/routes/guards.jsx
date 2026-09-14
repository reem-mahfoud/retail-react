import { Navigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import AuthLoadingScreen from 'components/auth/AuthLoadingScreen';
import {
  AUTH_ROUTES,
  getDashboardHomePath,
  isUniversityAdmin,
} from 'lib/authRoutes';
import AnalyticsDashboardMain from 'components/dashboard/AnalyticsDashboardMain';
import RoleManagementMain from 'components/dashboard/users-dashboard/RoleManagementMain';
import {
  LoginPage,
  ResetPasswordRequestPage,
  ResetPasswordVerifyCodePage,
  ResetPasswordNewPasswordPage,
} from 'pages/auth';

export function LoginRoute() {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <AuthLoadingScreen />;
  if (isAuthenticated) {
    return <Navigate to={getDashboardHomePath(user)} replace />;
  }
  return <LoginPage />;
}

export function DashboardIndexRoute() {
  const { user } = useAuth();
  if (isUniversityAdmin(user)) {
    return <Navigate to={AUTH_ROUTES.dashboardOrganizations} replace />;
  }
  return <AnalyticsDashboardMain />;
}

export function RoleManagementRoute() {
  const { user } = useAuth();
  if (isUniversityAdmin(user)) {
    return <Navigate to={AUTH_ROUTES.dashboardUsers} replace />;
  }
  return <RoleManagementMain />;
}

export function ResetPasswordRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.dashboard} replace />;
  }
  return <ResetPasswordRequestPage />;
}

export function ResetPasswordVerifyRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.dashboard} replace />;
  }
  return <ResetPasswordVerifyCodePage />;
}

export function ResetPasswordNewPasswordRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.dashboard} replace />;
  }
  return <ResetPasswordNewPasswordPage />;
}

export function RootRedirect() {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <AuthLoadingScreen />;
  if (!isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.login} replace />;
  }
  return <Navigate to={getDashboardHomePath(user)} replace />;
}
