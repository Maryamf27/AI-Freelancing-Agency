import { useLocation } from 'react-router-dom'
import { Bell, Menu, Search } from 'lucide-react'

const breadcrumbMap = {
  '/dashboard': ['Dashboard'],
  '/proposals': ['Proposals'],
  '/proposals/new': ['Proposals', 'New Proposal'],
  '/invoices': ['Invoices'],
}

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const crumbs = breadcrumbMap[location.pathname] || ['PropFlow']

  // For /proposals/:id
  const isProposalDetail = location.pathname.startsWith('/proposals/') && location.pathname !== '/proposals/new'

  return (
    <header className="h-[60px] flex items-center justify-between gap-3 px-4 sm:px-6 bg-cream-50 border-b border-cream-300 flex-shrink-0">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          aria-label="Open navigation"
          onClick={onMenuClick}
          className="p-1.5 -ml-1.5 rounded-lg text-charcoal-500 hover:bg-cream-200 lg:hidden"
        >
          <Menu size={19} />
        </button>
        <nav className="flex items-center gap-1.5 text-sm truncate">
        {isProposalDetail ? (
          <>
            <span className="text-charcoal-400">Proposals</span>
            <span className="text-charcoal-300">/</span>
            <span className="text-charcoal-700 font-medium">Detail</span>
          </>
        ) : (
          crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-charcoal-300">/</span>}
              <span className={i === crumbs.length - 1 ? 'text-charcoal-700 font-medium' : 'text-charcoal-400'}>
                {crumb}
              </span>
            </span>
          ))
        )}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search proposals..."
            className="pl-8 pr-4 py-1.5 rounded-lg bg-cream-200 border border-cream-300 text-sm text-charcoal-700 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all w-48 focus:w-64"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 rounded-lg hover:bg-cream-200 transition-colors">
          <Bell size={17} className="text-charcoal-500" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 scope-alert-dot" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-sage-400 transition-all">
          <span className="text-xs font-semibold text-sage-800">JK</span>
        </div>
      </div>
    </header>
  )
}
