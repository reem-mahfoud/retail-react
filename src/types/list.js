/**
 * List / pagination UI types.
 *
 * @typedef {import('types/api').ApiErrorInput} ApiErrorInput
 */

/**
 * @typedef {number | 'ellipsis'} PaginationItem
 */

/**
 * @typedef {(value: number | ((prev: number) => number)) => void} SetPageFn
 */

/**
 * @typedef {Object} ListQueryStatus
 * @property {boolean} [isLoading]
 * @property {boolean} [isError]
 * @property {ApiErrorInput} [error]
 * @property {boolean} [isFetching]
 * @property {() => void} [onRetry]
 */

/**
 * @typedef {ListQueryStatus & {
 *   isEmpty?: boolean,
 *   emptyState?: import('react').ReactNode,
 *   children?: import('react').ReactNode,
 *   showPagination?: boolean,
 *   page?: number,
 *   totalPages?: number,
 *   paginationItems?: PaginationItem[],
 *   onPageChange?: SetPageFn,
 *   paginationClassName?: string,
 *   className?: string,
 * }} ListQueryPanelProps
 */

/**
 * @typedef {Object} PaginationMeta
 * @property {number} totalPages
 * @property {boolean} showPagination
 * @property {PaginationItem[]} paginationItems
 */

/**
 * @typedef {Object} ListSearchAndPage
 * @property {string} debouncedSearch
 * @property {number} page
 * @property {SetPageFn} setPage
 */

/**
 * Shared query + pagination fields returned by dashboard list hooks.
 * @typedef {ListQueryStatus & PaginationMeta & {
 *   page: number,
 *   setPage: SetPageFn,
 *   refetch: () => void,
 * }} ListDashboardQueryState
 */

/**
 * @typedef {Object} ListPaginationBarProps
 * @property {number} page
 * @property {number} totalPages
 * @property {PaginationItem[]} paginationItems
 * @property {SetPageFn} onPageChange
 * @property {string} [className]
 */

/**
 * @typedef {Object} DeleteTarget
 * @property {string | number} id
 * @property {string} name
 */

/**
 * @typedef {Object} ListDashboardFilters
 * @property {string} listStatus
 * @property {(value: string) => void} setListStatus
 * @property {string} search
 * @property {(value: string) => void} setSearch
 * @property {boolean | null} isActive
 * @property {string} debouncedSearch
 * @property {number} page
 * @property {SetPageFn} setPage
 */

/**
 * @typedef {ListQueryStatus & PaginationMeta} PaginatedListQueryState
 * @property {Record<string, unknown> | null | undefined} [data]
 * @property {() => void} refetch
 */

/**
 * @template TRow
 * @typedef {Object} DashboardOverlaysState
 * @property {string | number | null} editingId
 * @property {TRow | null} editingRow
 * @property {boolean} addOpen
 * @property {DeleteTarget | null} deleteTarget
 * @property {() => void} closeOverlays
 * @property {() => void} openAdd
 * @property {() => void} closeAdd
 * @property {() => void} closeEdit
 * @property {() => void} closeDelete
 * @property {(id: string | number) => void} requestEdit
 * @property {(row: TRow, getLabel: (row: TRow) => string) => void} openDeleteForRow
 * @property {(id: string | number, getLabel: (row: TRow) => string) => void} openDeleteById
 * @property {(deleteRow: (id: string | number) => void) => void} confirmDelete
 */

/**
 * @typedef {import('@tanstack/react-query').UseQueryResult<Record<string, unknown>>} ListQueryResult
 */

export {};
