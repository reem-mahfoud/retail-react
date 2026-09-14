import { API_PATH, CAM_PATH, MODEL_PATH } from 'config/env';
import { createApiClient } from 'api/createApiClient';
import { asString, isPlainObject, pickString } from 'lib/safeValues';

export const apiClient = createApiClient(API_PATH);
export const camClient = createApiClient(CAM_PATH);
export const modelClient = createApiClient(MODEL_PATH);

export function getResponseData(response, fallback = null) {
  return response?.data ?? fallback;
}

export function getResponseDataAsString(response, fallback = '') {
  return asString(getResponseData(response), fallback);
}

export function getResponseFieldAsString(response, key, fallback = '') {
  const data = getResponseData(response);
  if (!isPlainObject(data)) return fallback;
  return pickString(data, key, fallback);
}
