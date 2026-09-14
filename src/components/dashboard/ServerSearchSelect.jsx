import { useEffect, useMemo, useState } from 'react';
import { Select, Spin } from 'antd';
import { useDebouncedSearch } from 'hooks/useDebouncedValue';

/**
 * Ant Design Select with server-side search (`onSearch` → debounced `onSearchQuery`).
 */
export default function ServerSearchSelect({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Search…',
  loading = false,
  onSearchQuery,
  allowClear = true,
  className = '',
  minWidth = 160,
}) {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebouncedSearch(searchInput);

  useEffect(() => {
    if (onSearchQuery) onSearchQuery(debouncedSearch);
  }, [debouncedSearch, onSearchQuery]);

  const antOptions = useMemo(
    () => options.map((opt) => ({ value: String(opt.value), label: opt.label })),
    [options],
  );

  return (
    <div className={className} style={{ minWidth }}>
      {label ? (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      ) : null}
      <Select
        id={id}
        showSearch
        allowClear={allowClear}
        placeholder={placeholder}
        value={value || undefined}
        onChange={(next) => onChange(next ?? '')}
        onSearch={onSearchQuery ? setSearchInput : undefined}
        filterOption={onSearchQuery ? false : undefined}
        options={antOptions}
        notFoundContent={loading ? <Spin size="small" /> : null}
        loading={loading}
        className="w-full"
        popupMatchSelectWidth={false}
      />
    </div>
  );
}
