import { useCallback, useEffect, useState } from 'react';
import { HelpCircle, MapPin } from 'lucide-react';

function FieldHelpIcon({ label }) {
  return (
    <span className="inline-flex text-[#98A2B3]" title={label} aria-hidden>
      <HelpCircle className="h-4 w-4" strokeWidth={1.75} />
    </span>
  );
}

export default function AddBranchDialog({ open, onClose, onSubmit }) {
  const [branchName, setBranchName] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!open) {
      setBranchName('');
      setAddress('');
      setComment('');
    }
  }, [open]);

  const openMap = useCallback(() => {
    const q = address.trim();
    if (!q) return;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }, [address]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const addr = address.trim();
    if (!addr) return;
    const display = addr || branchName.trim() || 'Address';
    onSubmit({
      addressLabel: display,
      entityCount: 2,
      quotaUsed: 23,
      quotaTotal: 25,
      logoUrl: null,
      branchName: branchName.trim(),
      comment: comment.trim(),
    });
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
        aria-labelledby="branch-add-dialog-title"
        aria-describedby="branch-add-dialog-desc"
        className="my-8 w-full max-w-[520px] rounded-[28px] border border-[#E9EAEB] bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 pr-2">
            <h2 id="branch-add-dialog-title" className="text-xl font-semibold text-[#101828]">
              Add branch
            </h2>
            <p id="branch-add-dialog-desc" className="mt-2 text-sm leading-5 text-[#667085]">
              Please enter a name for this project.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full p-2 text-[#98A2B3] transition hover:bg-[#F9FAFB] hover:text-[#667085] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="block text-2xl font-light leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={submit}>
          <div>
            <label htmlFor="branch-add-name" className="mb-2 block text-sm font-medium text-[#344054]">
              Branch name
            </label>
            <div className="relative">
              <input
                id="branch-add-name"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="e.g. Website design"
                autoComplete="organization"
                className="w-full rounded-full border border-[#D5D7DA] bg-white py-2.5 pl-4 pr-11 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
              />
              <span
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                aria-hidden
              >
                <HelpCircle className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="branch-add-address-input" className="mb-2 block text-sm font-medium text-[#344054]">
              Address <span className="text-[#7F56D9]">*</span>
            </label>
            <div className="flex overflow-hidden rounded-full border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] focus-within:border-[#7F56D9] focus-within:ring-2 focus-within:ring-[#7F56D9]/15">
              <input
                id="branch-add-address-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                required
                autoComplete="street-address"
                className="min-w-0 flex-1 border-0 bg-transparent py-2.5 pl-4 pr-3 text-sm text-[#101828] outline-none ring-0 placeholder:text-[#667085]"
              />
              <div className="w-px shrink-0 self-stretch bg-[#E9EAEB]" aria-hidden />
              <button
                type="button"
                className="flex shrink-0 items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#414651] transition hover:bg-[#F9FAFB] focus:outline-none focus-visible:bg-[#F9FAFB]"
                onClick={openMap}
              >
                <MapPin className="h-4 w-4 text-[#667085]" strokeWidth={1.75} aria-hidden />
                Map
              </button>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-1.5">
              <label htmlFor="branch-add-comment" className="text-sm font-medium text-[#344054]">
                Comment
              </label>
              <FieldHelpIcon label="Optional note for this branch" />
            </div>
            <textarea
              id="branch-add-comment"
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
