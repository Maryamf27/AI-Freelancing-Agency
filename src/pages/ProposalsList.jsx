import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Filter, Copy, Send, Archive, MoreHorizontal } from 'lucide-react'
import Card from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { proposals } from '../data/mockData'

const FILTERS = ['All', 'Draft', 'Sent', 'Viewed', 'Signed', 'Overdue']

export default function ProposalsList() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(null)

  const filtered = proposals.filter((p) => {
    const matchFilter = activeFilter === 'All' || p.status === activeFilter.toLowerCase()
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const statusCounts = FILTERS.reduce((acc, f) => {
    acc[f] = f === 'All' ? proposals.length : proposals.filter((p) => p.status === f.toLowerCase()).length
    return acc
  }, {})

  return (
    <div className="space-y-5 animate-fade-in max-w-[1100px] w-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl text-charcoal-800">Proposals</h1>
          <p className="text-sm text-charcoal-400 mt-0.5">{proposals.length} total · {proposals.filter(p => p.status === 'signed').length} signed</p>
        </div>
        <button
          onClick={() => navigate('/proposals/new')}
          className="btn btn-primary gap-2 w-full sm:w-auto"
        >
          <Plus size={15} />
          New proposal
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col gap-3 items-stretch sm:flex-row sm:items-center sm:justify-between">
        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-cream-200 p-1 rounded-xl overflow-x-auto max-w-full">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === f
                  ? 'bg-white text-charcoal-800 shadow-sm'
                  : 'text-charcoal-500 hover:text-charcoal-700'
              }`}
            >
              {f}
              {statusCounts[f] > 0 && (
                <span className={`ml-1.5 text-[10px] ${activeFilter === f ? 'text-charcoal-400' : 'text-charcoal-400'}`}>
                  {statusCounts[f]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search proposals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 rounded-lg bg-white border border-cream-300 text-sm text-charcoal-700 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-sage-400 w-52"
          />
        </div>
      </div>

      {/* Table */}
      <Card padding={false}>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-3">
              <Filter size={20} className="text-charcoal-400" />
            </div>
            <p className="text-charcoal-500 text-sm">No proposals match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-base w-full">
              <thead>
                <tr>
                  <th>Proposal</th>
                  <th className="hidden sm:table-cell">Client</th>
                  <th>Status</th>
                  <th>Value</th>
                  <th className="hidden md:table-cell">Scope</th>
                  <th className="hidden sm:table-cell">Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='p-4'>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="cursor-pointer group"
                    onClick={() => navigate(`/proposals/${p.id}`)}
                  >
                    <td className="min-w-[150px] max-w-[240px]">
                      <p className="font-medium text-charcoal-800 group-hover:text-sage-700 transition-colors">{p.title}</p>
                      {p.dueDate && (
                        <p className="text-[10px] text-charcoal-400 mt-0.5">
                          Due {new Date(p.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      )}
                    </td>
                    <td className="hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-charcoal-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-[9px] font-semibold text-charcoal-600">{p.client[0]}</span>
                        </div>
                        <span className="text-charcoal-600 text-sm">{p.client}</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={p.status}>
                        <span className="capitalize">{p.status}</span>
                      </Badge>
                    </td>
                    <td className="font-semibold text-charcoal-700 whitespace-nowrap">${p.value.toLocaleString()}</td>
                    <td className="hidden md:table-cell">
                      {p.scopeScore > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-cream-200 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full ${
                                p.scopeScore > 30 ? 'bg-red-500' : p.scopeScore > 15 ? 'bg-amber-400' : 'bg-sage-400'
                              }`}
                              style={{ width: `${Math.min(p.scopeScore * 2, 100)}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            p.scopeScore > 30 ? 'text-red-500' : p.scopeScore > 15 ? 'text-amber-500' : 'text-sage-600'
                          }`}>{p.scopeScore}</span>
                        </div>
                      ) : (
                        <span className="text-charcoal-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="hidden sm:table-cell text-charcoal-400 text-xs whitespace-nowrap">
                      {new Date(p.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpen(menuOpen === p.id ? null : p.id)}
                          className="p-1.5 rounded-lg hover:bg-cream-200 text-charcoal-400 hover:text-charcoal-700 transition-colors sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <MoreHorizontal size={15} />
                        </button>
                        {menuOpen === p.id && (
                          <div className="absolute right-0 top-8 w-40 bg-white border border-cream-300 rounded-xl shadow-card-lg z-10 py-1 animate-slide-up">
                            {[
                              { icon: Copy, label: 'Duplicate' },
                              { icon: Send, label: 'Send' },
                              { icon: Archive, label: 'Archive' },
                            ].map(({ icon: Icon, label }) => (
                              <button
                                key={label}
                                onClick={() => setMenuOpen(null)}
                                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-charcoal-600 hover:bg-cream-100 hover:text-charcoal-800 transition-colors"
                              >
                                <Icon size={13} />
                                {label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Footer */}
      <p className="text-xs text-charcoal-400 text-center">
        Showing {filtered.length} of {proposals.length} proposals
      </p>
    </div>
  )
}
