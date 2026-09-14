import { NavLink } from 'react-router-dom';
import { usePrefetchDashboardRoute } from 'hooks/usePrefetchDashboardRoute';

export default function PrefetchNavLink({ to, prefetchPath, onPrefetch, ...props }) {
  const prefetchRoute = usePrefetchDashboardRoute();
  const targetPath = prefetchPath ?? to;

  const handlePrefetch = () => {
    if (onPrefetch) {
      onPrefetch(targetPath);
      return;
    }
    prefetchRoute(targetPath);
  };

  return (
    <NavLink
      to={to}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      {...props}
    />
  );
}
