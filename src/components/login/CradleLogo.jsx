import { ReactComponent as CradleLogoMark } from 'assets/branding/cradle-logo.svg';

/**
 * Cradle logo — `cradle-logo.svg` (cropped viewBox for UI alignment, #7F56D9).
 */
export default function CradleLogo({ className = '' }) {
  return (
    <CradleLogoMark
      className={`shrink-0 ${className}`.trim()}
      role="img"
      aria-label="Cradle"
      focusable="false"
    />
  );
}
