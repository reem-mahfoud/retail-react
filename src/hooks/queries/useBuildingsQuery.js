import { useQuery } from '@tanstack/react-query';
import { fetchBuildings } from 'api/buildings';
import { queryKeys } from 'api/queryKeys';
import { listQueryOptions } from 'api/queryOptions';
import { LIST_PAGE_SIZE } from 'lib/pagination';

export function useBuildingsQuery(
  {
    universityId = null,
    search = '',
    isActive = null,
    page = 1,
    pageSize = LIST_PAGE_SIZE,
    enabled = true,
  } = {},
  options = {},
) {
  const normalizedSearch = search?.trim() || '';

  return useQuery({
    queryKey: queryKeys.buildings.list({
      universityId,
      search: normalizedSearch,
      isActive,
      page,
      pageSize,
    }),
    queryFn: ({ signal }) =>
      fetchBuildings({
        page,
        pageSize,
        universityId: universityId ?? undefined,
        search: normalizedSearch || undefined,
        isActive,
        signal,
      }),
    enabled,
    ...listQueryOptions,
    ...options,
  });
}
