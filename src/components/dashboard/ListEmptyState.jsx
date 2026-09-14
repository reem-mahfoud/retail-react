const VARIANT_CLASS = {
  default:
    'rounded-xl border border-dashed border-[#D5D7DA] bg-[#FAFAFA] px-4 py-10 text-center text-sm text-[#535862]',
  muted:
    'rounded-[10px] border border-dashed border-[#D0D5DD] bg-[#F9FAFB] px-4 py-10 text-center text-sm text-[#667085]',
  compact:
    'rounded-xl border border-dashed border-[#D0D5DD] bg-[#FAFAFA] py-10 text-center text-sm text-[#667085]',
  panel:
    'rounded-2xl border border-dashed border-[#D0D5DD] bg-[#F9FAFB] px-4 py-10 text-center text-sm text-[#667085]',
};

/**
 * @param {{ children: import('react').ReactNode, variant?: keyof typeof VARIANT_CLASS, className?: string, as?: 'div' | 'p' }} props
 */
export default function ListEmptyState({
  children,
  variant = 'default',
  className = '',
  as: Tag = 'div',
}) {
  return (
    <Tag className={`${VARIANT_CLASS[variant] ?? VARIANT_CLASS.default} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
