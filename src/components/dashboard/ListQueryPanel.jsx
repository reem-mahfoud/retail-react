import DataStatus from 'components/dashboard/DataStatus';
import ListPaginationBar from 'components/dashboard/ListPaginationBar';

/**
 * Shared list body: query status, optional empty state, children, optional pagination.
 * @param {import('types/list').ListQueryPanelProps} props
 */
export default function ListQueryPanel({
  isLoading = false,
  isError = false,
  error = null,
  isFetching = false,
  onRetry,
  isEmpty = false,
  emptyState = null,
  children,
  showPagination = false,
  page = 1,
  totalPages = 0,
  paginationItems = [],
  onPageChange,
  paginationClassName = '',
  className = '',
}) {
  const showContent = !isLoading && !isError && !isEmpty;

  return (
    <>
      <div className={className}>
        <DataStatus
          isLoading={isLoading}
          isError={isError}
          error={error}
          isFetching={isFetching}
          onRetry={onRetry}
        />

        {!isLoading && !isError && isEmpty ? emptyState : null}

        {showContent ? children : null}
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
