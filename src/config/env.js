const DEFAULT_API = 'https://api-test.qarshidu.uz';

function wsUrlFromHttp(httpUrl) {
  try {
    const u = new URL(httpUrl);
    u.protocol = u.protocol === 'https:' ? 'wss:' : 'ws:';
    const basePath = u.pathname.replace(/\/$/, '');
    u.pathname = `${basePath}/ws/`;
    return u.href;
  } catch {
    return '';
  }
}

/** Main REST API (users, orgs, locations, analytics, …) */
export const API_PATH = process.env.REACT_APP_API_BASE_URL ?? DEFAULT_API;

/** Camera / streaming service */
export const CAM_PATH = process.env.REACT_APP_CAM_API_BASE_URL ?? API_PATH;

/** ML / model inference service */
export const MODEL_PATH = process.env.REACT_APP_MODEL_API_BASE_URL ?? API_PATH;

/** WebSocket endpoint for live invalidation events */
export const WS_PATH = process.env.REACT_APP_WS_URL ?? wsUrlFromHttp(API_PATH);
