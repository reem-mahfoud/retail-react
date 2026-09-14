import { useQuery } from '@tanstack/react-query';
import { fetchRoles } from 'api/roles';
import { queryKeys } from 'api/queryKeys';
import { listQueryOptions } from 'api/queryOptions';
import { LIST_PAGE_SIZE } from 'lib/pagination';

export function useRolesQuery(
  {
    search = '',
    page = 1,
    pageSize = LIST_PAGE_SIZE,
    enabled = true,
  } = {},
  options = {},
) {
  const normalizedSearch = search?.trim() || '';

  return useQuery({
    queryKey: queryKeys.roles.list({ search: normalizedSearch, page, pageSize }),
    queryFn: ({ signal }) =>
      fetchRoles({
        page,
        pageSize,
        search: normalizedSearch || undefined,
        signal,
      }),
    enabled,
    ...listQueryOptions,
    ...options,
  });
}
