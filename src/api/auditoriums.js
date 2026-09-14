import { apiClient, getResponseData } from 'api/client';
import { buildListQueryParams } from 'lib/getQueryParams';

/** @param {{ page?: number, pageSize?: number, buildingId?: number, isActive?: boolean, search?: string, signal?: AbortSignal }} [options] */
export async function fetchAuditoriums(options = {}) {
  const {
    page = 1,
    pageSize = 10,
    buildingId,
    isActive,
    search,
    signal,
  } = options;
  const response = await apiClient.get('/auditoriums/', {
    params: {
      ...buildListQueryParams({ page, pageSize, search, isActive }),
      ...(buildingId != null ? { building_id: buildingId } : {}),
    },
    signal,
  });
  return getResponseData(response);
}
