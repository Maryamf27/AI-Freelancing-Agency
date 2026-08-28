import { useNavigate } from 'react-router-dom'
import { TrendingUp, FileText, Clock, AlertTriangle, ArrowUpRight, Plus, CheckCircle, Eye, Send, DollarSign } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Card, { CardHeader } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { proposals, revenueData, activityFeed } from '../data/mockData'

const kpis = [
  {
    label: 'Revenue MTD',
    value: '$14,600',
    change: '+12% vs last month',
    positive: true,
    icon: TrendingUp,
    color: 'text-sage-600',
    bg: 'bg-sage-50',
  },
  {
    label: 'Active Proposals',
    value: '5',
    change: '3 sent, 2 viewed',
    positive: true,
    icon: FileText,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  {
    label: 'Pending Sign-off',
    value: '2',
    change: 'Avg. 3 days to sign',
    positive: null,
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    label: 'Scope Alerts',
    value: '4',
    change: '+2 since yesterday',
    positive: false,
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-100',
  },
]

const activityIcons = {
  check: CheckCircle,
  alert: AlertTriangle,
  eye: Eye,
  dollar: DollarSign,
  send: Send,
}

const activityColors = {
  signed: 'text-sage-600 bg-sage-50',
  scope: 'text-amber-500 bg-amber-50',
  viewed: 'text-blue-500 bg-blue-100',
  invoice: 'text-sage-600 bg-sage-50',
  sent: 'text-charcoal-500 bg-charcoal-100',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="paper rounded-xl px-4 py-3 text-sm border border-cream-300">
        <p className="font-semibold text-charcoal-700 mb-1">{label}</p>
        <p className="text-sage-600">Received: <strong>${payload[0]?.value?.toLocaleString()}</strong></p>
        <p className="text-charcoal-400">Invoiced: ${payload[1]?.value?.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const navigate = useNavigate()
  const recentProposals = proposals.slice(0, 4)

  return (
    <div className="w-full max-w-[1200px] min-w-0 space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl text-charcoal-800">Good afternoon, James 👋</h1>
          <p className="text-sm text-charcoal-400 mt-0.5">Here's what's happening with your business today.</p>
        </div>
        <button
          onClick={() => navigate('/proposals/new')}
          className="btn-sage btn gap-2 w-full sm:w-auto"
        >
          <Plus size={15} />
          New proposal
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="relative overflow-hidden" hover>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                  <Icon size={17} className={kpi.color} />
                </div>
                <ArrowUpRight size={14} className="text-charcoal-300 hover:text-charcoal-600 cursor-pointer transition-colors" />
              </div>
              <p className="text-2xl font-display text-charcoal-800 mb-1">{kpi.value}</p>
              <p className="text-xs text-charcoal-400">{kpi.label}</p>
              <p className={`text-xs mt-1 font-medium ${
                kpi.positive === true ? 'text-sage-600' : kpi.positive === false ? 'text-red-500' : 'text-charcoal-400'
              }`}>
                {kpi.change}
              </p>
            </Card>
          )
        })}
      </div>

      {/* Charts + Activity */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card padding={false}>
            <CardHeader
              title="Revenue Overview"
              subtitle="Invoiced vs. collected (last 6 months)"
              eyebrow="Financials"
              action={
                <select className="text-xs bg-cream-100 border border-cream-300 rounded-lg px-2 py-1 text-charcoal-600">
                  <option>Last 6 months</option>
                  <option>Last 12 months</option>
                </select>
              }
            />
            <div className="px-3 pb-4 sm:px-5 sm:pb-5">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData} barSize={14} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2D9C8" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7A7A7A' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#7A7A7A' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(74,124,89,0.05)' }} />
                  <Bar dataKey="revenue" fill="#4A7C59" radius={[4, 4, 0, 0]} name="Revenue" />
                  <Bar dataKey="invoiced" fill="#C6E0CA" radius={[4, 4, 0, 0]} name="Invoiced" />
                </BarChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="flex items-center gap-5 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-charcoal-500">
                  <span className="w-3 h-2 rounded-sm bg-sage-600 inline-block" />
                  Collected
                </div>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-500">
                  <span className="w-3 h-2 rounded-sm bg-sage-200 inline-block" />
                  Invoiced
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card padding={false}>
          <CardHeader title="Activity" subtitle="Recent events" eyebrow="Feed" />
          <div className="px-5 pb-5 space-y-3">
            {activityFeed.map((item) => {
              const Icon = activityIcons[item.icon]
              const colorClass = activityColors[item.type]
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${colorClass}`}>
                    <Icon size={13} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-charcoal-700 leading-snug">{item.message}</p>
                    <p className="text-[10px] text-charcoal-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Recent Proposals */}
      <Card padding={false}>
        <div className="px-5 pt-5 flex items-center justify-between">
          <CardHeader title="Recent Proposals" eyebrow="Proposals" />
          <button
            onClick={() => navigate('/proposals')}
            className="text-xs text-sage-600 font-medium hover:text-sage-800 transition-colors -mt-4"
          >
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-base w-full min-w-[620px] table-fixed">
            <thead>
              <tr>
                <th>Project</th>
                <th className="hidden lg:table-cell">Client</th>
                <th>Status</th>
                <th>Value</th>
                <th className="hidden md:table-cell">Scope Score</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentProposals.map((p) => (
                <tr
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/proposals/${p.id}`)}
                >
                  <td className="align-top">
                    <p className="font-medium text-charcoal-800 break-words">{p.title}</p>
                    <p className="text-xs text-charcoal-400 mt-0.5">{p.created}</p>
                  </td>
                  <td className="hidden lg:table-cell text-charcoal-600 break-words">{p.client}</td>
                  <td>
                    <Badge variant={p.status}>
                      <span className="capitalize">{p.status}</span>
                    </Badge>
                  </td>
                  <td className="font-medium text-charcoal-700 whitespace-nowrap">${p.value.toLocaleString()}</td>
                  <td>
                    {p.scopeScore > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-cream-200 rounded-full h-1.5 w-16">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              p.scopeScore > 30 ? 'bg-red-500' : p.scopeScore > 15 ? 'bg-amber-400' : 'bg-sage-500'
                            }`}
                            style={{ width: `${Math.min(p.scopeScore * 2, 100)}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          p.scopeScore > 30 ? 'text-red-500' : p.scopeScore > 15 ? 'text-amber-500' : 'text-sage-600'
                        }`}>
                          {p.scopeScore}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-charcoal-300">—</span>
                    )}
                  </td>
                  <td>
                    <button className="text-xs text-charcoal-400 hover:text-sage-600 transition-colors font-medium">
                      Open →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
