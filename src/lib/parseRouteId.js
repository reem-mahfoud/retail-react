/** @param {import('types/common').RouteParam} value */
export function parseNumericRouteId(value) {
  const raw = String(value ?? '').trim();
  if (/^\d+$/.test(raw)) return Number(raw);
  return null;
}

/**
 * @param {import('types/common').RouteParam} value
 * @param {string} prefix e.g. `bdg` for `bdg-12`
 */
export function parsePrefixedRouteId(value, prefix) {
  const numeric = parseNumericRouteId(value);
  if (numeric != null) return numeric;
  const match = new RegExp(`^${prefix}-(\\d+)$`).exec(String(value ?? '').trim());
  return match ? Number(match[1]) : null;
}

/** @param {import('types/common').RouteParam} universityId */
export function parseUniversityId(universityId) {
  return parseNumericRouteId(universityId);
}

/** @param {import('types/common').RouteParam} buildingId */
export function parseBuildingId(buildingId) {
  return parsePrefixedRouteId(buildingId, 'bdg');
}
