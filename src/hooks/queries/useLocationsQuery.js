import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'api/queryKeys';
import { listQueryOptions } from 'api/queryOptions';
import { fetchLocations } from 'api/locations';
import { LIST_PAGE_SIZE } from 'lib/pagination';

export function useLocationsQuery(
  {
    search = '',
    isActive = undefined,
    page = 1,
    pageSize = LIST_PAGE_SIZE,
    enabled = true,
  } = {},
  options = {},
) {
  const normalizedSearch = search?.trim() || '';

  return useQuery({
    queryKey: queryKeys.locations.list({
      search: normalizedSearch,
      isActive,
      page,
      pageSize,
    }),
    queryFn: ({ signal }) =>
      fetchLocations({
        page,
        pageSize,
        search: normalizedSearch || undefined,
        isActive,
        signal,
      }),
    enabled,
    ...listQueryOptions,
    ...options,
  });
}
