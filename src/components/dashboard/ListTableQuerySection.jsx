import DataStatus from 'components/dashboard/DataStatus';
import ListPaginationBar from 'components/dashboard/ListPaginationBar';

/**
 * @typedef {import('types/list').ListQueryStatus} ListQueryStatus
 * @typedef {import('types/list').ListPaginationBarProps} ListPaginationBarProps
 */

/**
 * @typedef {ListQueryStatus & {
 *   colSpan: number,
 *   isEmpty?: boolean,
 *   emptyContent?: import('react').ReactNode,
 *   children?: import('react').ReactNode,
 * }} ListTableQueryBodyProps
 */

/** Loading / error / empty rows inside a `<tbody>`. */
export function ListTableQueryBody({
  colSpan,
  isLoading = false,
  isError = false,
  error = null,
  isFetching = false,
  onRetry,
  isEmpty = false,
  emptyContent = null,
  children,
}) {
  return (
    <>
      {isLoading || isError ? (
        <tr>
          <td colSpan={colSpan} className="p-0">
            <DataStatus
              isLoading={isLoading}
              isError={isError}
              error={error}
              isFetching={isFetching}
              onRetry={onRetry}
            />
          </td>
        </tr>
      ) : null}

      {!isLoading && !isError ? children : null}

      {!isLoading && !isError && isEmpty ? (
        <tr>
          <td colSpan={colSpan} className="py-12 text-center text-sm text-[#667085]">
            {emptyContent}
          </td>
        </tr>
      ) : null}
    </>
  );
}

/**
 * @typedef {ListQueryStatus & {
 *   tableClassName?: string,
 *   colSpan: number,
 *   thead: import('react').ReactNode,
 *   isEmpty?: boolean,
 *   emptyContent?: import('react').ReactNode,
 *   children?: import('react').ReactNode,
 *   showPagination?: boolean,
 *   page?: number,
 *   totalPages?: number,
 *   paginationItems?: import('types/list').PaginationItem[],
 *   onPageChange?: import('types/list').SetPageFn,
 *   paginationClassName?: string,
 * }} ListTableQuerySectionProps
 */

/** Table list: fetching bar, scroll wrapper, status rows, pagination footer. */
export default function ListTableQuerySection({
  isLoading = false,
  isError = false,
  error = null,
  isFetching = false,
  onRetry,
  tableClassName = 'w-full min-w-[720px] border-collapse text-left text-sm',
  colSpan,
  thead,
  isEmpty = false,
  emptyContent = null,
  children,
  showPagination = false,
  page = 1,
  totalPages = 0,
  paginationItems = [],
  onPageChange,
  paginationClassName = '',
}) {
  return (
    <>
      <DataStatus
        isFetching={isFetching && !isLoading && !isError}
        onRetry={onRetry}
      />

      <div className="overflow-x-auto">
        <table className={tableClassName}>
          {thead}
          <tbody>
            <ListTableQueryBody
              colSpan={colSpan}
              isLoading={isLoading}
              isError={isError}
              error={error}
              isFetching={isFetching}
              onRetry={onRetry}
              isEmpty={isEmpty}
              emptyContent={emptyContent}
            >
              {children}
            </ListTableQueryBody>
          </tbody>
        </table>
      </div>

      {showPagination && onPageChange ? (
        <ListPaginationBar
          page={page}
          totalPages={totalPages}
          paginationItems={paginationItems}
          onPageChange={onPageChange}
          className={paginationClassName}
        />
      ) : null}
    </>
  );
}
