import { asTrimmedString } from 'lib/safeValues';

/**
 * Avatar URL from email (Unavatar aggregates Gravatar and others).
 * @param {unknown} email
 * @param {string | null} [fallbackAbsoluteUrl] — absolute URL when no avatar is found
 */
export function emailAvatarUrl(email, fallbackAbsoluteUrl) {
  const e = asTrimmedString(email).toLowerCase();
  if (!e) return null;
  const base = `https://unavatar.io/${encodeURIComponent(e)}`;
  const fallback = asTrimmedString(fallbackAbsoluteUrl);
  if (!fallback) return base;
  return `${base}?fallback=${encodeURIComponent(fallback)}`;
}
