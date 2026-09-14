/**
 * Sidebar footer user card: reads `useAuth()`, avatar from `avatar`/`photo` or email-based URL (Unavatar).
 * Assets: public/images/sidebar-profile/
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { useDismissableOverlay } from 'hooks/useDismissableOverlay';
import { emailAvatarUrl } from 'lib/emailAvatarUrl';
import { asOptionalTrimmedString, asTrimmedString } from 'lib/safeValues';

const CHEVRON = '/images/sidebar-profile/chevron-selector.png';
const DEFAULT_AVATAR = '/images/sidebar-profile/avatar-with-status.png';

function displayNameFromUser(user) {
  if (!user) return null;
  const fn = user.first_name != null ? String(user.first_name).trim() : '';
  const ln = user.last_name != null ? String(user.last_name).trim() : '';
  if (fn && ln) return `${fn} ${ln}`;
  if (fn) return fn;
  if (user.username) return String(user.username);
  return null;
}

export default function CradleSidebarUserCard({
  name: nameProp = 'Olivia Rhye',
  email: emailProp = 'olivia@cradle.com',
  avatarSrc: avatarProp = DEFAULT_AVATAR,
  className = '',
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = 'cradle-sidebar-account-menu';

  const name = displayNameFromUser(user) ?? nameProp;
  const email = asTrimmedString(user?.email) || emailProp;

  const fallbackAbsolute = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      return new URL(avatarProp, window.location.origin).href;
    } catch {
      return `${window.location.origin}${avatarProp.startsWith('/') ? '' : '/'}${avatarProp}`;
    }
  }, [avatarProp]);

  const preferredSrc = useMemo(() => {
    const direct =
      asOptionalTrimmedString(user?.avatar) ||
      asOptionalTrimmedString(user?.photo) ||
      '';
    if (direct) return direct;
    if (user && email) return emailAvatarUrl(email, fallbackAbsolute) || avatarProp;
    return avatarProp;
  }, [user, email, fallbackAbsolute, avatarProp]);

  const [avatarSrc, setAvatarSrc] = useState(preferredSrc);

  useEffect(() => {
    setAvatarSrc(preferredSrc);
  }, [preferredSrc]);

  useDismissableOverlay({
    open: menuOpen,
    onDismiss: () => setMenuOpen(false),
    containerRef: rootRef,
  });

  const roleLabel =
    user?.role_info?.name || user?.role
      ? String(user.role_info?.name || user.role || '')
          .replace(/_/g, ' ')
          .trim()
      : null;

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <div
      ref={rootRef}
      className={`relative flex w-full max-w-[274px] items-center gap-3 rounded-2xl border border-[#EAECF0] bg-white px-3 py-2.5 shadow-none ${className}`.trim()}
    >
      <div className="relative h-10 w-10 shrink-0" aria-hidden>
        <div className="h-full w-full overflow-hidden rounded-full bg-[#F2F4F7]">
          <img
            src={avatarSrc}
            alt=""
            className="h-full w-full object-cover object-center"
            onError={() => setAvatarSrc(avatarProp)}
          />
        </div>
        <span className="absolute bottom-0 right-0 box-border h-2.5 w-2.5 rounded-full border-2 border-white bg-[#12B76A]" />
      </div>

      <div className="min-w-0 flex-1 text-left">
        <p className="truncate font-semibold leading-5 text-[#101828]">{name}</p>
        <p className="truncate text-xs leading-4 text-[#667085]">{email}</p>
      </div>

      <button
        type="button"
        className="shrink-0 rounded-md p-1 text-[#98A2B3] outline-none transition hover:bg-[#F9FAFB] focus-visible:ring-2 focus-visible:ring-cradle-primary"
        aria-label="Account menu — who is signed in"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <img src={CHEVRON} alt="" width={20} height={20} className="block h-5 w-5 object-contain" />
      </button>

      {menuOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Current session"
          className="absolute bottom-full left-0 right-0 z-50 mb-2 rounded-xl border border-[#EAECF0] bg-white py-3 shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03)]"
        >
          <div className="border-b border-[#F2F4F7] px-3 pb-3">
            <p className="text-xs font-medium uppercase tracking-wide text-[#98A2B3]">Signed in as</p>
            <p className="mt-1 truncate text-sm font-semibold text-[#101828]">{name}</p>
            <p className="mt-0.5 truncate text-xs text-[#667085]">{email}</p>
            {user?.username ? (
              <p className="mt-1 truncate text-xs text-[#98A2B3]">
                Username: <span className="font-medium text-[#475467]">{user.username}</span>
              </p>
            ) : null}
            {roleLabel ? (
              <p className="mt-1 truncate text-xs text-[#98A2B3]">
                Role: <span className="font-medium text-[#475467]">{roleLabel}</span>
              </p>
            ) : null}
          </div>
          <div className="px-1 pt-1">
            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#B42318] transition hover:bg-[#FEF3F2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDA29B]"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
