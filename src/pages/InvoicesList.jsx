import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Download, Filter } from 'lucide-react'
import Card from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { invoices } from '../data/mockData'

const FILTERS = ['All', 'Paid', 'Unpaid', 'Overdue']

const totalByStatus = {
  paid: invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0),
  unpaid: invoices.filter(i => i.status === 'unpaid').reduce((s, i) => s + i.amount, 0),
  overdue: invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
}

export default function InvoicesList() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? invoices
    : invoices.filter(i => i.status === activeFilter.toLowerCase())

  return (
    <div className="space-y-5 animate-fade-in max-w-[1000px] w-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl text-charcoal-800">Invoices</h1>
          <p className="text-sm text-charcoal-400 mt-0.5">{invoices.length} invoices · ${invoices.reduce((s,i) => s + i.amount, 0).toLocaleString()} total</p>
        </div>
        <button className="btn btn-primary gap-2 w-full sm:w-auto">
          <Plus size={15} />
          New invoice
        </button>
      </div>

      {/* Summary KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Collected', value: totalByStatus.paid, color: 'text-sage-700', bg: 'bg-sage-50', border: 'border-sage-200' },
          { label: 'Outstanding', value: totalByStatus.unpaid, color: 'text-charcoal-700', bg: 'bg-cream-50', border: 'border-cream-300' },
          { label: 'Overdue', value: totalByStatus.overdue, color: 'text-red-500', bg: 'bg-red-100', border: 'border-red-200' },
        ].map((kpi) => (
          <div key={kpi.label} className={`rounded-xl p-4 border ${kpi.bg} ${kpi.border}`}>
            <p className="text-xs text-charcoal-400 uppercase tracking-wide mb-1">{kpi.label}</p>
            <p className={`text-2xl font-display ${kpi.color}`}>${kpi.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 bg-cream-200 p-1 rounded-xl overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === f ? 'bg-white text-charcoal-800 shadow-sm' : 'text-charcoal-500 hover:text-charcoal-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="btn btn-outline btn-sm gap-1.5 self-start sm:self-auto">
          <Download size={12} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Project</th>
                <th className="hidden sm:table-cell">Client</th>
                <th className="hidden md:table-cell">Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="hidden sm:table-cell">Due Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="cursor-pointer group">
                  <td>
                    <span className="font-mono text-xs font-medium text-charcoal-700">{inv.id}</span>
                  </td>
                  <td>
                    <p className="text-sm text-charcoal-700 leading-tight max-w-[160px] truncate">{inv.proposal}</p>
                  </td>
                  <td className="hidden sm:table-cell text-charcoal-500 text-sm">{inv.client}</td>
                  <td className="hidden md:table-cell">
                    <span className="text-xs font-medium text-charcoal-500 bg-cream-100 border border-cream-300 px-2 py-0.5 rounded-full">
                      {inv.type}
                    </span>
                  </td>
                  <td className="font-semibold text-charcoal-800">${inv.amount.toLocaleString()}</td>
                  <td className="hidden sm:table-cell">
                    <Badge variant={inv.status}>
                      <span className="capitalize">{inv.status}</span>
                    </Badge>
                  </td>
                  <td>
                    <div>
                      <p className={`text-xs font-medium ${inv.status === 'overdue' ? 'text-red-500' : 'text-charcoal-600'}`}>
                        {new Date(inv.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      {inv.paid && (
                        <p className="text-[10px] text-sage-600">
                          Paid {new Date(inv.paid).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="btn btn-outline btn-sm">View</button>
                      {inv.status !== 'paid' && (
                        <button className="btn btn-sage btn-sm">Mark paid</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer total */}
        <div className="px-4 py-3 border-t border-cream-200 flex items-center justify-between">
          <p className="text-xs text-charcoal-400">Showing {filtered.length} of {invoices.length} invoices</p>
          <div className="text-sm font-semibold text-charcoal-700">
            Total: ${filtered.reduce((s, i) => s + i.amount, 0).toLocaleString()}
          </div>
        </div>
      </Card>
    </div>
  )
}
