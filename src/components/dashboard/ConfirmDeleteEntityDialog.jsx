/**
 * Shared confirm-delete modal (Organizations, Branches, Buildings, Rooms).
 */
export default function ConfirmDeleteEntityDialog({
  open,
  title,
  entityName,
  description = 'This removes the row from the list (demo only).',
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-desc"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-[#E9EAEB] bg-white p-6 shadow-xl">
        <h2 id="confirm-delete-title" className="text-lg font-semibold text-[#101828]">
          {title}
        </h2>
        <p id="confirm-delete-desc" className="mt-2 text-sm text-[#535862]">
          Delete <span className="font-semibold text-[#101828]">{entityName}</span>? {description}
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#D5D7DA] bg-white px-4 py-2 text-sm font-semibold text-[#414651] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-[#D92D20] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B42318]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
