/**
 * Filter lines — design SVG 20×20 (single path).
 */
export default function FilterLinesIcon({
  className = 'h-5 w-5 shrink-0',
  stroke = 'currentColor',
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
        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

