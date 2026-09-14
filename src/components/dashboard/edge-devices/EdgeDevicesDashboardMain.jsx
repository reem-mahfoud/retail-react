import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ListFilter,
  MoreVertical,
  Plus,
  SquarePen,
  RotateCcw,
  Search,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Webcam,
  X,
} from 'lucide-react';
import ConfirmDeleteEntityDialog from 'components/dashboard/ConfirmDeleteEntityDialog';
import ListEmptyState from 'components/dashboard/ListEmptyState';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import { useEdgeDevicesDashboard } from 'hooks/useEdgeDevicesDashboard';
import { useEscapeKey } from 'hooks/useEscapeKey';
import { useOutsidePointerDown } from 'hooks/useOutsidePointerDown';
import { useRepositionOnScroll } from 'hooks/useRepositionOnScroll';

const FILTER_TAG = 'Qarshi State University';

const pill =
  'inline-flex max-w-full items-center rounded-full border border-[#E9EAEB] bg-white px-2.5 py-1 text-xs font-medium leading-none text-[#414651]';

const MENU_WIDTH = 260;
const MENU_GAP = 4;
/** Approximate menu height for flip-above; avoids clipping without needing menu ref on first paint */
const MENU_EST_HEIGHT = 260;

function DeviceCardMenu({ open, onClose, anchorRef, onAction, deviceActive }) {
  const menuRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const placeMenu = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = Math.min(Math.max(8, rect.right - MENU_WIDTH), vw - MENU_WIDTH - 8);
    let top = rect.bottom + MENU_GAP;
    if (top + MENU_EST_HEIGHT > vh - 8) {
      top = Math.max(8, rect.top - MENU_EST_HEIGHT - MENU_GAP);
    }
    setPos({ top, left });
  }, [anchorRef]);

  useLayoutEffect(() => {
    if (!open) return undefined;
    placeMenu();
  }, [open, placeMenu]);

  useRepositionOnScroll(open, placeMenu);

  const outsideRefs = useMemo(() => [menuRef, anchorRef], [anchorRef]);
  useOutsidePointerDown(open, outsideRefs, onClose);
  useEscapeKey(open, onClose);

  if (!open) return null;

  const iconClass = 'h-4 w-4 shrink-0 text-[#717680]';
  const itemNeutral =
    'flex w-full items-center gap-3 rounded-lg px-4 py-3.5 text-left text-sm font-medium text-[#414651] transition hover:bg-[#F9FAFB] focus:outline-none focus-visible:bg-[#F9FAFB]';

  const menu = (
    <div
      ref={menuRef}
      role="menu"
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        width: MENU_WIDTH,
        zIndex: 10000,
      }}
      className="max-h-[min(280px,calc(100vh-16px))] overflow-y-auto overflow-x-hidden rounded-[24px] border border-[#E9EAEB] bg-white py-2 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.04),0px_4px_6px_-2px_rgba(10,13,18,0.03),0px_12px_16px_-4px_rgba(10,13,18,0.08)]"
    >
      <div className="px-1">
        <button
          type="button"
          role="menuitem"
          className={itemNeutral}
          onClick={() => {
            onAction?.('restart');
            onClose();
          }}
        >
          <RotateCcw className={iconClass} strokeWidth={1.5} aria-hidden />
          Restart
        </button>
        <button
          type="button"
          role="menuitem"
          className={itemNeutral}
          onClick={() => {
            onAction?.(deviceActive ? 'disconnect' : 'connect');
            onClose();
          }}
        >
          {deviceActive ? (
            <>
              <ToggleLeft className={iconClass} strokeWidth={1.5} aria-hidden />
              Disconnect device
            </>
          ) : (
            <>
              <ToggleRight className={iconClass} strokeWidth={1.5} aria-hidden />
              Connect
            </>
          )}
        </button>
        <button
          type="button"
          role="menuitem"
          className={itemNeutral}
          onClick={() => {
            onAction?.('edit');
            onClose();
          }}
        >
          <SquarePen className={iconClass} strokeWidth={1.5} aria-hidden />
          Edit
        </button>
      </div>
      <div className="my-1 h-px shrink-0 bg-[#E9EAEB]" aria-hidden />
      <div className="px-1">
        <button
          type="button"
          role="menuitem"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3.5 text-left text-sm font-medium text-[#D92D20] transition hover:bg-[#FEF3F2] focus:outline-none focus-visible:bg-[#FEF3F2]"
          onClick={() => {
            onAction?.('delete');
            onClose();
          }}
        >
          <Trash2 className="h-4 w-4 shrink-0 text-[#F04438]" strokeWidth={1.5} aria-hidden />
          Delete
        </button>
      </div>
    </div>
  );

  return createPortal(menu, document.body);
}

