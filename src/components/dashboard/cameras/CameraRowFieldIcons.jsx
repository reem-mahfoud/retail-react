/**
 * Outline icons for camera list row — branch / organization / edge device / ROI (design-aligned).
 */

export function BranchFieldIcon({ className = 'h-4 w-4 text-[#667085]' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M12.5 17.5V13C12.5 12.5333 12.5 12.2999 12.4092 12.1217C12.3293 11.9649 12.2018 11.8374 12.045 11.7575C11.8667 11.6667 11.6334 11.6667 11.1667 11.6667H8.83333C8.36662 11.6667 8.13327 11.6667 7.95501 11.7575C7.79821 11.8374 7.67072 11.9649 7.59083 12.1217C7.5 12.2999 7.5 12.5333 7.5 13V17.5M15.8333 17.5V5.16667C15.8333 4.23325 15.8333 3.76654 15.6517 3.41002C15.4919 3.09641 15.2369 2.84144 14.9233 2.68166C14.5668 2.5 14.1001 2.5 13.1667 2.5H6.83333C5.89991 2.5 5.4332 2.5 5.07668 2.68166C4.76308 2.84144 4.50811 3.09641 4.34832 3.41002C4.16667 3.76654 4.16667 4.23325 4.16667 5.16667V17.5M17.5 17.5H2.5M7.91667 6.66667H7.925M12.0833 6.66667H12.0917M8.33333 6.66667C8.33333 6.89679 8.14679 7.08333 7.91667 7.08333C7.68655 7.08333 7.5 6.89679 7.5 6.66667C7.5 6.43655 7.68655 6.25 7.91667 6.25C8.14679 6.25 8.33333 6.43655 8.33333 6.66667ZM12.5 6.66667C12.5 6.89679 12.3135 7.08333 12.0833 7.08333C11.8532 7.08333 11.6667 6.89679 11.6667 6.66667C11.6667 6.43655 11.8532 6.25 12.0833 6.25C12.3135 6.25 12.5 6.43655 12.5 6.66667Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrganizationFieldIcon({ className = 'h-4 w-4 text-[#667085]' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M2.75 17V11.25C2.75 10.56 3.31 10 4 10H5.75C6.44 10 7 10.56 7 11.25V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 17V6.75C8.25 6.06 8.81 5.5 9.5 5.5H10.5C11.19 5.5 11.75 6.06 11.75 6.75V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.65 8.35h1.7M9.65 10.55h1.7M9.65 12.75h1.7" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      <path
        d="M13 17V11.25C13 10.56 13.56 10 14.25 10H16C16.69 10 17.25 10.56 17.25 11.25V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2 17H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EdgeDeviceFieldIcon({ className = 'h-4 w-4 text-[#667085]' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3.5" y="2.5" width="13" height="15" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 10.25h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6.25" cy="14.25" r="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="13.35" width="6.5" height="1.8" rx="0.9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function RoiFieldIcon({ className = 'h-4 w-4 text-[#344054]' }) {
  const sw = 1.2;
  const rx = 0.42;
  const node = 2.15;
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Closed perspective quad: left edge taller, right shorter; top/bottom slanted — 4 edges only */}
      <path
        d="M 3.75 3.45 L 12.05 5.35 L 12.05 10.65 L 3.75 12.55 Z"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Hollow corner nodes (white fill clears stroke overlap on typical light UI) */}
      <rect x="2.68" y="2.38" width={node} height={node} rx={rx} fill="white" stroke="currentColor" strokeWidth={sw} />
      <rect x="10.98" y="4.28" width={node} height={node} rx={rx} fill="white" stroke="currentColor" strokeWidth={sw} />
      <rect x="10.98" y="9.58" width={node} height={node} rx={rx} fill="white" stroke="currentColor" strokeWidth={sw} />
      <rect x="2.68" y="11.48" width={node} height={node} rx={rx} fill="white" stroke="currentColor" strokeWidth={sw} />
    </svg>
  );
}
