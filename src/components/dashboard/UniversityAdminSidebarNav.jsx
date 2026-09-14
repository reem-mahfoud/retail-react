import PrefetchNavLink from 'components/dashboard/PrefetchNavLink';
import { Building2 } from 'lucide-react';
import WebcamOutlineIcon from 'components/icons/WebcamOutlineIcon';
import AdminsOutlineIcon from 'components/icons/AdminsOutlineIcon';

/**
 * University admin navigation — matches the reference: Universities / Cameras / Admins.
 * Outline icons use the same stroke weight as the design (~1.67).
 */
/** Nav row — radius-4xl, 12×8 padding, 12px gap; inactive row bg white */
const rowBase =
  'flex min-h-[44px] w-full items-center gap-3 rounded-3xl px-3 py-2 text-left text-base font-semibold leading-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7F56D9]';

const iconClass = (active) =>
  active ? 'text-[#7F56D9]' : 'text-[#717680]';

const labelClass = (active) =>
  active ? 'text-[#6941C6]' : 'text-[#252B37]';

function NavIcon({ active, children }) {
  return (
    <span className={`shrink-0 [&>svg]:h-5 [&>svg]:w-5 ${iconClass(active)}`} aria-hidden>
      {children}
    </span>
  );
}

export default function UniversityAdminSidebarNav({ className = '' }) {
  return (
    <nav
      className={`flex w-full flex-col gap-0.5 ${className}`.trim()}
      aria-label="University admin navigation"
    >
      <PrefetchNavLink
        to="/dashboard/organizations"
        className={({ isActive }) =>
          [rowBase, isActive ? 'bg-[#F9F5FF]' : 'bg-white hover:bg-[#FAFAFA]'].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <NavIcon active={isActive}>
              <Building2 strokeWidth={1.67} />
            </NavIcon>
            <span className={labelClass(isActive)}>Universities</span>
          </>
        )}
      </PrefetchNavLink>

      <PrefetchNavLink
        to="/dashboard/cameras"
        className={({ isActive }) =>
          [rowBase, isActive ? 'bg-[#F9F5FF]' : 'bg-white hover:bg-[#FAFAFA]'].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <NavIcon active={isActive}>
              <WebcamOutlineIcon
                className="h-5 w-5"
                stroke={isActive ? '#7F56D9' : '#717680'}
              />
            </NavIcon>
            <span className={labelClass(isActive)}>Cameras</span>
          </>
        )}
      </PrefetchNavLink>

      <PrefetchNavLink
        to="/dashboard/users"
        className={({ isActive }) =>
          [rowBase, isActive ? 'bg-[#F9F5FF]' : 'bg-white hover:bg-[#FAFAFA]'].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <NavIcon active={isActive}>
              <AdminsOutlineIcon
                className="h-5 w-5"
                stroke={isActive ? '#7F56D9' : '#717680'}
              />
            </NavIcon>
            <span className={labelClass(isActive)}>Admins</span>
          </>
        )}
      </PrefetchNavLink>
    </nav>
  );
}
