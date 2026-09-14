import { camClient, getResponseData } from 'api/client';
import { buildListQueryParams } from 'lib/getQueryParams';

/** @param {{ page?: number, pageSize?: number, auditoriumId?: number, search?: string, signal?: AbortSignal }} [options] */
export async function fetchSmartCameras(options = {}) {
  const {
    page = 1,
    pageSize = 10,
    auditoriumId,
    search,
    signal,
  } = options;
  const response = await camClient.get('/smart_cameras/', {
    params: {
      ...buildListQueryParams({ page, pageSize, search }),
      ...(auditoriumId != null ? { auditorium_id: auditoriumId } : {}),
    },
    signal,
  });
  return getResponseData(response);
}
