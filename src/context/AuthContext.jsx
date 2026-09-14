import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  loginApi,
  logoutApi,
  persistAuthSession,
  restoreAuthSession,
} from 'api/auth';
import { onUnauthorized } from 'api/authEvents';
import { clearQueryCache } from 'api/queryCache';
import { MOCK_USER } from 'constants/mockUser';
import {
  getDashboardHomePathForRole,
  parseLoginRole,
} from 'lib/authRoutes';
import { runSafelyVoid } from 'lib/runSafely';
import { asOptionalTrimmedString, asTrimmedString, isPlainObject } from 'lib/safeValues';

const AuthContext = createContext(/** @type {import('types/auth').AuthContextValue | undefined} */ (undefined));

function normalizeCredentials(credentials) {
  const c = isPlainObject(credentials) ? credentials : {};
  const rawUser = asTrimmedString(c.username);
  const loginRole = parseLoginRole(c.role);
  const email = asTrimmedString(c.email) || (rawUser ? `${rawUser}@cradle.com` : MOCK_USER.email);
  const first = asTrimmedString(c.first_name) || (rawUser
    ? rawUser.charAt(0).toUpperCase() + rawUser.slice(1)
    : MOCK_USER.first_name);
  const last = asTrimmedString(c.last_name);
  const avatar = asOptionalTrimmedString(c.avatar);

  return { rawUser, loginRole, email, first, last, avatar };
}

function buildUserFromLogin(credentials, response) {
  const { rawUser, loginRole, email, first, last, avatar } =
    normalizeCredentials(credentials);
  const apiUser = response?.user;

  return {
    ...MOCK_USER,
    username: apiUser?.username ?? rawUser,
    email,
    first_name: first,
    last_name: last,
    loginRole,
    ...(avatar ? { avatar } : {}),
  };
}

function readInitialUser() {
  try {
    return restoreAuthSession();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readInitialUser);
  const queryClient = useQueryClient();

  useEffect(() => {
    return onUnauthorized(() => {
      runSafelyVoid(() => logoutApi());
      runSafelyVoid(() => clearQueryCache(queryClient));
      setUser(null);
    });
  }, [queryClient]);

  const login = useCallback(async (credentials) => {
    const { rawUser } = normalizeCredentials(credentials);
    const password = asTrimmedString(credentials?.password);

    if (!rawUser || !password) {
      throw new Error('Username and password are required');
    }

    const response = await loginApi(rawUser, password);
    const nextUser = buildUserFromLogin(credentials, response);
    runSafelyVoid(() => persistAuthSession(nextUser));
    setUser(nextUser);
    return getDashboardHomePathForRole(nextUser.loginRole);
  }, []);

  const logout = useCallback(async () => {
    runSafelyVoid(() => logoutApi());
    runSafelyVoid(() => clearQueryCache(queryClient));
    setUser(null);
  }, [queryClient]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user,
      loading: false,
    }),
    [user, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
