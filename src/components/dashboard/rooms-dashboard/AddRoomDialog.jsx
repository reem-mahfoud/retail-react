import { useEffect, useState } from 'react';
import { HelpCircle } from 'lucide-react';

function AddRoomFieldHelp({ label }) {
  return (
    <span className="inline-flex text-[#98A2B3]" title={label} aria-hidden>
      <HelpCircle className="h-4 w-4" strokeWidth={1.75} />
    </span>
  );
}

export default function AddRoomDialog({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!open) {
      setName('');
      setComment('');
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    onSubmit({ name: trimmedName, comment: comment.trim() });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-[#0A0D12]/50 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-room-title"
        aria-describedby="add-room-desc"
        className="my-8 w-full max-w-[440px] rounded-[24px] border border-[#E9EAEB] bg-white p-8 shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08),0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_3px_3px_-1.5px_rgba(10,13,18,0.04)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 pr-2">
            <h2 id="add-room-title" className="text-xl font-semibold text-[#181D27]">
              Add room
            </h2>
            <p id="add-room-desc" className="mt-2 text-sm leading-5 text-[#535862]">
              Please enter a name for this project.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full p-2 text-[#A4A7AE] transition hover:bg-[#F9FAFB] hover:text-[#667085] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="block text-2xl font-light leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="add-room-name" className="mb-2 block text-sm font-medium text-[#414651]">
              Room name
            </label>
            <div className="relative">
              <input
                id="add-room-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Website design"
                autoComplete="off"
                className="w-full rounded-full border border-[#D5D7DA] bg-white py-2.5 pl-4 pr-11 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
              />
              <span
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                title="Display name for this room"
                aria-hidden
              >
                <HelpCircle className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-1.5">
              <label htmlFor="add-room-comments" className="text-sm font-medium text-[#414651]">
                Comments
              </label>
              <AddRoomFieldHelp label="Optional notes for this room" />
            </div>
            <textarea
              id="add-room-comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Website design"
              rows={5}
              className="w-full resize-y rounded-2xl border border-[#D5D7DA] bg-white px-4 py-3 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            <button
              type="button"
              className="rounded-full border border-[#D5D7DA] bg-white py-2.5 text-sm font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#7F56D9] py-2.5 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
