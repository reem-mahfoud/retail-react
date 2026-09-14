import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAttendanceDynamics, fetchDashboardSummary } from 'api/analytics';
import { queryKeys } from 'api/queryKeys';
import { analyticsQueryOptions } from 'api/queryOptions';
import {
  mapAttendanceAndCamerasToFailuresChart,
  mapAttendanceDynamicsToTemperatureChart,
  mapSmartCameraToDeviceCard,
} from 'api/mappers';
import { useSmartCamerasQuery } from 'hooks/queries';
import { analyticsRangeToQuery } from 'lib/analyticsRange';
import { runSafelyVoid } from 'lib/runSafely';

/**
 * @typedef {import('types/analytics').AnalyticsDashboardOptions} AnalyticsDashboardOptions
 */

/** @param {AnalyticsDashboardOptions} [options] */
export function useAnalyticsDashboard(options = {}) {
  const {
    tempRange,
    failuresRange,
    branchId = null,
    departmentId = null,
    dateStr = '',
  } = options;
  const tempParams = useMemo(
    () => ({
      ...analyticsRangeToQuery(tempRange, { dateStr }),
      branchId: branchId ?? undefined,
      departmentId: departmentId ?? undefined,
    }),
    [tempRange, dateStr, branchId, departmentId],
  );

  const failuresParams = useMemo(
    () => ({
      ...analyticsRangeToQuery(failuresRange, { dateStr }),
      branchId: branchId ?? undefined,
      departmentId: departmentId ?? undefined,
    }),
    [failuresRange, dateStr, branchId, departmentId],
  );

  const summaryParams = useMemo(
    () => ({
      dateStr: dateStr || undefined,
      branchId: branchId ?? undefined,
      departmentId: departmentId ?? undefined,
    }),
    [dateStr, branchId, departmentId],
  );

  const temperatureQuery = useQuery({
    queryKey: queryKeys.analytics.attendanceDynamics('students', tempRange, tempParams),
    queryFn: ({ signal }) =>
      fetchAttendanceDynamics({ ...tempParams, userType: 'students', signal }),
    ...analyticsQueryOptions,
  });

  const failuresAttendanceQuery = useQuery({
    queryKey: queryKeys.analytics.attendanceDynamics('teachers', failuresRange, failuresParams),
    queryFn: ({ signal }) =>
      fetchAttendanceDynamics({ ...failuresParams, userType: 'teachers', signal }),
    ...analyticsQueryOptions,
  });

  const summaryQuery = useQuery({
    queryKey: queryKeys.analytics.dashboardSummary(summaryParams),
    queryFn: ({ signal }) => fetchDashboardSummary({ ...summaryParams, signal }),
    ...analyticsQueryOptions,
  });

  const smartCamerasQuery = useSmartCamerasQuery();

  const temperatureChart = useMemo(
    () => mapAttendanceDynamicsToTemperatureChart(temperatureQuery.data?.results, tempRange),
    [temperatureQuery.data, tempRange],
  );

  const failuresChart = useMemo(
    () =>
      mapAttendanceAndCamerasToFailuresChart(
        failuresAttendanceQuery.data?.results,
        summaryQuery.data?.cameras,
        failuresRange,
      ),
    [failuresAttendanceQuery.data, summaryQuery.data, failuresRange],
  );

  const deviceCards = useMemo(() => {
    const cameras = smartCamerasQuery.data?.cameras ?? [];
    const summary = summaryQuery.data ?? null;
    return cameras.slice(0, 3).map((camera) => mapSmartCameraToDeviceCard(camera, summary));
  }, [smartCamerasQuery.data, summaryQuery.data]);

  const isLoading = useMemo(
    () =>
      temperatureQuery.isLoading ||
      failuresAttendanceQuery.isLoading ||
      summaryQuery.isLoading ||
      smartCamerasQuery.isLoading,
    [
      temperatureQuery.isLoading,
      failuresAttendanceQuery.isLoading,
      summaryQuery.isLoading,
      smartCamerasQuery.isLoading,
    ],
  );

  const isFetching = useMemo(
    () =>
      temperatureQuery.isFetching ||
      failuresAttendanceQuery.isFetching ||
      summaryQuery.isFetching ||
      smartCamerasQuery.isFetching,
    [
      temperatureQuery.isFetching,
      failuresAttendanceQuery.isFetching,
      summaryQuery.isFetching,
      smartCamerasQuery.isFetching,
    ],
  );

  const isError = useMemo(
    () =>
      temperatureQuery.isError ||
      failuresAttendanceQuery.isError ||
      summaryQuery.isError ||
      smartCamerasQuery.isError,
    [
      temperatureQuery.isError,
      failuresAttendanceQuery.isError,
      summaryQuery.isError,
      smartCamerasQuery.isError,
    ],
  );

  const error = useMemo(
    () =>
      temperatureQuery.error ||
      failuresAttendanceQuery.error ||
      summaryQuery.error ||
      smartCamerasQuery.error,
    [
      temperatureQuery.error,
      failuresAttendanceQuery.error,
      summaryQuery.error,
      smartCamerasQuery.error,
    ],
  );

  return {
    temperatureChart,
    failuresChart,
    deviceCards,
    smartCamerasData: smartCamerasQuery.data,
    isLoading,
    isFetching,
    isError,
    error,
    refetchCharts: () => {
      runSafelyVoid(() => temperatureQuery.refetch());
      runSafelyVoid(() => failuresAttendanceQuery.refetch());
      runSafelyVoid(() => summaryQuery.refetch());
    },
  };
}
