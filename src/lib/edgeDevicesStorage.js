import { EDGE_DEVICE_LIST_SEED } from 'components/dashboard/edge-devices/edgeDevicesSeed';
import { readStorageJson, writeStorageJson } from 'lib/safeStorage';
import { subscribeStorageList } from 'lib/subscribeStorageList';
import { runSafelyVoid } from 'lib/runSafely';

export const EDGE_DEVICES_LS = {
  ADDED: 'edge-devices:added',
  REMOVED_IDS: 'edge-devices:removed-ids',
};

const STORAGE_KEY = EDGE_DEVICES_LS.ADDED;
const REMOVED_IDS_KEY = EDGE_DEVICES_LS.REMOVED_IDS;

export const EDGE_DEVICES_LIST_CHANGED = 'edge-devices:list-changed';

function readStringArray(storage, key) {
  const parsed = readStorageJson(storage, key, null);
  return Array.isArray(parsed) ? parsed : null;
}

export function getAddedEdgeDevices() {
  if (typeof window === 'undefined') return [];
  const parsed = readStringArray(window.localStorage, STORAGE_KEY);
  if (!parsed) return [];
  return parsed.filter(Boolean);
}

export function addEdgeDeviceToStorage(device) {
  if (typeof window === 'undefined') return;
  const prev = getAddedEdgeDevices();
  const next = [device, ...prev].slice(0, 50);
  if (!writeStorageJson(window.localStorage, STORAGE_KEY, next)) return;
  runSafelyVoid(() => window.dispatchEvent(new CustomEvent(EDGE_DEVICES_LIST_CHANGED)));
}

/** Ids removed from the list (seed + added) — shared by management and device-update pages. */
export function getRemovedEdgeDeviceIds() {
  if (typeof window === 'undefined') return new Set();
  const parsed = readStringArray(window.localStorage, REMOVED_IDS_KEY);
  if (!parsed) return new Set();
  return new Set(parsed.map(String));
}

/** Call after confirm delete on management — list pages read via getMergedEdgeDeviceRows(). */
export function persistEdgeDeviceDeletion(deviceId) {
  if (typeof window === 'undefined') return;
  const idStr = String(deviceId);
  const removed = getRemovedEdgeDeviceIds();
  removed.add(idStr);
  writeStorageJson(window.localStorage, REMOVED_IDS_KEY, [...removed]);

  const added = getAddedEdgeDevices();
  const nextAdded = added.filter((d) => d && String(d.id) !== idStr);
  if (nextAdded.length !== added.length) {
    writeStorageJson(window.localStorage, STORAGE_KEY, nextAdded);
  }

  runSafelyVoid(() => window.dispatchEvent(new CustomEvent(EDGE_DEVICES_LIST_CHANGED)));
}

/** Added devices (minus deleted) then seed rows (minus deleted). */
export function getMergedEdgeDeviceRows() {
  const removed = getRemovedEdgeDeviceIds();
  const added = getAddedEdgeDevices().filter((d) => d && !removed.has(String(d.id)));
  const seed = EDGE_DEVICE_LIST_SEED.filter((d) => !removed.has(String(d.id))).map((r) => ({ ...r }));
  return [...added, ...seed];
}

/** @param {() => void} cb @returns {() => void} */
export function subscribeEdgeDevicesList(cb) {
  return subscribeStorageList(EDGE_DEVICES_LIST_CHANGED, cb);
}
