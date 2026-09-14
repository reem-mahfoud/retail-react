import { useListPagination } from 'hooks/useListPagination';
import { LIST_PAGE_SIZE } from 'lib/pagination';

/**
 * Merges a React Query list result with shared pagination meta.
 * @param {import('types/list').ListQueryResult} queryResult
 * @param {string} itemsKey
 * @param {number} page
 * @param {import('types/list').SetPageFn} setPage
 * @param {number} [pageSize]
 * @returns {import('types/list').PaginatedListQueryState}
 */
export function usePaginatedListQuery(
  queryResult,
  itemsKey,
  page,
  setPage,
  pageSize = LIST_PAGE_SIZE,
) {
  const { data, isLoading, isError, error, isFetching, refetch } = queryResult;
  const { totalPages, showPagination, paginationItems } = useListPagination(
    data,
    itemsKey,
    page,
    setPage,
    pageSize,
  );

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    totalPages,
    showPagination,
    paginationItems,
  };
}
