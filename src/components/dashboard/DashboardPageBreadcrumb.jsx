import { Link } from 'react-router-dom';
import { asTrimmedString } from 'lib/safeValues';
import { ChevronRight } from 'lucide-react';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';

/**
 * Top-of-page trail.
 * Default variants: white bar, dark gray labels, light chevrons.
 * `rooms`: same light bar; current segment is Rooms.
 * @param {{ variant?: string, label?: string }} props
 */
export default function DashboardPageBreadcrumb({ variant = 'branches', label }) {
  const current = 'text-sm font-semibold text-[#535862]';
  const link =
    'rounded-md text-sm font-semibold text-[#535862] transition hover:bg-[#F9FAFB] hover:text-[#101828] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30 focus-visible:ring-offset-1';
  const currentPill =
    'inline-flex items-center rounded-xl border border-[#E9EAEB] bg-white px-3 py-1.5 text-sm font-semibold text-[#414651] shadow-sm';

  if (variant === 'universities-building') {
    const safeLabel = asTrimmedString(label) || 'University';
    return (
      <nav
        dir="ltr"
        className="flex w-full flex-wrap items-center gap-2 bg-transparent px-0 py-0"
        aria-label="Breadcrumb"
      >
        <Link
          to="/dashboard"
          className={`inline-flex items-center justify-center p-0.5 ${link}`}
          aria-label="Home"
        >
          <HomeOutlineIcon className="h-[18px] w-[18px]" stroke="#717680" aria-hidden />
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link to="/dashboard/organizations" className={`px-1 py-0.5 ${link}`}>
          Universities
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <span className={current}>{safeLabel}</span>
      </nav>
    );
  }

  if (variant === 'universities-rooms') {
    const safeLabel = asTrimmedString(label) || 'Building';
    return (
      <nav
        dir="ltr"
        className="flex w-full flex-wrap items-center gap-2 bg-transparent px-0 py-0"
        aria-label="Breadcrumb"
      >
        <Link
          to="/dashboard"
          className={`inline-flex items-center justify-center p-0.5 ${link}`}
          aria-label="Home"
        >
          <HomeOutlineIcon className="h-[18px] w-[18px]" stroke="#717680" aria-hidden />
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link to="/dashboard/organizations" className={`px-1 py-0.5 ${link}`}>
          Universities
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <span className={current}>Buildings</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <span className={currentPill}>{safeLabel}</span>
      </nav>
    );
  }

  if (variant === 'universities') {
    return (
      <nav
        dir="ltr"
        className="flex w-full flex-wrap items-center gap-2 bg-transparent px-0 py-0"
        aria-label="Breadcrumb"
      >
        <Link
          to="/dashboard"
          className={`inline-flex items-center justify-center p-0.5 ${link}`}
          aria-label="Home"
        >
          <HomeOutlineIcon className="h-[18px] w-[18px]" stroke="#717680" aria-hidden />
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <span className={current}>Universities</span>
      </nav>
    );
  }

  if (variant === 'rooms') {
    return (
      <nav
        dir="ltr"
        className="flex w-full flex-wrap items-center gap-1 border-b border-[#E9EAEB] bg-white px-6 py-3 sm:px-8"
        aria-label="Breadcrumb"
      >
        <Link
          to="/dashboard"
          className={`inline-flex items-center justify-center p-0.5 ${link}`}
          aria-label="Home"
        >
          <HomeOutlineIcon className="h-[18px] w-[18px]" stroke="#717680" aria-hidden />
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link to="/dashboard/organizations" className={`px-1 py-0.5 ${link}`}>
          Organizations
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link to="/dashboard/organizations/branches" className={`px-1 py-0.5 ${link}`}>
          Branches
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link to="/dashboard/organizations/branches/buildings" className={`px-1 py-0.5 ${link}`}>
          Buildings
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <span className={current}>Rooms</span>
      </nav>
    );
  }

  const trail =
    variant === 'organizations' ? (
      <>
        <span className={current}>Organizations</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link to="/dashboard/organizations/branches" className={`px-1 py-0.5 ${link}`}>
          Branches
        </Link>
      </>
    ) : variant === 'buildings' ? (
      <>
        <Link to="/dashboard/organizations" className={`px-1 py-0.5 ${link}`}>
          Organizations
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link to="/dashboard/organizations/branches" className={`px-1 py-0.5 ${link}`}>
          Branches
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <span className={current}>Buildings</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link
          to="/dashboard/organizations/branches/buildings/rooms"
          className={`px-1 py-0.5 ${link}`}
        >
          Rooms
        </Link>
      </>
    ) : (
      <>
        <Link to="/dashboard/organizations" className={`px-1 py-0.5 ${link}`}>
          Organizations
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <span className={current}>Branches</span>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link to="/dashboard/organizations/branches/buildings" className={`px-1 py-0.5 ${link}`}>
          Buildings
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
        <Link
          to="/dashboard/organizations/branches/buildings/rooms"
          className={`px-1 py-0.5 ${link}`}
        >
          Rooms
        </Link>
      </>
    );

  return (
    <nav
      dir="ltr"
      className="flex w-full flex-wrap items-center gap-1 border-b border-[#E9EAEB] bg-white px-6 py-3 sm:px-8"
      aria-label="Breadcrumb"
    >
      <Link
        to="/dashboard"
        className={`inline-flex items-center justify-center p-0.5 ${link}`}
        aria-label="Home"
      >
        <HomeOutlineIcon className="h-[18px] w-[18px]" stroke="#717680" aria-hidden />
      </Link>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
      {trail}
    </nav>
  );
}
