import { useMemo, useState } from 'react';
import { useListSearchAndPage } from 'hooks/useListPagination';
import { listStatusToIsActive } from 'lib/listStatus';

/**
 * Shared list tab + search + server pagination state for dashboard hooks.
 * @param {string} [initialStatus]
 * @returns {import('types/list').ListDashboardFilters}
 */
export function useListDashboardFilters(initialStatus = 'active') {
  const [listStatus, setListStatus] = useState(initialStatus);
  const [search, setSearch] = useState('');
  const isActive = useMemo(
    () => listStatusToIsActive(listStatus),
    [listStatus],
  );
  const { debouncedSearch, page, setPage } = useListSearchAndPage(search, listStatus);

  return {
    listStatus,
    setListStatus,
    search,
    setSearch,
    isActive,
    debouncedSearch,
    page,
    setPage,
  };
}
