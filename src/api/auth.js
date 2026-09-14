import { apiClient, getResponseData } from 'api/client';
import { setAccessToken, clearAccessToken, getAccessToken } from 'api/tokenStorage';
import {
  setUserSession,
  getUserSession,
  clearUserSession,
} from 'api/userSessionStorage';

/** @param {string} username @param {string} password */
export async function loginApi(username, password) {
  const response = await apiClient.post('/login', { username, password });
  const data = getResponseData(response);
  const token = data?.access_token;

  if (!token) {
    throw new Error('No access token received');
  }

  setAccessToken(token);
  return data;
}

export function logoutApi() {
  clearAccessToken();
  clearUserSession();
}

export function persistAuthSession(user) {
  setUserSession(user);
}

export function restoreAuthSession() {
  if (!getAccessToken()) {
    clearUserSession();
    return null;
  }
  return getUserSession();
}
