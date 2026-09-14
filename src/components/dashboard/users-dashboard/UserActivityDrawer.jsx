
import { useMemo } from 'react';
import { History, X } from 'lucide-react';
import WebcamOutlineIcon from 'components/icons/WebcamOutlineIcon';
import { useDrawerEffects } from 'hooks/useDrawerEffects';

/** Demo timeline — camera-related changes over time. */
const ACTIVITY_GROUPS = [
  {
    id: 'g1',
    category: 'Cameras',
    date: '12/16/2024',
    items: [{ text: "Turning on camera 'At the Entrance'", time: '11:58 AM' }],
  },
  {
    id: 'g2',
    category: 'Cameras',
    date: '12/16/2024',
    items: [
      { text: "Changing 'Host Name'", time: '11:58 AM' },
      { text: "Changing 'IP Address'", time: '11:58 AM' },
      { text: "Changing 'MAC Address'", time: '11:58 AM' },
    ],
  },
  {
    id: 'g3',
    category: 'Cameras',
    date: '12/15/2024',
    items: [{ text: "Turning off camera 'Corridor B'", time: '4:22 PM' }],
  },
];

function firstName(fullName) {
  if (!fullName || typeof fullName !== 'string') return 'User';
  return fullName.trim().split(/\s+/)[0] || 'User';
}

export default function UserActivityDrawer({ open, onClose, user }) {
  const displayName = user?.name ?? 'User';
  const activityTitle = useMemo(
    () => `${firstName(displayName)}'s Activity`,
    [displayName],
  );

  useDrawerEffects(open, onClose);

  return (
    <>
      <div
        className={`fixed inset-0 z-[10054] bg-black/30 transition-opacity duration-300 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      />
      <aside
        className={`fixed right-0 top-0 z-[10055] flex h-full w-full max-w-[420px] flex-col border-l border-[#EAECF0] bg-white shadow-[-4px_0_24px_-4px_rgba(16,24,40,0.12)] transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
        aria-hidden={!open}
        aria-labelledby="user-activity-title"
      >
        <header className="shrink-0 border-b border-[#EAECF0] px-5 pb-4 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB] text-[#667085]">
                <History className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 id="user-activity-title" className="text-lg font-semibold text-[#101828]">
                  {activityTitle}
                </h2>
                <p className="mt-1 text-sm text-[#667085]">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg p-1.5 text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
              aria-label="Close activity panel"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
          <div className="relative">
            <div
              className="absolute bottom-6 left-[17px] top-2 w-px bg-[#EAECF0]"
              aria-hidden
            />

            <ul className="relative m-0 list-none space-y-0 p-0">
              {ACTIVITY_GROUPS.map((group) => (
                <li key={group.id} className="relative flex gap-3 pb-10 last:pb-2">
                  <div className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#EAECF0] bg-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                    <WebcamOutlineIcon className="h-4 w-4" stroke="#667085" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#101828]">{group.category}</span>
                      <span className="shrink-0 rounded-full bg-[#F2F4F7] px-2.5 py-0.5 text-xs font-semibold text-[#344054]">
                        {group.date}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {group.items.map((item) => (
                        <div
                          key={`${group.id}-${item.text}`}
                          className="rounded-xl border border-[#F2F4F7] bg-[#FAFAFA] px-3 py-2.5"
                        >
                          <p className="text-sm font-medium leading-snug text-[#101828]">{item.text}</p>
                          <p className="mt-1.5 text-xs font-semibold text-[#7F56D9]">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
