import axios from 'axios';
import { emitUnauthorized } from 'api/authEvents';
import { getAccessToken } from 'api/tokenStorage';
import { asString } from 'lib/safeValues';
import { runSafelyVoid } from 'lib/runSafely';

/**
 * @param {string} baseURL
 * @param {{ timeout?: number }} [options]
 */
export function createApiClient(baseURL, options = {}) {
  const { timeout = 15_000 } = options;
  const client = axios.create({
    baseURL,
    timeout,
    headers: { 'Content-Type': 'application/json' },
  });

  client.interceptors.request.use((config) => {
    runSafelyVoid(() => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    });
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      runSafelyVoid(() => {
        const status = error?.response?.status;
        const requestUrl = asString(error?.config?.url, '');
        const isLoginRequest = requestUrl.includes('/login');

        if (status === 401 && !isLoginRequest) {
          emitUnauthorized();
        }
      });

      return Promise.reject(error);
    },
  );

  return client;
}
