import {
  BarChart3,
  Bell,
  MessageCircle,
  PlusCircle,
  UserRound,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router'

interface HeaderProps {
  title?: string
  subtitle?: string
  children?: ReactNode
}

const headerLinks = [
  { to: '/dashboard', label: '순위', icon: BarChart3 },
  { to: '/chat', label: '채팅', icon: MessageCircle },
  { to: '/sell', label: '판매', icon: PlusCircle },
  { to: '/mypage', label: '마이', icon: UserRound },
]

export const Header = ({
  title = '대소마켓',
  subtitle,
  children,
}: HeaderProps) => (
  <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur">
    <div className="flex items-center justify-between gap-4">
      <Link to="/" className="min-w-0 shrink-0">
        <div className="flex items-center gap-2">
          <img
            src="/icon.svg"
            alt="대소마켓 로고"
            className="h-9 w-12 shrink-0 object-contain"
          />
          <div className="min-w-0">
            <h1 className="truncate text-xl font-black tracking-normal text-gray-950">
              {title}
            </h1>
            {subtitle ? (
              <p className="truncate text-xs font-medium text-gray-500">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="flex min-w-0 items-center gap-2">
        <nav className="flex min-w-0 items-center gap-1">
          {headerLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              aria-label={label}
              className={({ isActive }) =>
                [
                  'flex h-10 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-bold transition max-[521px]:w-10 max-[521px]:px-0',
                  isActive
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
                ].join(' ')
              }
            >
              <Icon size={18} strokeWidth={2.2} />
              <span className="whitespace-nowrap max-[521px]:hidden">
                {label}
              </span>
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          aria-label="알림"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100 text-gray-700 hover:bg-gray-50"
        >
          <Bell size={19} />
        </button>
      </div>
    </div>
    {children ? <div className="mt-4">{children}</div> : null}
  </header>
)
