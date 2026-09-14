/**
 * Returns a masked phone string when enough digits exist; otherwise returns null.
 * Used in the SMS verification step during password reset.
 */
export function formatMaskedPhoneFromInput(raw) {
  const d = String(raw ?? '').replace(/\D/g, '');
  if (d.length >= 8) {
    return `+${d.slice(0, 3)} ${d.slice(3, 5)} •• ••${d.slice(-2)}`;
  }
  return null;
}
