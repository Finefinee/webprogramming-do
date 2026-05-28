import type { ReactNode } from 'react'
import { PackageOpen } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <section className="rounded-3xl border border-dashed border-blue-100 bg-white px-6 py-10 text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-900 shadow-sm">
      <PackageOpen size={30} strokeWidth={2.1} />
    </div>
    <h2 className="mt-5 text-xl font-black tracking-normal text-gray-950">
      {title}
    </h2>
    <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
      {description}
    </p>
    {action ? <div className="mt-6">{action}</div> : null}
  </section>
)
