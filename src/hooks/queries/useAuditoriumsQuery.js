import { useQuery } from '@tanstack/react-query';
import { fetchAuditoriums } from 'api/auditoriums';
import { queryKeys } from 'api/queryKeys';
import { listQueryOptions } from 'api/queryOptions';
import { LIST_PAGE_SIZE } from 'lib/pagination';

export function useAuditoriumsQuery(
  {
    buildingId = null,
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
    queryKey: queryKeys.auditoriums.list({
      buildingId,
      search: normalizedSearch,
      isActive,
      page,
      pageSize,
    }),
    queryFn: ({ signal }) =>
      fetchAuditoriums({
        page,
        pageSize,
        buildingId: buildingId ?? undefined,
        search: normalizedSearch || undefined,
        isActive,
        signal,
      }),
    enabled,
    ...listQueryOptions,
    ...options,
  });
}
