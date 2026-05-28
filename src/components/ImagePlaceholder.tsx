import { ImageIcon } from 'lucide-react'

interface ImagePlaceholderProps {
  className?: string
}

export const ImagePlaceholder = ({ className = '' }: ImagePlaceholderProps) => (
  <div
    className={[
      'flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 text-blue-900',
      className,
    ].join(' ')}
  >
    <ImageIcon size={28} strokeWidth={1.9} />
  </div>
)
