/** @param {'active' | 'inactive' | string} status */
export function listStatusToIsActive(status) {
  if (status === 'active') return true;
  if (status === 'inactive') return false;
  return undefined;
}
