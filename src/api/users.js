import { apiClient, getResponseData } from 'api/client';
import {
  branchIdQueryParam,
  buildListQueryParams,
  departmentIdQueryParam,
} from 'lib/getQueryParams';

/** @param {{ page?: number, pageSize?: number, profileType?: string, search?: string, branchId?: number | string, departmentId?: number | string, signal?: AbortSignal }} [options] */
export async function fetchUsers(options = {}) {
  const {
    page = 1,
    pageSize = 10,
    profileType,
    search,
    branchId,
    departmentId,
    signal,
  } = options;
  const response = await apiClient.get('/users/', {
    params: {
      ...buildListQueryParams({ page, pageSize, search, searchWireKey: 'search_str' }),
      ...(profileType ? { profile_type: profileType } : {}),
      ...branchIdQueryParam(branchId),
      ...departmentIdQueryParam(departmentId),
    },
    signal,
  });
  return getResponseData(response);
}
