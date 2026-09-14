import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'api/queryKeys';
import { referenceQueryOptions } from 'api/queryOptions';
import { fetchSmartCameras } from 'api/smartCameras';
import { LIST_PAGE_SIZE } from 'lib/pagination';

export function useSmartCamerasQuery(
  {
    auditoriumId = null,
    search = '',
    page = 1,
    pageSize = LIST_PAGE_SIZE,
    enabled = true,
  } = {},
  options = {},
) {
  const normalizedSearch = search?.trim() || '';

  return useQuery({
    queryKey: queryKeys.smartCameras.list({
      auditoriumId,
      search: normalizedSearch,
      page,
      pageSize,
    }),
    queryFn: ({ signal }) =>
      fetchSmartCameras({
        page,
        pageSize,
        auditoriumId: auditoriumId ?? undefined,
        search: normalizedSearch || undefined,
        signal,
      }),
    enabled,
    ...referenceQueryOptions,
    ...options,
  });
}
