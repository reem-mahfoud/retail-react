import { apiClient, getResponseData } from 'api/client';
import {
  branchIdQueryParam,
  dateStrQueryParam,
  departmentIdQueryParam,
  granularityQueryParam,
} from 'lib/getQueryParams';

/** @param {{ period?: string, granularity?: string, startDate?: number, endDate?: number, dateStr?: string, userType?: string, branchId?: number | string, departmentId?: number | string, signal?: AbortSignal }} [options] */
export async function fetchAttendanceDynamics(options = {}) {
  const {
    period = 'monthly',
    granularity,
    startDate,
    endDate,
    dateStr,
    userType = 'students',
    branchId,
    departmentId,
    signal,
  } = options;
  const response = await apiClient.get('/statistics-new/attendance-dynamics/', {
    params: {
      period: granularity ?? period,
      user_type: userType,
      ...(startDate != null ? { start_date: startDate } : {}),
      ...(endDate != null ? { end_date: endDate } : {}),
      ...dateStrQueryParam(dateStr),
      ...granularityQueryParam(granularity),
      ...branchIdQueryParam(branchId),
      ...departmentIdQueryParam(departmentId),
    },
    signal,
  });
  return getResponseData(response);
}

/** @param {{ startDate?: number, endDate?: number, dateStr?: string, facultyId?: number, educationTypeId?: number, branchId?: number | string, departmentId?: number | string, signal?: AbortSignal }} [options] */
export async function fetchDashboardSummary(options = {}) {
  const {
    startDate,
    endDate,
    dateStr,
    facultyId,
    educationTypeId,
    branchId,
    departmentId,
    signal,
  } = options;
  const response = await apiClient.get('/statistics-new/dashboard-summary/', {
    params: {
      ...(startDate != null ? { start_date: startDate } : {}),
      ...(endDate != null ? { end_date: endDate } : {}),
      ...dateStrQueryParam(dateStr),
      ...(facultyId != null ? { faculty_id: facultyId } : {}),
      ...(educationTypeId != null ? { education_type_id: educationTypeId } : {}),
      ...branchIdQueryParam(branchId),
      ...departmentIdQueryParam(departmentId),
    },
    signal,
  });
  return getResponseData(response);
}
