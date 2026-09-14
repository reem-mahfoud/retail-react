import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SessionDatePickerDialog from 'components/dashboard/users-dashboard/SessionDatePickerDialog';
import UserActivityDrawer from 'components/dashboard/users-dashboard/UserActivityDrawer';
import ListTableQuerySection from 'components/dashboard/ListTableQuerySection';
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  History,
  ClipboardCheck,
  ListFilter,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import { useUsersDashboard } from 'hooks/useUsersDashboard';
import { CRADLE_CANVAS_BG } from 'design/cradleDesignTokens';
import { iconBtn, roleBadgeClass, selectFieldClass } from './usersDashboardConstants';

function RoleBadges({ roles }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {roles.map((r) => (
        <span
          key={`${r.key}-${r.label}`}
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${roleBadgeClass[r.key] ?? roleBadgeClass.student}`}
        >
          {r.label}
        </span>
      ))}
    </div>
  );
}

export default function UsersDashboardMain() {
  const {
    isUniversityAdmin,
    query,
    setQuery,
    profileType,
    setProfileType,
    lastSessionFilter,
    setLastSessionFilter,
    lastSessionPickerOpen,
    setLastSessionPickerOpen,
    selected,
    toggleRow,
    page,
    setPage,
    activityUser,
    setActivityUser,
    totalPages,
    paginated,
    paginationItems,
    toggleAll,
    allSelected,
    someSelected,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    showPagination,
  } = useUsersDashboard();

  const emptyMessage = useMemo(() => {
    if (isUniversityAdmin) {
      return lastSessionFilter.trim()
        ? 'No admins were active on this date.'
        : 'No admins found.';
    }
    return lastSessionFilter.trim()
      ? 'No users match the selected date.'
      : 'No users match the current filters.';
  }, [isUniversityAdmin, lastSessionFilter]);

  return (
    <div
      className={`min-h-full pb-12 pt-3 text-[#101828] sm:pt-4 ${isUniversityAdmin ? CRADLE_CANVAS_BG : 'bg-white'}`}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <nav className="mb-5 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
          <Link
            to="/dashboard"
            className="inline-flex rounded-lg p-1 text-[#667085] transition hover:bg-[#EAECF0] hover:text-[#414651] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
            aria-label="Home"
          >
            <HomeOutlineIcon className="h-5 w-5" stroke="#717680" aria-hidden />
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={2} aria-hidden />
          <span className="rounded-full border border-[#EAECF0] bg-white px-3 py-1.5 text-sm font-semibold text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
            Users
          </span>
        </nav>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">Users</h1>
            <p className="mt-2 max-w-xl text-base text-[#535862] sm:text-lg">
              On this page, you can add, edit, and delete users.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:shrink-0 sm:justify-end">
            {!isUniversityAdmin ? (
              <Link
                to="/dashboard/users/roles"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
              >
                Role Management
                <ClipboardCheck className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
              </Link>
            ) : null}
            <Link
              to="/dashboard/users/add"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#6941C6] bg-[#7F56D9] px-5 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Plus className="h-5 w-5" strokeWidth={2.25} aria-hidden />
              Add User
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-[#EAECF0] bg-white shadow-[0px_4px_24px_-4px_rgba(16,24,40,0.08),0px_2px_8px_-2px_rgba(16,24,40,0.06)]">
          <div className="border-b border-[#EAECF0] px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {lastSessionFilter ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D0D5DD] bg-white py-1.5 pl-3 pr-1 text-sm font-semibold text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                    {lastSessionFilter}
                    <button
                      type="button"
                      onClick={() => setLastSessionFilter('')}
                      className="inline-flex rounded-full p-1 text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054]"
                      aria-label="Remove date filter"
                    >
                      <X className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </button>
                  </span>
                ) : null}
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D5D7DA] bg-white px-4 text-sm font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB]"
                >
                  <ListFilter className="h-4 w-4 text-[#667085]" strokeWidth={1.75} aria-hidden />
                  More filters
                </button>
              </div>
              <div className="relative w-full min-w-0 lg:max-w-md">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="h-10 w-full rounded-full border border-[#D5D7DA] bg-white py-2 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
                  aria-label="Search users"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 border-t border-[#F2F4F7] pt-4">
              <div className="min-w-[160px] flex-1 sm:flex-none">
                <label htmlFor="users-profile-type" className="mb-1.5 block text-xs font-medium text-[#667085]">
                  Profile type
                </label>
                <div className="relative">
                  <select
                    id="users-profile-type"
                    value={profileType}
                    onChange={(e) => setProfileType(e.target.value)}
                    className={selectFieldClass}
                  >
                    <option value="all">All</option>
                    {!isUniversityAdmin ? <option value="user">User</option> : null}
                    {!isUniversityAdmin ? <option value="student">Student</option> : null}
                    {!isUniversityAdmin ? <option value="teacher">Teacher</option> : null}
                    <option value="dean">Dean</option>
                    <option value="admin">Admin</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                    strokeWidth={2}
                    aria-hidden
                  />
                </div>
              </div>
              <div className="min-w-[180px] flex-1 sm:flex-none">
                <label htmlFor="users-last-session" className="mb-1.5 block text-xs font-medium text-[#667085]">
                  Last session
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setLastSessionPickerOpen(true)}
                    className="absolute left-2 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#98A2B3] transition hover:bg-[#F2F4F7] hover:text-[#667085] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
                    aria-label="Open date calendar"
                  >
                    <Calendar className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </button>
                  <input
                    id="users-last-session"
                    type="text"
                    value={lastSessionFilter}
                    onChange={(e) => setLastSessionFilter(e.target.value)}
                    placeholder="Select date"
                    className="h-10 w-full rounded-xl border border-[#D0D5DD] bg-white py-2 pl-11 pr-3.5 text-sm font-medium text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
                  />
                </div>
              </div>
            </div>
          </div>

          <ListTableQuerySection
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            onRetry={refetch}
            colSpan={7}
            isEmpty={paginated.length === 0}
            emptyContent={emptyMessage}
            showPagination={showPagination}
            page={page}
            totalPages={totalPages}
            paginationItems={paginationItems}
            onPageChange={setPage}
            thead={
              <thead>
                <tr className="border-b border-[#EAECF0] bg-white">
                  <th className="w-12 px-4 py-3 sm:pl-8">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someSelected && !allSelected;
                      }}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-[#D0D5DD] text-[#7F56D9] focus:ring-[#7F56D9]/25"
                      aria-label="Select all users"
                    />
                  </th>
                  <th className="px-2 py-3 font-semibold text-[#667085]">Name</th>
                  <th className="px-2 py-3 font-semibold text-[#667085]">Role</th>
                  <th className="px-2 py-3 font-semibold text-[#667085]">Profile Type</th>
                  <th className="px-2 py-3 font-semibold text-[#667085]">Номер телефона</th>
                  <th className="px-2 py-3 font-semibold text-[#667085]">Last session</th>
                  <th className="w-[140px] px-4 py-3 pr-6 text-right font-semibold text-[#667085] sm:pr-8">
                    {/* actions */}
                  </th>
                </tr>
              </thead>
            }
          >
            {paginated.map((u) => {
              const isSel = selected.has(u.id);
              return (
                <tr
                  key={u.id}
                  className={`border-b border-[#EAECF0] transition-colors ${isSel ? 'bg-[#F9F5FF]/80' : 'bg-white hover:bg-[#FAFAFA]'}`}
                >
                  <td className="px-4 py-4 align-middle sm:pl-8">
                    <input
                      type="checkbox"
                      checked={isSel}
                      onChange={() => toggleRow(u.id)}
                      className="h-4 w-4 rounded border-[#D0D5DD] text-[#7F56D9] focus:ring-[#7F56D9]/25"
                      aria-label={`Select ${u.name}`}
                    />
                  </td>
                  <td className="px-2 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-black/5"
                        width={40}
                        height={40}
                      />
                      <div className="min-w-0 max-w-[220px]">
                        <div className="truncate font-semibold text-[#101828]" title={u.name}>
                          {u.name}
                        </div>
                        <div className="truncate text-sm text-[#667085]" title={`@${u.handle}`}>
                          @{u.handle}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 align-middle">
                    <RoleBadges roles={u.roles} />
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 align-middle font-medium text-[#101828]">
                    {u.profileType}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 align-middle font-medium text-[#344054]">
                    {u.phone}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 align-middle font-medium text-[#344054]">
                    {u.lastSession}
                  </td>
                  <td className="px-4 py-4 pr-6 text-right align-middle sm:pr-8">
                    <div className="inline-flex items-center justify-end gap-0.5">
                      <button
                        type="button"
                        className={iconBtn}
                        aria-label={`History for ${u.name}`}
                        onClick={() => setActivityUser({ id: u.id, name: u.name })}
                      >
                        <History className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                      </button>
                      <button type="button" className={iconBtn} aria-label={`Delete ${u.name}`}>
                        <Trash2 className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                      </button>
                      <button type="button" className={iconBtn} aria-label={`Edit ${u.name}`}>
                        <Pencil className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </ListTableQuerySection>
        </div>
      </div>

      <SessionDatePickerDialog
        open={lastSessionPickerOpen}
        onClose={() => setLastSessionPickerOpen(false)}
        value={lastSessionFilter}
        onApply={(v) => setLastSessionFilter(v)}
      />
      <UserActivityDrawer
        open={Boolean(activityUser)}
        user={activityUser}
        onClose={() => setActivityUser(null)}
      />
    </div>
  );
}
