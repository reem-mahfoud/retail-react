import { apiClient, getResponseData } from 'api/client';
import { buildListQueryParams } from 'lib/getQueryParams';

/** @param {{ page?: number, pageSize?: number, search?: string, isActive?: boolean, signal?: AbortSignal }} [options] */
export async function fetchUniversities(options = {}) {
  const {
    page = 1,
    pageSize = 10,
    search,
    isActive,
    signal,
  } = options;
  const response = await apiClient.get('/universities/', {
    params: buildListQueryParams({
      page,
      pageSize,
      search,
      isActive,
      searchWireKey: 'search_str',
    }),
    signal,
  });
  return getResponseData(response);
}
