interface StatusBadgeProps {
  label: string
  tone?: 'blue' | 'green' | 'gray'
}

const tones = {
  blue: 'bg-blue-50 text-blue-900 ring-blue-100',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  gray: 'bg-gray-100 text-gray-700 ring-gray-200',
}

export const StatusBadge = ({ label, tone = 'blue' }: StatusBadgeProps) => (
  <span
    className={[
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1',
      tones[tone],
    ].join(' ')}
  >
    {label}
  </span>
)
