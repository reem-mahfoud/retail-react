import { Navigate } from 'react-router-dom';
import { AUTH_ROUTES } from 'lib/authRoutes';
import { useIsUniversityAdmin } from 'hooks/useIsUniversityAdmin';
import CradleLivePageMain from './CradleLivePageMain';

export default function CradleLiveRoute() {
  const isUniversityAdmin = useIsUniversityAdmin();
  if (isUniversityAdmin) {
    return <Navigate to={AUTH_ROUTES.dashboardOrganizations} replace />;
  }
  return <CradleLivePageMain />;
}
