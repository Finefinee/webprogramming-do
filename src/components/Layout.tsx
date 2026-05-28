import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-white">
    <div className="min-h-screen w-full overflow-hidden bg-white">
      <main className="min-h-screen pb-8">{children}</main>
    </div>
  </div>
)
