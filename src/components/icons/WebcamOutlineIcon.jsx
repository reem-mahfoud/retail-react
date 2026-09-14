/**
 * Webcam outline — design SVG 20×20 (single path: base + outer ring + inner lens).
 */
export default function WebcamOutlineIcon({
  className = 'h-5 w-5 shrink-0',
  stroke = '#414651',
  ...rest
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M6.66663 18.3337H13.3333M17.0833 8.75033C17.0833 12.6623 13.912 15.8337 9.99996 15.8337C6.08794 15.8337 2.91663 12.6623 2.91663 8.75033C2.91663 4.83831 6.08794 1.66699 9.99996 1.66699C13.912 1.66699 17.0833 4.83831 17.0833 8.75033ZM12.6562 8.75033C12.6562 10.2173 11.467 11.4066 9.99996 11.4066C8.53295 11.4066 7.34371 10.2173 7.34371 8.75033C7.34371 7.28332 8.53295 6.09408 9.99996 6.09408C11.467 6.09408 12.6562 7.28332 12.6562 8.75033Z"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
