import { useEffect, useState } from 'react';

export default function EditBuildingDialog({ open, row, onClose, onSave }) {
  const [name, setName] = useState('');
  const [entityCount, setEntityCount] = useState(0);
  const [quotaUsed, setQuotaUsed] = useState(0);
  const [quotaTotal, setQuotaTotal] = useState(10);

  useEffect(() => {
    if (!open || !row) return;
    setName(row.name);
    setEntityCount(row.entityCount);
    setQuotaUsed(row.quotaUsed);
    setQuotaTotal(row.quotaTotal);
  }, [open, row]);

  if (!open || !row) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const entities = Number.isFinite(Number(entityCount))
      ? Math.max(0, Math.floor(Number(entityCount)))
      : 0;
    const used = Number.isFinite(Number(quotaUsed)) ? Math.max(0, Math.floor(Number(quotaUsed))) : 0;
    const total = Number.isFinite(Number(quotaTotal)) ? Math.max(1, Math.floor(Number(quotaTotal))) : 1;
    onSave({ name: trimmed, entityCount: entities, quotaUsed: used, quotaTotal: total });
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="building-edit-form-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded-xl border border-[#E9EAEB] bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="building-edit-form-title" className="text-lg font-semibold text-[#101828]">
          Edit building
        </h2>
        <p className="mt-1 text-sm text-[#535862]">Update name, units count, and camera quota.</p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="bdg-edit-name" className="block text-sm font-medium text-[#414651]">
              Building name
            </label>
            <input
              id="bdg-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#D5D7DA] px-3 py-2 text-sm text-[#101828] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/25"
            />
          </div>
          <div>
            <label htmlFor="bdg-edit-entities" className="block text-sm font-medium text-[#414651]">
              Units (rooms)
            </label>
            <input
              id="bdg-edit-entities"
              type="number"
              min={0}
              value={entityCount}
              onChange={(e) => setEntityCount(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#D5D7DA] px-3 py-2 text-sm text-[#101828] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/25"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="bdg-edit-used" className="block text-sm font-medium text-[#414651]">
                Quota used
              </label>
              <input
                id="bdg-edit-used"
                type="number"
                min={0}
                value={quotaUsed}
                onChange={(e) => setQuotaUsed(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#D5D7DA] px-3 py-2 text-sm text-[#101828] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/25"
              />
            </div>
            <div>
              <label htmlFor="bdg-edit-total" className="block text-sm font-medium text-[#414651]">
                Quota total
              </label>
              <input
                id="bdg-edit-total"
                type="number"
                min={1}
                value={quotaTotal}
                onChange={(e) => setQuotaTotal(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#D5D7DA] px-3 py-2 text-sm text-[#101828] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/25"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#D5D7DA] bg-white px-4 py-2 text-sm font-semibold text-[#414651] shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#7F56D9] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#6941C6]"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
