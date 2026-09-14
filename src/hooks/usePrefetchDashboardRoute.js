import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { prefetchDashboardRoute } from 'api/queryCache';

export function usePrefetchDashboardRoute() {
  const queryClient = useQueryClient();

  return useCallback(
    (path) => {
      void prefetchDashboardRoute(queryClient, path);
    },
    [queryClient],
  );
}
