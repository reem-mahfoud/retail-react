import { fetchAttendanceDynamics, fetchDashboardSummary } from 'api/analytics';
import { fetchAuditoriums } from 'api/auditoriums';
import { fetchBuildings } from 'api/buildings';
import { fetchCameras } from 'api/cameras';
import { fetchLocations } from 'api/locations';
import { queryKeys } from 'api/queryKeys';
import { analyticsQueryOptions, listQueryOptions, referenceQueryOptions } from 'api/queryOptions';
import { fetchRoles } from 'api/roles';
import { fetchSmartCameras } from 'api/smartCameras';
import { fetchUniversities } from 'api/universities';
import { fetchUsers } from 'api/users';
import { LIST_PAGE_SIZE } from 'lib/pagination';
import { runSafelyVoid } from 'lib/runSafely';

const DEFAULT_LIST_PARAMS = { page: 1, pageSize: LIST_PAGE_SIZE, isActive: true };

export const cacheScopes = {
  auditoriums: queryKeys.auditoriums.all,
  buildings: queryKeys.buildings.all,
  locations: queryKeys.locations.all,
  universities: queryKeys.universities.all,
  users: queryKeys.users.all,
  cameras: queryKeys.cameras.all,
  roles: queryKeys.roles.all,
  smartCameras: queryKeys.smartCameras.all,
  analytics: ['analytics'],
};

export function invalidateCacheScope(queryClient, scope) {
  try {
    return queryClient.invalidateQueries({ queryKey: scope });
  } catch {
    return Promise.resolve();
  }
}

export function clearQueryCache(queryClient) {
  runSafelyVoid(() => queryClient.clear());
}

export function prefetchDashboardRoute(queryClient, path) {
  const normalized = String(path ?? '').replace(/\/+$/, '') || '/dashboard';

  switch (normalized) {
    case '/dashboard':
      return Promise.all([
        queryClient.prefetchQuery({
          queryKey: queryKeys.analytics.dashboardSummary({}),
          queryFn: () => fetchDashboardSummary(),
          ...analyticsQueryOptions,
        }),
        queryClient.prefetchQuery({
          queryKey: queryKeys.smartCameras.list({ page: 1, pageSize: LIST_PAGE_SIZE }),
          queryFn: () => fetchSmartCameras({ page: 1, pageSize: LIST_PAGE_SIZE }),
          ...referenceQueryOptions,
        }),
      ]);

    case '/dashboard/organizations':
      return queryClient.prefetchQuery({
        queryKey: queryKeys.universities.list({ page: 1, pageSize: LIST_PAGE_SIZE }),
        queryFn: () => fetchUniversities({ page: 1, pageSize: LIST_PAGE_SIZE }),
        ...listQueryOptions,
      });

    case '/dashboard/organizations/branches':
      return queryClient.prefetchQuery({
        queryKey: queryKeys.locations.list({ search: '', isActive: true, page: 1, pageSize: LIST_PAGE_SIZE }),
        queryFn: () =>
          fetchLocations({
            ...DEFAULT_LIST_PARAMS,
            search: undefined,
          }),
        ...listQueryOptions,
      });

    case '/dashboard/organizations/branches/buildings':
      return queryClient.prefetchQuery({
        queryKey: queryKeys.buildings.list({ search: '', isActive: true, page: 1, pageSize: LIST_PAGE_SIZE }),
        queryFn: () =>
          fetchBuildings({
            ...DEFAULT_LIST_PARAMS,
            search: undefined,
          }),
        ...listQueryOptions,
      });

    case '/dashboard/organizations/branches/buildings/rooms':
      return queryClient.prefetchQuery({
        queryKey: queryKeys.auditoriums.list({ search: '', isActive: true, page: 1, pageSize: LIST_PAGE_SIZE }),
        queryFn: () =>
          fetchAuditoriums({
            ...DEFAULT_LIST_PARAMS,
            search: undefined,
          }),
        ...listQueryOptions,
      });

    case '/dashboard/cameras':
      return queryClient.prefetchQuery({
        queryKey: queryKeys.cameras.list({ page: 1, pageSize: LIST_PAGE_SIZE }),
        queryFn: () => fetchCameras({ page: 1, pageSize: LIST_PAGE_SIZE }),
        ...listQueryOptions,
      });

    case '/dashboard/users':
      return queryClient.prefetchQuery({
        queryKey: queryKeys.users.list({ page: 1, pageSize: LIST_PAGE_SIZE, scope: 'all' }),
        queryFn: () => fetchUsers({ page: 1, pageSize: LIST_PAGE_SIZE }),
        ...listQueryOptions,
      });

    case '/dashboard/users/roles':
      return queryClient.prefetchQuery({
        queryKey: queryKeys.roles.list({ page: 1, pageSize: LIST_PAGE_SIZE }),
        queryFn: () => fetchRoles({ page: 1, pageSize: LIST_PAGE_SIZE }),
        ...listQueryOptions,
      });

    case '/dashboard/live':
      return queryClient.prefetchQuery({
        queryKey: queryKeys.cameras.list({ page: 1, pageSize: LIST_PAGE_SIZE }),
        queryFn: () => fetchCameras({ page: 1, pageSize: LIST_PAGE_SIZE }),
        ...listQueryOptions,
      });

    default:
      if (/^\/dashboard\/organizations\/\d+\/buildings$/.test(normalized)) {
        const universityId = Number(normalized.split('/')[3]);
        return queryClient.prefetchQuery({
          queryKey: queryKeys.buildings.list({
            universityId,
            search: '',
            isActive: true,
            page: 1,
            pageSize: LIST_PAGE_SIZE,
          }),
          queryFn: () =>
            fetchBuildings({
              ...DEFAULT_LIST_PARAMS,
              universityId,
              search: undefined,
            }),
          ...listQueryOptions,
        });
      }

      if (/^\/dashboard\/organizations\/\d+\/buildings\/\d+\/rooms$/.test(normalized)) {
        const segments = normalized.split('/');
        const buildingId = Number(segments[5]);
        return queryClient.prefetchQuery({
          queryKey: queryKeys.auditoriums.list({
            buildingId,
            search: '',
            isActive: true,
            page: 1,
            pageSize: LIST_PAGE_SIZE,
          }),
          queryFn: () =>
            fetchAuditoriums({
              ...DEFAULT_LIST_PARAMS,
              buildingId,
              search: undefined,
            }),
          ...listQueryOptions,
        });
      }

      return Promise.resolve();
  }
}

export function prefetchAnalyticsCharts(queryClient, { tempParams, failuresParams, tempRange, failuresRange }) {
  return Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.analytics.attendanceDynamics('students', tempRange, tempParams),
      queryFn: () => fetchAttendanceDynamics({ ...tempParams, userType: 'students' }),
      ...analyticsQueryOptions,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.analytics.attendanceDynamics('teachers', failuresRange, failuresParams),
      queryFn: () => fetchAttendanceDynamics({ ...failuresParams, userType: 'teachers' }),
      ...analyticsQueryOptions,
    }),
  ]);
}
