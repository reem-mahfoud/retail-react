import { readStorageJson, writeStorageJson } from 'lib/safeStorage';

import { subscribeStorageList } from 'lib/subscribeStorageList';



const LS_KEYS = {

  UNIVERSITIES: 'ua:universities',

  BUILDINGS: 'ua:buildings',

  ROOMS: 'ua:rooms',

};



export const UA_ENTITIES_CHANGED = {

  UNIVERSITIES: 'ua:universities-changed',

  BUILDINGS: 'ua:buildings-changed',

  ROOMS: 'ua:rooms-changed',

};



/** @param {string} key @returns {unknown[] | null} */

function readList(key) {

  if (typeof window === 'undefined') return null;

  const parsed = readStorageJson(window.localStorage, key, null);

  return Array.isArray(parsed) ? parsed.filter(Boolean) : null;

}



/** @param {string} key @param {string} changedEvent @param {unknown[]} list */

function writeList(key, changedEvent, list) {

  if (typeof window === 'undefined') return;

  if (!writeStorageJson(window.localStorage, key, Array.isArray(list) ? list : [])) return;

  window.dispatchEvent(new CustomEvent(changedEvent));

}



/** @param {string} key @param {string} changedEvent @param {unknown[]} seed */

function ensureSeed(key, changedEvent, seed) {

  if (typeof window === 'undefined') return Array.isArray(seed) ? seed : [];

  const existing = readList(key);

  if (existing && existing.length) return existing;

  const next = (Array.isArray(seed) ? seed : []).map((r) => {
    const row = /** @type {Record<string, unknown>} */ (r);
    return { ...row };
  });

  writeList(key, changedEvent, next);

  return next;

}



export function getUniversities(seed = []) {

  return ensureSeed(LS_KEYS.UNIVERSITIES, UA_ENTITIES_CHANGED.UNIVERSITIES, seed);

}

export function setUniversities(list) {

  writeList(LS_KEYS.UNIVERSITIES, UA_ENTITIES_CHANGED.UNIVERSITIES, list);

}

export function subscribeUniversities(cb) {

  return subscribeStorageList(UA_ENTITIES_CHANGED.UNIVERSITIES, cb);

}



export function getBuildings(seed = []) {

  return ensureSeed(LS_KEYS.BUILDINGS, UA_ENTITIES_CHANGED.BUILDINGS, seed);

}

export function setBuildings(list) {

  writeList(LS_KEYS.BUILDINGS, UA_ENTITIES_CHANGED.BUILDINGS, list);

}

export function subscribeBuildings(cb) {

  return subscribeStorageList(UA_ENTITIES_CHANGED.BUILDINGS, cb);

}



export function getRooms(seed = []) {

  return ensureSeed(LS_KEYS.ROOMS, UA_ENTITIES_CHANGED.ROOMS, seed);

}

export function setRooms(list) {

  writeList(LS_KEYS.ROOMS, UA_ENTITIES_CHANGED.ROOMS, list);

}

export function subscribeRooms(cb) {

  return subscribeStorageList(UA_ENTITIES_CHANGED.ROOMS, cb);

}

