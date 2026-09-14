import { camClient, getResponseData } from 'api/client';
import { branchIdQueryParam, buildListQueryParams } from 'lib/getQueryParams';

/** @param {{ page?: number, pageSize?: number, search?: string, isActive?: boolean, branchId?: number | string, signal?: AbortSignal }} [options] */
export async function fetchCameras(options = {}) {
  const {
    page = 1,
    pageSize = 10,
    search,
    isActive,
    branchId,
    signal,
  } = options;
  const response = await camClient.get('/cameras/', {
    params: {
      ...buildListQueryParams({
        page,
        pageSize,
        search,
        isActive,
        searchWireKey: 'search_str',
      }),
      ...branchIdQueryParam(branchId),
    },
    signal,
  });
  return getResponseData(response);
}
