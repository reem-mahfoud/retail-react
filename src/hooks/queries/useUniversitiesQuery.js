import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'api/queryKeys';
import { listQueryOptions } from 'api/queryOptions';
import { fetchUniversities } from 'api/universities';
import { LIST_PAGE_SIZE } from 'lib/pagination';

export function useUniversitiesQuery(
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
    queryKey: queryKeys.universities.list({
      search: normalizedSearch,
      isActive,
      page,
      pageSize,
    }),
    queryFn: ({ signal }) =>
      fetchUniversities({
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
