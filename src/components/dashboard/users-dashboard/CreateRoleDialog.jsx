import { useCallback, useEffect, useState } from 'react';
import { Link2, X } from 'lucide-react';

/** Swatch order matches design: gray → purple → red → orange → green → teal → blue → indigo → magenta */
export const ROLE_COLOR_SWATCHES = [
  { variant: 'default', dot: '#374151' },
  { variant: 'purple', dot: '#7C3AED' },
  { variant: 'red', dot: '#EF4444' },
  { variant: 'orange', dot: '#F97316' },
  { variant: 'green', dot: '#22C55E' },
  { variant: 'teal', dot: '#14B8A6' },
  { variant: 'blue', dot: '#3B82F6' },
  { variant: 'indigo', dot: '#6366F1' },
  { variant: 'magenta', dot: '#D946EF' },
];

export const CAPABILITY_ROWS = [
  { id: 'employee_schedule', label: 'Employee schedule', expandable: true },
  { id: 'department', label: 'Department', expandable: false },
  { id: 'human_resources', label: 'Human Resources', expandable: false },
  { id: 'user', label: 'User', expandable: false },
  { id: 'camera', label: 'Camera', expandable: false },
  { id: 'smart_camera', label: 'Smart camera', expandable: false },
  { id: 'role', label: 'Role', expandable: false },
  { id: 'analytics', label: 'Analytics', expandable: false },
];

const EMPLOYEE_PERM_KEYS = [
  { key: 'view', label: 'Can view' },
  { key: 'add', label: 'Can add' },
  { key: 'modify', label: 'Can modify' },
  { key: 'delete', label: 'Can delete' },
];

function Toggle({ on, onClick }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7C3AED]/40 focus-visible:ring-offset-2 ${
        on ? 'bg-[#7C3AED]' : 'bg-[#E4E7EC]'
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          on ? 'translate-x-[18px]' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function PermCheckbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-2 rounded-md py-1 pl-1 text-left text-sm text-[#344054] transition hover:bg-white/60"
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
          checked ? 'border-[#7C3AED] bg-[#7C3AED] text-white' : 'border-[#D0D5DD] bg-white'
        }`}
      >
        {checked ? (
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      {label}
    </button>
  );
}

export default function CreateRoleDialog({ open, onClose, onCreate }) {
  const [roleName, setRoleName] = useState('');
  const [variant, setVariant] = useState('default');
  const [toggles, setToggles] = useState(() =>
    CAPABILITY_ROWS.reduce((acc, r) => {
      acc[r.id] = r.id === 'employee_schedule';
      return acc;
    }, {}),
  );
  const [employeePerms, setEmployeePerms] = useState({
    view: false,
    add: true,
    modify: false,
    delete: false,
  });

  const resetForm = useCallback(() => {
    setRoleName('');
    setVariant('default');
    setToggles(
      CAPABILITY_ROWS.reduce((acc, r) => {
        acc[r.id] = r.id === 'employee_schedule';
        return acc;
      }, {}),
    );
    setEmployeePerms({ view: false, add: true, modify: false, delete: false });
  }, []);

  useEffect(() => {
    if (open) resetForm();
  }, [open, resetForm]);

  const setToggle = (id, value) => {
    setToggles((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreate = () => {
    const name = roleName.trim();
    if (!name) return;
    onCreate({
      name,
      variant,
      capabilities: { toggles: { ...toggles }, employeePerms: { ...employeePerms } },
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-role-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[min(92vh,880px)] w-full max-w-[920px] flex-col overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white shadow-xl">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#F2F4F7] px-6 pb-4 pt-5 sm:px-8">
          <div className="flex gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <span className="absolute h-12 w-12 rounded-full border border-[#D1FADF]/80" aria-hidden />
              <span className="absolute h-[52px] w-[52px] rounded-full border border-[#A6F4C5]/50" aria-hidden />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#6CE9A6]/60 bg-[#ECFDF3]">
                <Link2 className="h-5 w-5 text-[#12B76A]" strokeWidth={2} aria-hidden />
              </div>
            </div>
            <div>
              <h2 id="create-role-title" className="text-lg font-semibold text-[#101828] sm:text-xl">
                Creating a role
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#667085]">
                Roles created by you grant specific rights to users on this platform.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#101828] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7C3AED]/30"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="create-role-name" className="text-sm font-semibold text-[#101828]">
                  Role name
                </label>
                <p className="mt-0.5 text-sm text-[#667085]">Come up with a name for the role.</p>
                <input
                  id="create-role-name"
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="HR Manager..."
                  className="mt-3 h-11 w-full rounded-full border border-[#D0D5DD] bg-white px-4 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/25"
                  autoComplete="off"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#101828]">Role color</p>
                <p className="mt-0.5 text-sm text-[#667085]">
                  The color you choose will be displayed to users and in the list of roles.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {ROLE_COLOR_SWATCHES.map((s) => (
                    <button
                      key={s.variant}
                      type="button"
                      onClick={() => setVariant(s.variant)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition ring-offset-2 ${
                        variant === s.variant ? 'ring-2 ring-[#7C3AED] ring-offset-2' : 'ring-0'
                      }`}
                      aria-label={`Color ${s.variant}`}
                      aria-pressed={variant === s.variant}
                    >
                      <span
                        className="h-8 w-8 rounded-full border border-black/5 shadow-sm"
                        style={{ backgroundColor: s.dot }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex h-full min-h-[280px] flex-col rounded-2xl border border-[#EAECF0] bg-[#F9FAFB] p-4 sm:min-h-[320px] sm:p-5">
                <p className="text-sm font-semibold text-[#101828]">Role capabilities</p>
                <p className="mt-0.5 text-sm text-[#667085]">
                  The role you create will have the following rights.
                </p>
                <div className="mt-4 min-h-0 flex-1 space-y-0 overflow-y-auto pr-1">
                  {CAPABILITY_ROWS.map((row) => {
                    const active = toggles[row.id];
                    return (
                      <div key={row.id} className="border-b border-[#EAECF0] py-3 last:border-0">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-[#344054]">{row.label}</span>
                          <Toggle on={active} onClick={() => setToggle(row.id, !active)} />
                        </div>
                        {row.expandable && active ? (
                          <div className="mt-3 space-y-0 border-l-2 border-[#E4E7EC] pl-3">
                            {EMPLOYEE_PERM_KEYS.map(({ key, label }) => (
                              <PermCheckbox
                                key={key}
                                label={label}
                                checked={employeePerms[key]}
                                onChange={(v) => setEmployeePerms((p) => ({ ...p, [key]: v }))}
                              />
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 justify-end gap-3 border-t border-[#F2F4F7] px-6 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-full border border-[#D0D5DD] bg-white px-5 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7C3AED]/25"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={!roleName.trim()}
            className="h-11 rounded-full bg-[#7C3AED] px-6 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6D28D9] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7C3AED]/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
