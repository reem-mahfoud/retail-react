import { useCallback, useEffect, useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

export const CAMERA_FORM_PLACEHOLDER = 'e.g. Website design';

export const CAMERA_FORM_INITIAL = {
  cameraName: '',
  ipCameras: '',
  userName: '',
  password: '',
  rtspUrl: '',
  streamUrl: '',
};

/** Stable empty defaults for the add flow (avoids resetting the form on every parent re-render). */
export const EMPTY_CAMERA_FORM_DEFAULTS = {};

const fieldConfig = [
  { key: 'cameraName', label: 'Camera Name', tooltip: 'Display name for this camera', type: 'text' },
  { key: 'ipCameras', label: 'IP Cameras', tooltip: 'IP address or hostname of the camera', type: 'text' },
  { key: 'userName', label: 'User Name', tooltip: 'Login username for the camera', type: 'text' },
  { key: 'password', label: 'Password', tooltip: 'Login password for the camera', type: 'password' },
  { key: 'rtspUrl', label: 'RTSP URL', tooltip: 'RTSP stream URL', type: 'text' },
  { key: 'streamUrl', label: 'Stream URL', tooltip: 'HTTP or other stream URL', type: 'text' },
];

const inputClassName =
  'h-11 w-full rounded-full border border-[#D0D5DD] bg-white py-2 pl-3.5 pr-11 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15';

function HelpInInput({ tooltip }) {
  return (
    <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
      <button
        type="button"
        className="peer inline-flex cursor-help rounded-full border-0 bg-transparent p-0.5 text-[#98A2B3] outline-none hover:text-[#667085] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
        aria-label={tooltip}
      >
        <HelpCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
      </button>
      <span className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 hidden w-max rounded-md bg-[#101828] px-2 py-1 text-[11px] font-medium text-white shadow-lg peer-hover:block peer-focus-visible:block">
        {tooltip}
      </span>
    </span>
  );
}

/**
 * Shared add/edit camera modal (same layout as design: header, 6 fields, Cancel + primary).
 */
export default function CameraFormDialog({
  open,
  onClose,
  onConfirm,
  title,
  primaryLabel,
  defaultValues = {},
  formPrefix = 'camera-form',
  titleId = 'camera-form-title',
  descId = 'camera-form-desc',
}) {
  const mergedDefaults = { ...CAMERA_FORM_INITIAL, ...defaultValues };
  const defaultsKey = open ? JSON.stringify(mergedDefaults) : '';

  const [form, setForm] = useState(() => ({
    ...CAMERA_FORM_INITIAL,
    ...defaultValues,
  }));

  useEffect(() => {
    if (!open) return;
    setForm({ ...CAMERA_FORM_INITIAL, ...defaultValues });
    // defaultsKey encodes defaultValues so we do not list defaultValues (unstable identity from parent).
  }, [open, defaultsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    onConfirm?.({ ...form });
    onClose?.();
  }, [form, onConfirm, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative w-full max-w-[480px] overflow-hidden rounded-[24px] bg-white shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_24px_48px_-12px_rgba(16,24,40,0.12)]">
        <div className="border-b border-[#EAECF0] px-6 pb-4 pt-6 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="text-lg font-semibold tracking-tight text-[#101828] sm:text-xl">
                {title}
              </h2>
              <p id={descId} className="mt-1.5 text-sm text-[#667085]">
                Please enter a name for this project.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg p-1.5 text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 sm:px-8">
          <div className="space-y-4">
            {fieldConfig.map(({ key, label, tooltip, type }) => {
              const inputId = `${formPrefix}-${key}`;
              return (
                <div key={key}>
                  <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-[#344054]">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      id={inputId}
                      type={type}
                      value={form[key]}
                      onChange={(e) => setField(key, e.target.value)}
                      placeholder={CAMERA_FORM_PLACEHOLDER}
                      autoComplete={key === 'password' ? (formPrefix.includes('edit') ? 'current-password' : 'new-password') : 'off'}
                      className={inputClassName}
                    />
                    <HelpInInput tooltip={tooltip} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 border-t border-[#EAECF0] px-6 py-5 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="h-12 min-h-[48px] flex-1 rounded-full border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-12 min-h-[48px] flex-1 rounded-full border border-[#6941C6] bg-[#7F56D9] text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/45 focus-visible:ring-offset-2"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
