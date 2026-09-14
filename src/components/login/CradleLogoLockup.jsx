import React from 'react';
import { ReactComponent as Logo } from 'assets/branding/cradle-logo-lockup.svg';

export default function CradleLogoLockup({ className = '' }) {
  return <Logo className={className} aria-label="Cradle" role="img" />;
}

