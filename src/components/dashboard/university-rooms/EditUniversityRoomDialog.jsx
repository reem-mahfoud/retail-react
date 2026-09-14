import { useEffect, useState } from 'react';

export default function EditUniversityRoomDialog({ open, row, onClose, onSave }) {
  const [name, setName] = useState('');
  const [quotaUsed, setQuotaUsed] = useState('');
  const [quotaTotal, setQuotaTotal] = useState('');

  useEffect(() => {
    if (!open || !row) return;
    setName(row.name ?? '');
    setQuotaUsed(String(row.quotaUsed ?? 0));
    setQuotaTotal(String(row.quotaTotal ?? 0));
  }, [open, row]);

  if (!open || !row) return null;

  const parseIntSafe = (v) => {
    const n = Number.parseInt(String(v), 10);
    return Number.isFinite(n) ? Math.max(0, n) : 0;
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0A0D12]/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="uni-edit-room-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="uni-edit-room-title" className="text-lg font-semibold text-[#101828]">
              Edit room
            </h2>
            <p className="mt-1 text-sm text-[#667085]">Update details for this room.</p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#344054] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="block text-xl leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#344054]" htmlFor="uni-room-edit-name">
              Room name
            </label>
            <input
              id="uni-room-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-xl border border-[#D0D5DD] bg-white px-3 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/20"
              placeholder="Room name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#344054]" htmlFor="uni-room-edit-used">
                Used
              </label>
              <input
                id="uni-room-edit-used"
                value={quotaUsed}
                onChange={(e) => setQuotaUsed(e.target.value)}
                inputMode="numeric"
                className="mt-1.5 h-10 w-full rounded-xl border border-[#D0D5DD] bg-white px-3 text-sm text-[#101828] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344054]" htmlFor="uni-room-edit-total">
                Total
              </label>
              <input
                id="uni-room-edit-total"
                value={quotaTotal}
                onChange={(e) => setQuotaTotal(e.target.value)}
                inputMode="numeric"
                className="mt-1.5 h-10 w-full rounded-xl border border-[#D0D5DD] bg-white px-3 text-sm text-[#101828] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/20"
              />
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-end gap-3 border-t border-[#F2F4F7] pt-5">
          <button
            type="button"
            className="rounded-full border border-[#D5D7DA] bg-white px-4 py-2 text-sm font-semibold text-[#344054] shadow-sm hover:bg-[#F9FAFB]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-full bg-[#7F56D9] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#6941C6] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!name.trim()}
            onClick={() => {
              const trimmed = name.trim();
              if (!trimmed) return;
              onSave?.({
                name: trimmed,
                quotaUsed: parseIntSafe(quotaUsed),
                quotaTotal: parseIntSafe(quotaTotal),
              });
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
