import { Outlet } from 'react-router-dom';
import CradleLogo from 'components/login/CradleLogo';
import CradleLogoLockup from 'components/login/CradleLogoLockup';
import SkipToMainLink, {
  MAIN_FOCUS_ID,
} from 'components/dashboard/SkipToMainLink';
import CradleSidebarNav from 'components/dashboard/CradleSidebarNav';
import UniversityAdminSidebarNav from 'components/dashboard/UniversityAdminSidebarNav';
import UniversityAdminMetaCard from 'components/dashboard/UniversityAdminMetaCard';
import UniversityAdminUserCard from 'components/dashboard/UniversityAdminUserCard';
import CradleDeviceMetaCard from 'components/dashboard/CradleDeviceMetaCard';
import CradleSidebarUserCard from 'components/dashboard/CradleSidebarUserCard';
import { useIsUniversityAdmin } from 'hooks/useIsUniversityAdmin';
import {
  CRADLE_APP_VIEWPORT_BG,
  CRADLE_MAIN_COLUMN,
  CRADLE_SIDEBAR_ASIDE,
} from 'design/cradleDesignTokens';

/** Full viewport — sidebar stays put; only `<main>` scrolls. */
const SHELL_ROOT = `flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden font-sans ${CRADLE_APP_VIEWPORT_BG}`;

const SHELL_ROW =
  'flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-3 md:flex-row md:gap-0';

const MAIN_SCROLL =
  'scrollbar-hidden min-h-0 flex-1 overflow-x-hidden overflow-y-auto outline-none';

const SIDEBAR_FIXED =
  'flex h-auto max-h-none w-full shrink-0 flex-col overflow-hidden md:h-full md:max-h-full';

/**
 * Shared shell: sidebar + main outlet.
 * University admin: #FAFAFA canvas, white card with large radius + soft shadow, logo + \"Cradle\", nav: Universities / Cameras / Admins.
 */
export default function CradleDashboardShell() {
  const isUniversityAdmin = useIsUniversityAdmin();

  if (isUniversityAdmin) {
    return (
      <div className={SHELL_ROOT}>
        <SkipToMainLink />
        <div className={SHELL_ROW}>
          <aside
            className={`${CRADLE_SIDEBAR_ASIDE} ${SIDEBAR_FIXED} md:w-[318px]`}
            aria-label="Main navigation sidebar"
          >
            <div className="flex min-h-[72px] shrink-0 items-center px-6 pb-4 pt-5">
              <CradleLogoLockup className="h-8 w-auto max-w-full" />
            </div>
            <div className="min-h-0 flex-1 overflow-hidden px-2">
              <UniversityAdminSidebarNav />
            </div>
            <div className="shrink-0 space-y-3 px-3 pb-6 pt-2">
              <UniversityAdminMetaCard />
              <UniversityAdminUserCard />
            </div>
          </aside>

          <main
            id={MAIN_FOCUS_ID}
            tabIndex={-1}
            className={`${CRADLE_MAIN_COLUMN} ${MAIN_SCROLL}`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={SHELL_ROOT}>
      <SkipToMainLink />
      <div className={`${SHELL_ROW} sm:gap-4 md:gap-6`}>
        <aside
          className={`${SIDEBAR_FIXED} rounded-card border border-cradle-border bg-cradle-surface shadow-card md:w-[290px]`}
          aria-label="Main navigation sidebar"
        >
          <div className="flex h-16 shrink-0 items-center border-b border-cradle-border pl-[22px] pr-2">
            <CradleLogo className="block h-8 w-auto max-w-full" />
          </div>
          <CradleSidebarNav className="min-h-0 flex-1 overflow-hidden" />
          <div className="shrink-0 space-y-3 px-2 pb-4 pt-3">
            <CradleDeviceMetaCard />
            <CradleSidebarUserCard />
          </div>
        </aside>

        <main
          id={MAIN_FOCUS_ID}
          tabIndex={-1}
          className={`flex min-w-0 flex-1 flex-col bg-[#FAFAFA] ${MAIN_SCROLL}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
