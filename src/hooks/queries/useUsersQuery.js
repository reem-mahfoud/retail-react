import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from 'api/users';
import { queryKeys } from 'api/queryKeys';
import { listQueryOptions } from 'api/queryOptions';
import { LIST_PAGE_SIZE } from 'lib/pagination';

export function useUsersQuery(
  {
    page = 1,
    pageSize = LIST_PAGE_SIZE,
    profileType,
    scope = 'all',
    search = '',
    branchId = null,
    departmentId = null,
    enabled = true,
  } = {},
  options = {},
) {
  const normalizedSearch = search?.trim() || '';

  return useQuery({
    queryKey: queryKeys.users.list({
      page,
      pageSize,
      scope,
      search: normalizedSearch,
      branchId,
      departmentId,
      profileType: profileType ?? null,
    }),
    queryFn: ({ signal }) =>
      fetchUsers({
        page,
        pageSize,
        search: normalizedSearch || undefined,
        branchId: branchId ?? undefined,
        departmentId: departmentId ?? undefined,
        ...(profileType ? { profileType } : {}),
        signal,
      }),
    enabled,
    ...listQueryOptions,
    ...options,
  });
}
