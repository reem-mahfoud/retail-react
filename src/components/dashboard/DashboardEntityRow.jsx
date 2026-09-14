/**
 * Shared entity row primitives — matches UniversityBuildingRow / design system.
 * Mobile: primary info + optional subtitle. Desktop: single 72px horizontal row.
 */

export const entityRowShellClass =
  'w-full min-w-0 overflow-hidden rounded-xl border border-[#E9EAEB] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-colors hover:bg-[#FAFAFA]';

export const entityRowGridClass =
  'grid w-full min-w-0 grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-0.5 px-4 py-3 md:h-[72px] md:grid-cols-[auto_minmax(0,1.4fr)_repeat(2,minmax(0,0.7fr))_auto] md:gap-x-4 md:py-0 md:px-6';

export function EntityRowShell({ children, className = '', ...props }) {
  return (
    <div className={`${entityRowShellClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function EntityRowIcon({ children }) {
  return <span className="shrink-0 text-[#717680]">{children}</span>;
}

export function EntityRowTitle({ title, subtitle }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold leading-6 text-[#181D27] md:text-base" title={title}>
        {title}
      </p>
      {subtitle ? (
        <p className="truncate text-xs font-medium text-[#717680] md:hidden" title={subtitle}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function EntityRowMeta({ icon: Icon, label, className = '' }) {
  return (
    <div
      className={`hidden min-w-0 items-center gap-2 text-sm font-semibold text-[#414651] md:flex ${className}`.trim()}
    >
      {Icon ? <Icon className="h-5 w-5 shrink-0 text-[#717680]" aria-hidden /> : null}
      <span className="truncate" title={label}>
        {label}
      </span>
    </div>
  );
}

export function EntityRowDivider() {
  return <div className="mx-0 hidden h-8 w-px shrink-0 bg-[#E9EAEB] md:block" aria-hidden />;
}

export function EntityRowActions({ children }) {
  return <div className="flex shrink-0 items-center gap-1">{children}</div>;
}

export function EntityRowIconButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#717680] transition hover:bg-[#FAFAFA] hover:text-[#414651] ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
