import { Link } from 'react-router-dom';
import { ChevronRight, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import ConfirmDeleteEntityDialog from 'components/dashboard/ConfirmDeleteEntityDialog';
import CreateRoleDialog from 'components/dashboard/users-dashboard/CreateRoleDialog';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import { useIsUniversityAdmin } from 'hooks/useIsUniversityAdmin';
import ListQueryPanel from 'components/dashboard/ListQueryPanel';
import ListEmptyState from 'components/dashboard/ListEmptyState';
import { useRoleManagementDashboard } from 'hooks/useRoleManagementDashboard';
import { CRADLE_CANVAS_BG } from 'design/cradleDesignTokens';

const cardVariantClass = {
  default: {
    wrap: 'border border-[#EAECF0] bg-[#F9FAFB]',
    title: 'text-[#101828]',
  },
  pink: {
    wrap: 'border border-[#FBCFE8] bg-[#FDF2F8]',
    title: 'text-[#BE185D]',
  },
  purple: {
    wrap: 'border border-[#DDD6FE] bg-[#F5F3FF]',
    title: 'text-[#6D28D9]',
  },
  red: {
    wrap: 'border border-[#FECACA] bg-[#FEF2F2]',
    title: 'text-[#B91C1C]',
  },
  orange: {
    wrap: 'border border-[#FDBA74] bg-[#FFF7ED]',
    title: 'text-[#C2410C]',
  },
  green: {
    wrap: 'border border-[#86EFAC] bg-[#F0FDF4]',
    title: 'text-[#15803D]',
  },
  teal: {
    wrap: 'border border-[#5EEAD4] bg-[#F0FDFA]',
    title: 'text-[#0F766E]',
  },
  blue: {
    wrap: 'border border-[#93C5FD] bg-[#EFF6FF]',
    title: 'text-[#1D4ED8]',
  },
  indigo: {
    wrap: 'border border-[#A5B4FC] bg-[#EEF2FF]',
    title: 'text-[#4338CA]',
  },
  magenta: {
    wrap: 'border border-[#F0ABFC] bg-[#FDF4FF]',
    title: 'text-[#A21CAF]',
  },
};

const iconBtnClass =
  'inline-flex rounded-lg p-1.5 text-[#667085] transition hover:bg-black/[0.04] hover:text-[#344054] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30';

export default function RoleManagementMain() {
  const isUniversityAdmin = useIsUniversityAdmin();
  const {
    query,
    setQuery,
    filtered,
    deleteTarget,
    setDeleteTarget,
    closeDelete,
    confirmDelete,
    editingRole,
    editNameDraft,
    setEditNameDraft,
    openEdit,
    closeEdit,
    saveEdit,
    createOpen,
    openCreate,
    closeCreate,
    handleCreateRole,
    listEmpty,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    page,
    setPage,
    totalPages,
    showPagination,
    paginationItems,
  } = useRoleManagementDashboard();

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
          <Link
            to="/dashboard/users"
            className="text-sm font-semibold text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#101828] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
          >
            Users
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={2} aria-hidden />
          <span className="rounded-full border border-[#EAECF0] bg-white px-3 py-1.5 text-sm font-semibold text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
            Role Management
          </span>
        </nav>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">Role Management</h1>
            <p className="mt-2 max-w-xl text-base text-[#535862] sm:text-lg">
              On this page, you can create, edit, and delete roles.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3 sm:justify-end">
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#8B5CF6] px-5 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#7C3AED] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Plus className="h-5 w-5" strokeWidth={2.25} aria-hidden />
              Create Role
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden rounded-[24px] border border-[#EAECF0] bg-white p-5 shadow-[0px_4px_24px_-4px_rgba(16,24,40,0.08),0px_2px_8px_-2px_rgba(16,24,40,0.06)] sm:p-8 ${listEmpty ? 'flex min-h-[min(70vh,520px)] flex-col' : ''}`}
        >
          <div className={`flex justify-end ${listEmpty ? 'shrink-0' : ''} mb-6`}>
            <div className="relative w-full max-w-[min(100%,28rem)]">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#98A2B3]"
                strokeWidth={1.75}
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="h-11 w-full rounded-full border border-[#D0D5DD] bg-white py-2 pl-11 pr-4 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:outline-none focus:ring-2 focus:ring-[#7F56D9]/25"
                aria-label="Search roles"
                disabled={listEmpty}
              />
            </div>
          </div>

          <ListQueryPanel
            isEmpty={!listEmpty && filtered.length === 0}
            emptyState={
              <ListEmptyState as="p" className="py-8">
                No roles match your search.
              </ListEmptyState>
            }
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            onRetry={refetch}
            showPagination={showPagination}
            page={page}
            totalPages={totalPages}
            paginationItems={paginationItems}
            onPageChange={setPage}
          >
            {listEmpty ? (
              <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 pt-2">
                <div className="relative mb-8 flex h-[140px] w-[140px] items-center justify-center">
                  <span className="absolute h-[120px] w-[120px] rounded-full border border-[#E4E7EC]/70" aria-hidden />
                  <span className="absolute h-[152px] w-[152px] rounded-full border border-[#E4E7EC]/45" aria-hidden />
                  <span className="absolute h-[184px] w-[184px] rounded-full border border-[#E4E7EC]/28" aria-hidden />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#E4E7EC] bg-white shadow-[0px_1px_2px_rgba(16,24,40,0.06)]">
                    <Plus className="h-7 w-7 text-[#667085]" strokeWidth={2} aria-hidden />
                  </div>
                </div>
                <h2 className="text-center text-lg font-semibold text-[#101828]">Role not created.</h2>
                <p className="mt-2 max-w-md text-center text-sm leading-relaxed text-[#667085]">
                  Create roles for users by clicking the &apos;Create Role&apos; button.
                </p>
                <button
                  type="button"
                  onClick={openCreate}
                  className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[#8B5CF6] px-6 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#7C3AED] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Create Role
                  <Plus className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </button>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((role) => {
                  const v = cardVariantClass[role.variant] ?? cardVariantClass.default;
                  return (
                    <li
                      key={role.id}
                      className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ${v.wrap}`}
                    >
                      <div className="min-w-0 flex-1">
                        <h2 className={`text-base font-semibold leading-snug ${v.title}`}>{role.name}</h2>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs font-medium text-[#667085]">
                          <span>Created: {role.created}</span>
                          <span>Modified: {role.modified}</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-4">
                        <button
                          type="button"
                          className={iconBtnClass}
                          aria-label={`Delete ${role.name}`}
                          onClick={() => setDeleteTarget({ id: role.id, name: role.name })}
                        >
                          <Trash2 className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                        </button>
                        <button
                          type="button"
                          className={iconBtnClass}
                          aria-label={`Edit ${role.name}`}
                          onClick={() => openEdit(role)}
                        >
                          <Pencil className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </ListQueryPanel>
        </div>
      </div>

      <CreateRoleDialog open={createOpen} onClose={closeCreate} onCreate={handleCreateRole} />

      <ConfirmDeleteEntityDialog
        open={Boolean(deleteTarget)}
        title="Delete role"
        entityName={deleteTarget?.name ?? ''}
        description="This removes the role from the list (local only, not saved to server)."
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />

      {editingRole ? (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-role-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeEdit();
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E9EAEB] bg-white p-6 shadow-xl">
            <h2 id="edit-role-title" className="text-lg font-semibold text-[#101828]">
              Edit role
            </h2>
            <label htmlFor="edit-role-name" className="mt-4 block text-sm font-medium text-[#344054]">
              Role name
            </label>
            <input
              id="edit-role-name"
              type="text"
              value={editNameDraft}
              onChange={(e) => setEditNameDraft(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#D0D5DD] px-3 py-2 text-sm text-[#101828] shadow-sm focus:border-[#7F56D9] focus:outline-none focus:ring-2 focus:ring-[#7F56D9]/25"
              autoComplete="off"
            />
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-lg border border-[#D5D7DA] bg-white px-4 py-2 text-sm font-semibold text-[#414651] transition hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={!editNameDraft.trim()}
                className="rounded-lg bg-[#7F56D9] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6941C6] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
