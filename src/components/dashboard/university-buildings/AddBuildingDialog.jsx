import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

export default function AddBuildingDialog({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!open) {
      setName('');
      setAddress('');
      setComment('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0A0D12]/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-building-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-lg rounded-[28px] border border-[#EAECF0] bg-white p-6 shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="add-building-title" className="text-xl font-semibold text-[#101828]">
              Add building
            </h2>
            <p className="mt-1 text-sm text-[#667085]">Please enter a name for this project.</p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-[#98A2B3] transition hover:bg-[#F9FAFB] hover:text-[#667085] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="block text-2xl leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <div className="mb-2 text-sm font-medium text-[#344054]">Building name</div>
            <div className="relative">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Website design"
                className="h-12 w-full rounded-full border border-[#D0D5DD] bg-white px-5 pr-12 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/20"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB] text-xs font-semibold text-[#667085]"
                aria-label="Help"
                tabIndex={-1}
              >
                ?
              </button>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-medium text-[#344054]">
              Address <span className="text-[#7F56D9]">*</span>
            </div>
            <div className="flex h-12 overflow-hidden rounded-full border border-[#D0D5DD] bg-white focus-within:ring-2 focus-within:ring-[#7F56D9]/20">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="min-w-0 flex-1 bg-transparent px-5 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3]"
              />
              <div className="w-px bg-[#EAECF0]" aria-hidden />
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 text-sm font-semibold text-[#344054] hover:bg-[#F9FAFB]"
                onClick={() => {}}
              >
                <MapPin className="h-5 w-5 text-[#667085]" strokeWidth={2} aria-hidden />
                Map
              </button>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#344054]">
              Comment
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB] text-[10px] font-semibold text-[#667085]">
                ?
              </span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Website design"
              rows={4}
              className="w-full resize-none rounded-[22px] border border-[#D0D5DD] bg-white px-5 py-4 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/20"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            className="h-12 flex-1 rounded-full border border-[#D0D5DD] bg-white px-6 text-sm font-semibold text-[#344054] shadow-sm hover:bg-[#F9FAFB]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-12 flex-1 rounded-full bg-[#7F56D9] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#6941C6] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!name.trim() || !address.trim()}
            onClick={() => {
              const trimmed = name.trim();
              if (!trimmed || !address.trim()) return;
              onSubmit?.({ name: trimmed, address: address.trim(), comment: comment.trim() || undefined });
              onClose();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
