import { apiClient, getResponseData } from 'api/client';
import { buildListQueryParams } from 'lib/getQueryParams';

/** @param {{ page?: number, pageSize?: number, universityId?: number, isActive?: boolean, search?: string, signal?: AbortSignal }} [options] */
export async function fetchBuildings(options = {}) {
  const {
    page = 1,
    pageSize = 10,
    universityId,
    isActive,
    search,
    signal,
  } = options;
  const response = await apiClient.get('/buildings/', {
    params: {
      ...buildListQueryParams({ page, pageSize, search, isActive }),
      ...(universityId != null ? { university_id: universityId } : {}),
    },
    signal,
  });
  return getResponseData(response);
}
