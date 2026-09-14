import { QueryClient } from '@tanstack/react-query';
import { STALE_TIMES } from 'api/staleTimes';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIMES.list,
        gcTime: STALE_TIMES.gc,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: (failureCount, error) => {
          const status = error?.response?.status;
          if (status === 401 || status === 403 || status === 404) return false;
          if (!error?.response) return failureCount < 1;
          return failureCount < 2;
        },
      },
    },
  });
}
