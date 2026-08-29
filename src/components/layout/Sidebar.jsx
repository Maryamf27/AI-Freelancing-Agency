import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Receipt,
  Plus,
  Settings,
  LogOut,
  Sparkles,
  ChevronDown,
} from 'lucide-react'
import { useAppData } from '../../context/AppDataContext'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/proposals', icon: FileText, label: 'Proposals' },
  { to: '/invoices', icon: Receipt, label: 'Invoices' },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = useAppData()
  const settingsActive = location.pathname.startsWith('/settings')

  return (
    <>
      <button
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-charcoal-900/40 transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside className={`fixed inset-y-0 left-0 z-40 w-[220px] flex-shrink-0 flex flex-col bg-cream-50 text-charcoal-700 border-r border-cream-300 shadow-card-lg lg:shadow-none h-full overflow-hidden transform transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-cream-300">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sage-600 flex items-center justify-center flex-shrink-0">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-display text-lg text-charcoal-800 tracking-tight">PropFlow</span>
        </div>
      </div>

      {/* Workspace switcher */}
      <div className="px-3 pt-4 pb-2">
        <button
          onClick={() => { navigate('/settings'); onClose?.() }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-cream-200 hover:bg-cream-300 transition-colors group"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 h-5 rounded bg-amber-300 flex-shrink-0 flex items-center justify-center">
              <span className="text-[9px] font-bold text-amber-900">{profile.avatarInitials}</span>
            </div>
            <span className="text-sm text-charcoal-700 truncate">{profile.name}</span>
          </div>
          <ChevronDown size={13} className="text-charcoal-500 flex-shrink-0" />
        </button>
      </div>

      {/* New Proposal CTA */}
      <div className="px-3 pb-4">
        <button
          onClick={() => navigate('/proposals/new')}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-sage-600 hover:bg-sage-700 text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          <Plus size={14} />
          New Proposal
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-charcoal-400">Menu</p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-sage-100 text-sage-800'
                  : 'text-charcoal-500 hover:bg-cream-200 hover:text-charcoal-800'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom user area */}
      <div className="px-3 py-4 border-t border-cream-300 space-y-0.5">
        <button
          onClick={() => { navigate('/settings'); onClose?.() }}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all ${
            settingsActive ? 'bg-sage-100 text-sage-800' : 'text-charcoal-500 hover:bg-cream-200 hover:text-charcoal-800'
          }`}
        >
          <Settings size={16} />
          Settings
        </button>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-charcoal-500 hover:bg-cream-200 hover:text-charcoal-800 transition-all"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
      </aside>
    </>
  )
}
