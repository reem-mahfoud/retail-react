import { useEffect, useMemo, useState } from 'react';
import { useDebouncedSearch } from 'hooks/useDebouncedValue';
import { getListTotal, getPaginationItems, LIST_PAGE_SIZE } from 'lib/pagination';

/**
 * @param {...(string | number | boolean | null | undefined)} resetDeps
 * @returns {{ page: number, setPage: import('types/list').SetPageFn }}
 */
export function useListPageState(...resetDeps) {
  const [page, setPage] = useState(1);
  const resetKey = resetDeps.map(String).join('|');

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  return { page, setPage };
}

/**
 * @param {{ total: number, page: number, setPage: import('types/list').SetPageFn, pageSize: number }} params
 * @returns {import('types/list').PaginationMeta}
 */
export function usePaginationMeta({ total, page, setPage, pageSize }) {
  const totalPages = useMemo(() => {
    if (!total) return 0;
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total, pageSize]);

  const showPagination = totalPages > 1;

  const paginationItems = useMemo(
    () => getPaginationItems(page, totalPages),
    [page, totalPages],
  );

  useEffect(() => {
    if (totalPages === 0) return;
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages, setPage]);

  return { totalPages, showPagination, paginationItems };
}

/**
 * Debounced search + page state for server-paginated lists.
 * @param {string} search
 * @param {...(string | number | boolean | null | undefined)} resetDeps
 * @returns {import('types/list').ListSearchAndPage}
 */
export function useListSearchAndPage(search, ...resetDeps) {
  const debouncedSearch = useDebouncedSearch(search);
  const { page, setPage } = useListPageState(debouncedSearch, ...resetDeps);
  return { debouncedSearch, page, setPage };
}

/**
 * @param {Record<string, unknown> | null | undefined} data
 * @param {string} itemsKey
 * @param {number} page
 * @param {import('types/list').SetPageFn} setPage
 * @param {number} [pageSize]
 * @param {number} [totalOverride]
 */
export function useListPagination(
  data,
  itemsKey,
  page,
  setPage,
  pageSize = LIST_PAGE_SIZE,
  totalOverride,
) {
  const listTotal = totalOverride ?? getListTotal(data, itemsKey);
  const meta = usePaginationMeta({ total: listTotal, page, setPage, pageSize });
  return { listTotal, ...meta };
}
