import { ROLE_COLOR_SWATCHES } from 'components/dashboard/users-dashboard/CreateRoleDialog';

export function apiColorToVariant(color) {
  if (!color) return 'default';
  const normalized = String(color).toLowerCase();
  const hit = ROLE_COLOR_SWATCHES.find((s) => s.dot.toLowerCase() === normalized);
  return hit?.variant ?? 'default';
}
