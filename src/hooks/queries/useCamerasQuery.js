import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'api/queryKeys';
import { listQueryOptions } from 'api/queryOptions';
import { fetchCameras } from 'api/cameras';
import { LIST_PAGE_SIZE } from 'lib/pagination';

export function useCamerasQuery(
  {
    search = '',
    isActive = undefined,
    branchId = null,
    page = 1,
    pageSize = LIST_PAGE_SIZE,
    enabled = true,
  } = {},
  options = {},
) {
  const normalizedSearch = search?.trim() || '';

  return useQuery({
    queryKey: queryKeys.cameras.list({
      search: normalizedSearch,
      isActive,
      branchId,
      page,
      pageSize,
    }),
    queryFn: ({ signal }) =>
      fetchCameras({
        page,
        pageSize,
        search: normalizedSearch || undefined,
        isActive,
        branchId: branchId ?? undefined,
        signal,
      }),
    enabled,
    ...listQueryOptions,
    ...options,
  });
}
