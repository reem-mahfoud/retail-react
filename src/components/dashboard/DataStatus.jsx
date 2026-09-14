import { Button, Spin } from 'antd';
import { getApiErrorMessage } from 'api/errors';

/**
 * @param {import('types/list').ListQueryStatus} props
 */
export default function DataStatus({
  isLoading = false,
  isError = false,
  error = null,
  isFetching = false,
  onRetry,
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E9EAEB] bg-[#FAFAFA] px-4 py-10 text-sm text-[#535862]">
        <Spin />
        <span>Loading…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-10 text-center text-sm text-red-800">
        <span>{getApiErrorMessage(error)}</span>
        {onRetry ? (
          <Button type="primary" size="small" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="mb-2 flex items-center justify-center gap-2 text-xs text-[#98A2B3]">
        <Spin size="small" />
        <span>Updating…</span>
      </div>
    );
  }

  return null;
}
