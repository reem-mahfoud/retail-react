import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cacheScopes, invalidateCacheScope } from 'api/queryCache';
import { getAccessToken } from 'api/tokenStorage';
import { WS_PATH } from 'config/env';
import { safeJsonParse } from 'lib/safeJson';
import { runSafelyVoid } from 'lib/runSafely';

const SCOPE_ALIASES = {
  users: 'users',
  user: 'users',
  cameras: 'cameras',
  camera: 'cameras',
  locations: 'locations',
  location: 'locations',
  branches: 'locations',
  branch: 'locations',
  buildings: 'buildings',
  building: 'buildings',
  auditoriums: 'auditoriums',
  auditorium: 'auditoriums',
  rooms: 'auditoriums',
  room: 'auditoriums',
  universities: 'universities',
  university: 'universities',
  organizations: 'universities',
  roles: 'roles',
  role: 'roles',
  analytics: 'analytics',
  'smart-cameras': 'smartCameras',
  smart_cameras: 'smartCameras',
};

function resolveScope(raw) {
  const key = String(raw ?? '').toLowerCase();
  return SCOPE_ALIASES[key] ?? null;
}

function buildWsUrl() {
  if (!WS_PATH) return '';
  const token = getAccessToken();
  if (!token) return WS_PATH;
  try {
    const u = new URL(WS_PATH);
    u.searchParams.set('token', token);
    return u.href;
  } catch {
    return WS_PATH;
  }
}

function handleSocketMessage(queryClient, event) {
  const payload = safeJsonParse(event.data);
  if (!payload) return;

  const scope = resolveScope(payload?.scope ?? payload?.resource ?? payload?.type);
  if (scope && cacheScopes[scope]) {
    invalidateCacheScope(queryClient, cacheScopes[scope]);
    return;
  }

  if (Array.isArray(payload?.queryKey)) {
    runSafelyVoid(() => {
      queryClient.invalidateQueries({ queryKey: payload.queryKey });
    });
  }
}

/**
 * WebSocket → invalidate React Query cache → REST refetch on next read.
 * @param {{ enabled?: boolean }} [options]
 */
export function useQueryInvalidationSocket(options = {}) {
  const { enabled = true } = options;
  const queryClient = useQueryClient();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!enabled || !WS_PATH) return undefined;

    const url = buildWsUrl();
    if (!url) return undefined;

    let ws;
    try {
      ws = new WebSocket(url);
    } catch {
      return undefined;
    }
    socketRef.current = ws;

    ws.onmessage = (event) => {
      runSafelyVoid(() => handleSocketMessage(queryClient, event));
    };

    ws.onerror = () => {
      /* browser will also fire onclose */
    };

    ws.onclose = () => {
      socketRef.current = null;
    };

    return () => {
      try {
        ws.close();
      } catch {
        /* ignore */
      }
      socketRef.current = null;
    };
  }, [enabled, queryClient]);
}
