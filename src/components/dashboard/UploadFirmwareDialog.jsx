import { useCallback, useEffect, useRef, useState } from 'react';
import { Trash2, UploadCloud, X } from 'lucide-react';

const MAX_BYTES = 400 * 1024 * 1024;

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
  const mb = bytes / (1024 * 1024);
  if (mb < 1024) return `${mb >= 10 || mb === Math.floor(mb) ? Math.round(mb) : mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

function ExeFileIllustration({ className = '' }) {
  return (
    <div className={`relative shrink-0 ${className}`.trim()} aria-hidden>
      <svg width="56" height="64" viewBox="0 0 56 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 4h28l12 12v44a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z"
          fill="#F9FAFB"
          stroke="#D0D5DD"
          strokeWidth="1.5"
        />
        <path d="M36 4v12h12" stroke="#D0D5DD" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="14" y="38" width="28" height="14" rx="3" fill="#2E90FA" />
        <text
          x="28"
          y="48.5"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          EXE
        </text>
      </svg>
    </div>
  );
}

function FileExeThumb({ className = '' }) {
  return (
    <div className={`relative h-11 w-9 shrink-0 ${className}`.trim()} aria-hidden>
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <path
          d="M4 2h16l8 8v28a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
          fill="white"
          stroke="#D0D5DD"
          strokeWidth="1.2"
        />
        <path d="M20 2v8h8" stroke="#D0D5DD" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="6" y="30" width="22" height="11" rx="2" fill="#7F56D9" />
        <text
          x="17"
          y="38.5"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          EXE
        </text>
      </svg>
    </div>
  );
}

export default function UploadFirmwareDialog({ open, onClose, onConfirm }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!open) return;
    setFile(null);
    setError('');
    setDragOver(false);
    setUploadProgress(0);
    progressRef.current = 0;
  }, [open]);

  const resetAndClose = useCallback(() => {
    setFile(null);
    setError('');
    setDragOver(false);
    setUploadProgress(0);
    progressRef.current = 0;
    onClose?.();
  }, [onClose]);

  const clearFile = useCallback(() => {
    setFile(null);
    setError('');
    setUploadProgress(0);
    progressRef.current = 0;
  }, []);

  /** Simulated upload/read progress — updates bar and percentage. */
  useEffect(() => {
    if (!file) {
      setUploadProgress(0);
      progressRef.current = 0;
      return undefined;
    }
    let cancelled = false;
    setUploadProgress(0);
    progressRef.current = 0;
    const started = performance.now();
    const durationMs = 2800;
    const tick = (now) => {
      if (cancelled) return;
      const t = Math.min(1, (now - started) / durationMs);
      const eased = 1 - (1 - t) ** 2;
      const next = Math.round(eased * 100);
      if (next !== progressRef.current) {
        progressRef.current = next;
        setUploadProgress(next);
      }
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [file]);

  const validateAndSet = useCallback((f) => {
    setError('');
    if (!f) {
      setFile(null);
      return;
    }
    const name = f.name.toLowerCase();
    if (!name.endsWith('.exe')) {
      setFile(null);
      setError('Please choose a .exe file.');
      return;
    }
    if (f.size > MAX_BYTES) {
      setFile(null);
      setError('File must be 400 MB or smaller.');
      return;
    }
    setFile(f);
  }, []);

  const onInputChange = useCallback(
    (e) => {
      const f = e.target.files?.[0];
      validateAndSet(f ?? null);
      e.target.value = '';
    },
    [validateAndSet],
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0];
      validateAndSet(f ?? null);
    },
    [validateAndSet],
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const canSubmit = Boolean(file);

  const handleSubmit = useCallback(() => {
    if (!canSubmit || !file) return;
    onConfirm?.(file);
    resetAndClose();
  }, [canSubmit, file, onConfirm, resetAndClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-firmware-title"
      aria-describedby="upload-firmware-desc"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[24px] bg-white shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_24px_48px_-12px_rgba(16,24,40,0.12)]">
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#98A2B3] transition hover:bg-[#F9FAFB] hover:text-[#667085] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>

        <div className="px-8 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
          <h2 id="upload-firmware-title" className="pr-10 text-xl font-semibold tracking-tight text-[#101828] sm:text-2xl">
            Upload files
          </h2>
          <p id="upload-firmware-desc" className="mt-2 text-sm leading-relaxed text-[#667085] sm:text-base">
            Upload firmware file for selected devices.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".exe,application/x-msdownload"
            className="sr-only"
            onChange={onInputChange}
            aria-label="Choose firmware .exe file"
          />

          {!file ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={`mt-8 flex w-full items-stretch gap-4 rounded-2xl border-2 border-[#7F56D9] bg-[#FAFAFA] px-5 py-8 text-left transition sm:px-6 sm:py-10 ${
                dragOver ? 'bg-[#F9F5FF] ring-2 ring-[#7F56D9]/25' : 'hover:bg-[#F9F5FF]/50'
              } focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30`}
            >
              <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E9EAEB] bg-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                  <UploadCloud className="h-7 w-7 text-[#7F56D9]" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="mt-5 text-sm sm:text-base">
                  <span className="font-semibold text-[#7F56D9]">Click to upload</span>
                  <span className="font-normal text-[#667085]"> or drag and drop file</span>
                </span>
                <span className="mt-2 text-xs text-[#98A2B3] sm:text-sm">.exe (max. 400 MB)</span>
                {error ? (
                  <span className="mt-2 text-xs font-medium text-[#D92D20]" role="alert">
                    {error}
                  </span>
                ) : null}
              </div>
              <ExeFileIllustration className="hidden self-center sm:block" />
            </button>
          ) : (
            <div className="relative mt-8 rounded-xl border border-[#E9EAEB] bg-[#FAFAFA] p-4 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] sm:p-5">
              <button
                type="button"
                onClick={clearFile}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#98A2B3] transition hover:bg-white hover:text-[#667085] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
                aria-label="Remove file"
              >
                <Trash2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </button>

              <div className="flex gap-3 pr-10">
                <FileExeThumb className="self-start" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#344054] sm:text-base" title={file.name}>
                    {file.name}
                  </p>
                  <p className="mt-0.5 text-sm text-[#667085]">{formatFileSize(file.size)}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 sm:mt-5">
                <div
                  className="relative h-2 min-h-[8px] flex-1 overflow-hidden rounded-full bg-[#EAECF0]"
                  role="progressbar"
                  aria-valuenow={uploadProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Upload progress"
                >
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-[#7F56D9] transition-[width] duration-100 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-medium tabular-nums text-[#667085]">
                  {uploadProgress}%
                </span>
              </div>
            </div>
          )}

          <div className="mt-8 flex w-full gap-3">
            <button
              type="button"
              onClick={resetAndClose}
              className="h-12 min-h-[48px] flex-1 rounded-full border border-[#D0D5DD] bg-white text-sm font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className={`h-12 min-h-[48px] flex-1 rounded-full text-sm font-semibold transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 ${
                canSubmit
                  ? 'border border-[#6941C6] bg-[#7F56D9] text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#6941C6] focus-visible:ring-[#7F56D9]/45'
                  : 'cursor-not-allowed border border-[#E9EAEB] bg-[#F2F4F7] text-[#98A2B3] focus-visible:ring-[#98A2B3]/30'
              }`}
            >
              Update devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
