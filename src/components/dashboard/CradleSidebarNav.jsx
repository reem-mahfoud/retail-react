import PrefetchNavLink from 'components/dashboard/PrefetchNavLink';
import {
  CradleNavIconAnalytics,
  CradleNavIconLive,
  CradleNavIconOrganizations,
  CradleNavIconDevices,
  CradleNavIconDeviceUpdate,
  CradleNavIconCameras,
  CradleNavIconUsers,
} from 'components/dashboard/cradleNavIcons';

/**
 * Sidebar aligned to design SVG (290px rail, 40px rows, 4px gap, active pill #F9F5FF).
 * Main sections use NavLink to dashboard routes.
 */

const rowBase =
  'flex h-10 w-full max-w-[274px] items-center gap-5 rounded-[20px] px-[14px] text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cradle-primary';

export default function CradleSidebarNav({ className = '' }) {
  return (
    <nav
      className={`flex w-full flex-col gap-1 px-2 py-4 ${className}`.trim()}
      aria-label="Main navigation"
    >
      <PrefetchNavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          [
            rowBase,
            isActive
              ? 'bg-[#F9F5FF] font-semibold'
              : 'bg-white font-medium hover:bg-[#F9FAFB]',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <span className={isActive ? 'text-[#7F56D9]' : 'text-[#717680]'} aria-hidden>
              <CradleNavIconAnalytics />
            </span>
            <span className={isActive ? 'text-[#6941C6]' : 'text-[#252B37]'}>Analytics</span>
          </>
        )}
      </PrefetchNavLink>

      <PrefetchNavLink
        to="/dashboard/live"
        className={({ isActive }) =>
          [
            rowBase,
            isActive
              ? 'bg-[#F9F5FF] font-semibold'
              : 'bg-white font-medium hover:bg-[#F9FAFB]',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <span className={isActive ? 'text-[#7F56D9]' : 'text-[#717680]'} aria-hidden>
              <CradleNavIconLive />
            </span>
            <span className={isActive ? 'text-[#6941C6]' : 'text-[#414651]'}>Live</span>
          </>
        )}
      </PrefetchNavLink>

      <PrefetchNavLink
        to="/dashboard/organizations"
        className={({ isActive }) =>
          [
            rowBase,
            isActive
              ? 'bg-[#F9F5FF] font-semibold'
              : 'bg-white font-medium hover:bg-[#F9FAFB]',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <span className={isActive ? 'text-[#7F56D9]' : 'text-[#717680]'} aria-hidden>
              <CradleNavIconOrganizations />
            </span>
            <span className={isActive ? 'text-[#6941C6]' : 'text-[#414651]'}>Organizations</span>
          </>
        )}
      </PrefetchNavLink>

      <PrefetchNavLink
        to="/dashboard/edge-devices"
        className={({ isActive }) =>
          [
            rowBase,
            isActive
              ? 'bg-[#F9F5FF] font-semibold'
              : 'bg-white font-medium hover:bg-[#F9FAFB]',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <span className={isActive ? 'text-[#7F56D9]' : 'text-[#717680]'} aria-hidden>
              <CradleNavIconDevices />
            </span>
            <span className={isActive ? 'text-[#6941C6]' : 'text-[#414651]'}>Device management</span>
          </>
        )}
      </PrefetchNavLink>
      <PrefetchNavLink
        to="/dashboard/device-update"
        className={({ isActive }) =>
          [
            rowBase,
            isActive
              ? 'bg-[#F9F5FF] font-semibold'
              : 'bg-white font-medium hover:bg-[#F9FAFB]',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <span className={isActive ? 'text-[#7F56D9]' : 'text-[#717680]'} aria-hidden>
              <CradleNavIconDeviceUpdate />
            </span>
            <span className={isActive ? 'text-[#6941C6]' : 'text-[#414651]'}>Device Update</span>
          </>
        )}
      </PrefetchNavLink>
      <PrefetchNavLink
        to="/dashboard/cameras"
        className={({ isActive }) =>
          [
            rowBase,
            isActive
              ? 'bg-[#F9F5FF] font-semibold'
              : 'bg-white font-medium hover:bg-[#F9FAFB]',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <span className={isActive ? 'text-[#7F56D9]' : 'text-[#717680]'} aria-hidden>
              <CradleNavIconCameras />
            </span>
            <span className={isActive ? 'text-[#6941C6]' : 'text-[#414651]'}>Cameras</span>
          </>
        )}
      </PrefetchNavLink>
      <PrefetchNavLink
        to="/dashboard/users"
        className={({ isActive }) =>
          [
            rowBase,
            isActive
              ? 'bg-[#F9F5FF] font-semibold'
              : 'bg-white font-medium hover:bg-[#F9FAFB]',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            <span className={isActive ? 'text-[#7F56D9]' : 'text-[#717680]'} aria-hidden>
              <CradleNavIconUsers />
            </span>
            <span className={isActive ? 'text-[#6941C6]' : 'text-[#414651]'}>Users</span>
          </>
        )}
      </PrefetchNavLink>
    </nav>
  );
}