function DeviceCard({ row, menuOpen, onToggleMenu, onMenuAction }) {
  const btnRef = useRef(null);
  const navigate = useNavigate();
  const detailPath = `/dashboard/edge-devices/${row.id}`;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(detailPath)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(detailPath);
        }
      }}
      className="relative flex min-w-0 cursor-pointer flex-col rounded-xl border border-[#E9EAEB] bg-white p-5 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none transition hover:border-[#D6BBFB] hover:bg-[#FCFAFF] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
      aria-label={`Open ${row.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <Link
          to={detailPath}
          onClick={(e) => e.stopPropagation()}
          className="min-w-0 flex-1 pr-1 text-base font-semibold leading-snug tracking-tight text-[#101828] outline-none transition hover:text-[#6941C6] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35 focus-visible:ring-offset-2 rounded-lg"
        >
          {row.title}
        </Link>
        <div className="relative shrink-0">
          <button
            ref={btnRef}
            type="button"
            className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35 ${
              menuOpen
                ? 'bg-[#F4EBFF] text-[#6941C6] ring-1 ring-[#7F56D9]/40'
                : 'text-[#98A2B3] hover:bg-[#F9FAFB] hover:text-[#667085]'
            }`}
            aria-label="Device actions"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMenu(row.id);
            }}
          >
            <MoreVertical className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </button>
          <DeviceCardMenu
            open={menuOpen}
            onClose={() => onToggleMenu(null)}
            anchorRef={btnRef}
            deviceActive={row.active}
            onAction={(action) => onMenuAction?.(row.id, action)}
          />
        </div>
      </div>

      <Link
        to={detailPath}
        onClick={(e) => e.stopPropagation()}
        className="mt-4 block outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35 focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="flex items-center gap-2 text-sm font-medium tabular-nums text-[#667085]">
          <Webcam className="h-4 w-4 shrink-0 text-[#667085]" strokeWidth={1.75} aria-hidden />
          <span>
            {row.quotaUsed} / {row.quotaTotal}
          </span>
        </span>
      </Link>

      <Link
        to={detailPath}
        onClick={(e) => e.stopPropagation()}
        className="mt-4 block outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35 focus-visible:ring-offset-2 rounded-lg"
      >
        <div className="flex flex-wrap gap-1.5">
          <span className={pill}>{row.tagId}</span>
          <span className={pill}>Organization</span>
          <span className={pill}>Branch</span>
          <span className={pill}>Building</span>
          <span className={pill}>Room</span>
        </div>
      </Link>
    </article>
  );
}

