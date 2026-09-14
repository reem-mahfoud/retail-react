import { useCallback, useEffect, useMemo, useState } from 'react';
import { mapUserFromApi } from 'api/mappers';
import { useUsersQuery } from 'hooks/queries';
import { useListSearchAndPage, useListPagination } from 'hooks/useListPagination';
import { useStorageListSubscription } from 'hooks/useStorageListSubscription';
import { useAuth } from 'context/AuthContext';
import { isUniversityAdmin as checkUniversityAdmin } from 'lib/authRoutes';
import { getListTotal, LIST_PAGE_SIZE } from 'lib/pagination';
import { EXTRA_USERS_CHANGED, readExtraUsers } from 'lib/usersExtraStorage';

/** Normalizes a locally added user so it satisfies the same filters as API rows. */
function normalizeExtraUser(user) {
  return {
    ...user,
    roles: Array.isArray(user.roles) ? user.roles : [],
    profileType: String(user.profileType || 'User'),
    apiProfileType: String(user.profileType || 'User').toUpperCase(),
    lastLogin: user.lastLogin ?? null,
    isNew: true,
  };
}

const UNIVERSITY_ADMIN_PAGE_SIZE = 100;

function isSameCalendarDay(isoValue, displayDateStr) {
  if (!isoValue || !displayDateStr?.trim()) return false;
  const filterTime = Date.parse(displayDateStr.trim());
  if (Number.isNaN(filterTime)) return false;
  const loginDate = new Date(isoValue);
  const filterDate = new Date(filterTime);
  if (Number.isNaN(loginDate.getTime())) return false;
  return (
    loginDate.getFullYear() === filterDate.getFullYear() &&
    loginDate.getMonth() === filterDate.getMonth() &&
    loginDate.getDate() === filterDate.getDate()
  );
}

export function useUsersDashboard() {
  const { user } = useAuth();
  const isUniversityAdmin = checkUniversityAdmin(user);

  const [query, setQuery] = useState('');
  const [profileType, setProfileType] = useState(() =>
    isUniversityAdmin ? 'admin' : 'all',
  );
  const [lastSessionFilter, setLastSessionFilter] = useState('');
  const [lastSessionPickerOpen, setLastSessionPickerOpen] = useState(false);
  const [selected, setSelected] = useState(() => new Set());
  const [activityUser, setActivityUser] = useState(null);

  useEffect(() => {
    if (!isUniversityAdmin) return;
    setProfileType((cur) =>
      cur === 'student' || cur === 'teacher' || cur === 'user' ? 'admin' : cur,
    );
  }, [isUniversityAdmin]);

  const pageSize = isUniversityAdmin ? UNIVERSITY_ADMIN_PAGE_SIZE : LIST_PAGE_SIZE;
  const { debouncedSearch: debouncedQuery, page, setPage } = useListSearchAndPage(
    query,
    profileType,
    lastSessionFilter,
  );

  const { data, isLoading, isError, error, isFetching, refetch } = useUsersQuery({
    page,
    pageSize,
    profileType: isUniversityAdmin ? 'ADMIN' : undefined,
    scope: isUniversityAdmin ? 'admin' : 'all',
    search: debouncedQuery,
  });

  const [extraUsers, setExtraUsers] = useState(() => readExtraUsers());
  const refreshExtraUsers = useCallback(() => setExtraUsers(readExtraUsers()), []);
  useStorageListSubscription(EXTRA_USERS_CHANGED, refreshExtraUsers);

  const allUsers = useMemo(() => {
    const apiUsers = (data?.users ?? []).map(mapUserFromApi);
    const locallyAdded = extraUsers.map(normalizeExtraUser);
    const seen = new Set();
    const merged = [];
    for (const u of [...locallyAdded, ...apiUsers]) {
      if (!u?.id || seen.has(u.id)) continue;
      seen.add(u.id);
      merged.push(u);
    }
    return merged;
  }, [data, extraUsers]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return allUsers.filter((u) => {
      if (isUniversityAdmin && u.apiProfileType !== 'ADMIN') return false;

      if (profileType !== 'all') {
        if (profileType === 'teacher') {
          if (!u.roles.some((r) => r.key === 'teacher')) return false;
        } else if (profileType === 'dean') {
          if (!u.roles.some((r) => r.key === 'dean')) return false;
        } else if (profileType === 'admin') {
          if (!u.roles.some((r) => r.key === 'admin')) return false;
        } else if (profileType === 'student') {
          if (!u.roles.some((r) => r.key === 'student')) return false;
        } else if (u.profileType.toLowerCase() !== profileType) {
          return false;
        }
      }

      if (lastSessionFilter.trim()) {
        if (!isSameCalendarDay(u.lastLogin, lastSessionFilter)) return false;
      }

      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.handle.toLowerCase().includes(q) ||
        u.phone.includes(q)
      );
    });
  }, [allUsers, debouncedQuery, profileType, isUniversityAdmin, lastSessionFilter]);

  const listTotal = useMemo(
    () => (isUniversityAdmin ? filtered.length : getListTotal(data, 'users')),
    [isUniversityAdmin, filtered, data],
  );

  const { totalPages, showPagination, paginationItems } = useListPagination(
    data,
    'users',
    page,
    setPage,
    pageSize,
    isUniversityAdmin ? listTotal : undefined,
  );

  const paginated = filtered;

  const toggleRow = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const idsOnPage = paginated.map((u) => u.id);
      if (idsOnPage.length === 0) return prev;
      const allOnPageSelected = idsOnPage.every((id) => prev.has(id));
      const next = new Set(prev);
      if (allOnPageSelected) idsOnPage.forEach((id) => next.delete(id));
      else idsOnPage.forEach((id) => next.add(id));
      return next;
    });
  }, [paginated]);

  const allSelected = useMemo(
    () => paginated.length > 0 && paginated.every((u) => selected.has(u.id)),
    [paginated, selected],
  );

  const someSelected = useMemo(
    () => paginated.some((u) => selected.has(u.id)) && !allSelected,
    [paginated, selected, allSelected],
  );

  return {
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
    filtered,
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
    totalCount: data?.total ?? 0,
    showPagination,
  };
}
