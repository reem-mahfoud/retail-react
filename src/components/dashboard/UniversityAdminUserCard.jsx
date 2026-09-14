/**
 * User card in the university admin sidebar — matches the reference (light frame, avatar, green status dot, chevron).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsUpDown } from 'lucide-react';
import { useAuth } from 'context/AuthContext';
import { useDismissableOverlay } from 'hooks/useDismissableOverlay';
import { emailAvatarUrl } from 'lib/emailAvatarUrl';
import { asOptionalTrimmedString, asTrimmedString } from 'lib/safeValues';

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

export default function UniversityAdminUserCard({
  name: nameProp = 'Olivia Rhye',
  email: emailProp = 'olivia@cradle.com',
  avatarSrc: avatarProp = DEFAULT_AVATAR,
  className = '',
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = 'university-admin-account-menu';

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

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <div
      ref={rootRef}
      className={`relative flex w-full min-h-[64px] items-center gap-3 rounded-full border border-[#E9EAEB] bg-white py-3 pl-3 pr-14 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ${className}`.trim()}
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
        <span className="absolute bottom-0 right-0 box-border h-2.5 w-2.5 rounded-full border-[1.5px] border-white bg-[#17B26A]" />
      </div>

      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-semibold leading-5 text-[#181D27]">{name}</p>
        <p className="truncate text-sm font-normal leading-5 text-[#535862]">{email}</p>
      </div>

      <button
        type="button"
        className="absolute right-2 top-1/2 flex h-10 w-10 shrink-0 -translate-y-1/2 items-center justify-center rounded-3xl p-1.5 text-[#A4A7AE] outline-none transition hover:bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-[#7F56D9]"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <ChevronsUpDown className="h-5 w-5" strokeWidth={1.67} aria-hidden />
      </button>

      {menuOpen ? (
        <div
          id={menuId}
          role="menu"
          className="absolute bottom-full left-0 right-0 z-50 mb-2 rounded-xl border border-[#E9EAEB] bg-white py-2 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            className="w-full px-3 py-2 text-left text-sm font-medium text-[#B42318] hover:bg-[#FEF3F2]"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
