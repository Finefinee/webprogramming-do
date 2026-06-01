import {
  BarChart3,
  Home,
  MessageCircle,
  PlusCircle,
  UserRound,
} from 'lucide-react'
import { NavLink } from 'react-router'

const tabs = [
  { to: '/', label: '홈', icon: Home },
  { to: '/dashboard', label: '순위', icon: BarChart3 },
  { to: '/chat', label: '채팅', icon: MessageCircle },
  { to: '/sell', label: '판매', icon: PlusCircle },
  { to: '/mypage', label: '마이', icon: UserRound },
]

export const BottomNavigation = () => (
  <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white/95 px-3 pt-2 backdrop-blur">
    <div className="grid grid-cols-5 gap-1">
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            [
              'flex h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold transition',
              isActive
                ? 'bg-blue-50 text-blue-900'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800',
            ].join(' ')
          }
        >
          <Icon size={21} strokeWidth={2.2} />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  </nav>
)
