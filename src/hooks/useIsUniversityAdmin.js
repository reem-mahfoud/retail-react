import { useAuth } from 'context/AuthContext';
import { isUniversityAdmin } from 'lib/authRoutes';

/** @returns {boolean} */
export function useIsUniversityAdmin() {
  const { user } = useAuth();
  return isUniversityAdmin(user);
}