export default function EdgeDevicesDashboardMain() {
  const {
    tab,
    setTab,
    query,
    setQuery,
    showFilterTag,
    setShowFilterTag,
    filtered,
    menuCardId,
    handleMenuToggle,
    handleMenuAction,
    toast,
    deleteTarget,
    closeDeleteDialog,
    confirmDelete,
    editingDevice,
    editTitle,
    setEditTitle,
    closeEditDialog,
    saveEdit,
  } = useEdgeDevicesDashboard();

  return (
    <div className="min-h-screen w-full bg-white pb-12 pt-2 text-[#101828] sm:pt-4">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb — above white shell */}
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
            Edge devices
          </span>
        </nav>

        {/* Main white panel */}
        <div className="rounded-[28px] border border-[#EAECF0] bg-white px-5 py-6 text-[#101828] shadow-[0px_4px_24px_-4px_rgba(16,24,40,0.08),0px_2px_8px_-2px_rgba(16,24,40,0.06)] sm:px-8 sm:py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">Edge devices</h1>
              <p className="mt-2 max-w-xl text-base text-[#535862] sm:text-lg">
                Page for creating and managing edge devices.
              </p>
            </div>
            <Link
              to="/dashboard/edge-devices/add"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#6941C6] bg-[#7F56D9] px-5 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/45 focus-visible:ring-offset-2 sm:self-center"
            >
              Add edge device
              <Plus className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
            </Link>
          </div>

          {/* Toolbar — matches mock: tabs left; right cluster L→R: chip, Filter, wide Search */}
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div
              className="inline-flex h-10 w-fit shrink-0 items-center rounded-full border border-[#E9EAEB] bg-[#FAFAFA] p-1"
              role="tablist"
              aria-label="Device status"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'active'}
                className={`h-8 rounded-full px-4 text-sm font-semibold leading-none transition ${
                  tab === 'active'
                    ? 'bg-white text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'
                    : 'text-[#667085] hover:text-[#414651]'
                }`}
                onClick={() => setTab('active')}
              >
                Active
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'inactive'}
                className={`h-8 rounded-full px-4 text-sm font-semibold leading-none transition ${
                  tab === 'inactive'
                    ? 'bg-white text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'
                    : 'text-[#667085] hover:text-[#414651]'
                }`}
                onClick={() => setTab('inactive')}
              >
                Inactive
              </button>
            </div>

            <div className="flex min-w-0 w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end md:w-auto md:flex-nowrap md:gap-2">
              {showFilterTag ? (
                <span className="inline-flex h-10 shrink-0 items-center gap-1 rounded-full border border-[#D5D7DA] bg-white py-0 pl-3.5 pr-1 text-sm font-medium text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                  {FILTER_TAG}
                  <button
                    type="button"
                    className="rounded-full p-1.5 text-[#98A2B3] transition hover:bg-[#F9FAFB] hover:text-[#475467] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
                    aria-label={`Remove filter ${FILTER_TAG}`}
                    onClick={() => setShowFilterTag(false)}
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </button>
                </span>
              ) : null}
              <button
                type="button"
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[#D5D7DA] bg-white px-4 text-sm font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
              >
                <ListFilter className="h-4 w-4 text-[#667085]" strokeWidth={1.75} aria-hidden />
                Filter
              </button>
              <div className="relative min-h-10 min-w-0 flex-1 sm:min-w-[240px] md:max-w-[440px]">
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
                  aria-label="Search devices"
                />
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-8 w-full min-w-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((row) => (
                <DeviceCard
                  key={row.id}
                  row={row}
                  menuOpen={menuCardId === row.id}
                  onToggleMenu={handleMenuToggle}
                  onMenuAction={handleMenuAction}
                />
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <ListEmptyState as="p" variant="compact" className="mt-8">
              No devices match the current filters.
            </ListEmptyState>
          ) : null}
        </div>
      </div>

      {toast ? (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[10050] max-w-md -translate-x-1/2 rounded-xl border border-[#E9EAEB] bg-[#101828] px-4 py-3 text-center text-sm text-white shadow-lg"
        >
          {toast}
        </div>
      ) : null}

      <ConfirmDeleteEntityDialog
        open={Boolean(deleteTarget)}
        title="Delete edge device"
        entityName={deleteTarget?.title ?? ''}
        description="This removes the device from the list (demo only)."
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />

      {editingDevice ? (
        <div
          className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edge-edit-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeEditDialog();
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E9EAEB] bg-white p-6 shadow-xl">
            <h2 id="edge-edit-title" className="text-lg font-semibold text-[#101828]">
              Edit edge device
            </h2>
            <label htmlFor="edge-edit-name" className="mt-4 block text-sm font-medium text-[#414651]">
              Device name
            </label>
            <input
              id="edge-edit-name"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#D5D7DA] px-3 py-2 text-sm text-[#101828] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
              autoComplete="off"
            />
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeEditDialog}
                className="rounded-lg border border-[#D5D7DA] bg-white px-4 py-2 text-sm font-semibold text-[#414651] transition hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={!editTitle.trim()}
                className="rounded-lg border border-[#6941C6] bg-[#7F56D9] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6941C6] disabled:cursor-not-allowed disabled:opacity-50"
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
