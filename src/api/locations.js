import { apiClient, getResponseData } from 'api/client';
import { buildListQueryParams } from 'lib/getQueryParams';

/** @param {{ page?: number, pageSize?: number, isActive?: boolean, search?: string, signal?: AbortSignal }} [options] */
export async function fetchLocations(options = {}) {
  const {
    page = 1,
    pageSize = 10,
    isActive,
    search,
    signal,
  } = options;
  const response = await apiClient.get('/locations/', {
    params: buildListQueryParams({ page, pageSize, search, isActive }),
    signal,
  });
  return getResponseData(response);
}
