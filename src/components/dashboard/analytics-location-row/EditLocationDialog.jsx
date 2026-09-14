import { useEffect, useMemo, useState } from 'react';

export default function EditLocationDialog({
  open,
  title = 'Edit location',
  initialValue = '',
  onClose,
  onConfirm,
}) {
  const [draft, setDraft] = useState(initialValue);

  const trimmed = useMemo(() => draft.trim(), [draft]);

  useEffect(() => {
    if (open) setDraft(initialValue ?? '');
  }, [open, initialValue]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-location-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-[#E9EAEB] bg-white p-6 shadow-xl">
        <h2 id="edit-location-title" className="text-lg font-semibold text-[#101828]">
          {title}
        </h2>

        <label className="mt-4 block text-sm font-medium text-[#344054]" htmlFor="edit-location-input">
          Location name
        </label>
        <input
          id="edit-location-input"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-[#D0D5DD] bg-white px-3.5 text-sm font-medium text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
          placeholder="At the entrance"
          autoFocus
        />

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onClose?.()}
            className="rounded-lg border border-[#D5D7DA] bg-white px-4 py-2 text-sm font-semibold text-[#414651] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!trimmed}
            onClick={() => onConfirm?.(trimmed)}
            className="rounded-lg bg-[#7F56D9] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6941C6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

