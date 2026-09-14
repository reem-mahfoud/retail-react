import { apiClient, getResponseData } from 'api/client';
import { buildListQueryParams } from 'lib/getQueryParams';

/** @param {{ page?: number, pageSize?: number, search?: string, signal?: AbortSignal }} [options] */
export async function fetchRoles(options = {}) {
  const { page = 1, pageSize = 10, search, signal } = options;
  const response = await apiClient.get('/roles_list/', {
    params: buildListQueryParams({ page, pageSize, search }),
    signal,
  });
  return getResponseData(response);
}
