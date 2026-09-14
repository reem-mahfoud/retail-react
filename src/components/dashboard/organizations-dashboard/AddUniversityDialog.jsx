import { useEffect, useRef, useState } from 'react';
import { asDataUrl } from 'lib/safeValues';

export default function AddUniversityDialog({ open, onClose, onSubmit, entityLabel = 'University' }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [logoDataUrl, setLogoDataUrl] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setName('');
      setComment('');
      setLogoDataUrl(null);
      if (fileRef.current) fileRef.current.value = '';
    }
  }, [open]);

  if (!open) return null;

  const onLogoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLogoDataUrl(asDataUrl(reader.result));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0A0D12]/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-university-title"
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
            <h2 id="add-university-title" className="text-xl font-semibold text-[#101828]">
              Add {entityLabel.toLowerCase()}
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
            <div className="mb-2 text-sm font-medium text-[#344054]">{entityLabel} name</div>
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
            <div className="mb-2 text-sm font-medium text-[#344054]">Logo</div>
            <div className="flex gap-4">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#EAECF0] bg-[#F9FAFB] text-xs font-semibold tracking-wide text-[#98A2B3]"
                aria-hidden
              >
                {logoDataUrl ? (
                  <img src={logoDataUrl} alt="" className="h-full w-full object-cover" draggable={false} />
                ) : (
                  'LOGO'
                )}
              </div>

              <div className="min-w-0 flex-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                  className="sr-only"
                  onChange={onLogoFile}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center rounded-[22px] border border-dashed border-[#D0D5DD] bg-white px-4 py-6 text-center transition hover:bg-[#F9FAFB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAECF0] bg-white shadow-sm">
                    <span className="text-lg text-[#667085]" aria-hidden>
                      ↑
                    </span>
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="font-semibold text-[#7F56D9]">Click to upload</span>{' '}
                    <span className="text-[#667085]">or drag and drop</span>
                  </div>
                  <div className="mt-1 text-xs text-[#667085]">JPG (max. 800x800px)</div>
                </button>
              </div>
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
            disabled={!name.trim()}
            onClick={() => {
              const trimmed = name.trim();
              if (!trimmed) return;
              onSubmit?.({ name: trimmed, comment: comment.trim() || undefined, logoUrl: logoDataUrl || undefined });
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
