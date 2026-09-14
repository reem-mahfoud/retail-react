/**
 * @typedef {'device' | 'university'} LoginRole
 * @typedef {{ loginRole?: LoginRole } | null | undefined} AuthUserLike
 */

export const AUTH_ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  dashboardOrganizations: '/dashboard/organizations',
  dashboardUsers: '/dashboard/users',
};

/**
 * @param {unknown} role
 * @returns {LoginRole}
 */
export function parseLoginRole(role) {
  return role === 'university' ? 'university' : 'device';
}

/**
 * @param {AuthUserLike} user
 * @returns {boolean}
 */
export function isUniversityAdmin(user) {
  return user?.loginRole === 'university';
}

/**
 * @param {AuthUserLike} user
 * @returns {string}
 */
export function getDashboardHomePath(user) {
  return isUniversityAdmin(user)
    ? AUTH_ROUTES.dashboardOrganizations
    : AUTH_ROUTES.dashboard;
}

/**
 * @param {LoginRole} loginRole
 * @returns {string}
 */
export function getDashboardHomePathForRole(loginRole) {
  return loginRole === 'university'
    ? AUTH_ROUTES.dashboardOrganizations
    : AUTH_ROUTES.dashboard;
}

/**
 * Home link for error pages and similar (auth-aware).
 * @param {{ isAuthenticated: boolean; user?: AuthUserLike }} params
 * @returns {string}
 */
export function getAppHomePath({ isAuthenticated, user }) {
  if (!isAuthenticated) return AUTH_ROUTES.login;
  return getDashboardHomePath(user);
}
