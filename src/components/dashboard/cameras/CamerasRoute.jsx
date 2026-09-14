import { useIsUniversityAdmin } from 'hooks/useIsUniversityAdmin';
import CamerasManagementMain from './CamerasManagementMain';
import CradleCamerasManagementMain from './CradleCamerasManagementMain';

export default function CamerasRoute() {
  const isUniversityAdmin = useIsUniversityAdmin();
  if (isUniversityAdmin) {
    return <CamerasManagementMain />;
  }
  return <CradleCamerasManagementMain />;
}
