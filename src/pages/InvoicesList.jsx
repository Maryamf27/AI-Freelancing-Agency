import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Download, Filter } from 'lucide-react'
import Card from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { useAppData } from '../context/AppDataContext'

const FILTERS = ['All', 'Paid', 'Unpaid', 'Overdue']

export default function InvoicesList() {
  const navigate = useNavigate()
  const { invoices, markInvoicePaid } = useAppData()
  const [activeFilter, setActiveFilter] = useState('All')

  const totalByStatus = {
    paid: invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0),
    unpaid: invoices.filter(i => i.status === 'unpaid').reduce((s, i) => s + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
  }

  const filtered = activeFilter === 'All'
    ? invoices
    : invoices.filter(i => i.status === activeFilter.toLowerCase())

  const handleExport = () => {
    const header = 'Invoice,Project,Client,Type,Amount,Status,Due Date\n'
    const rows = filtered
      .map((i) => [i.id, i.proposal, i.client, i.type, i.amount, i.status, i.due].join(','))
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'invoices.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5 animate-fade-in max-w-[1000px] w-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl text-charcoal-800">Invoices</h1>
          <p className="text-sm text-charcoal-400 mt-0.5">{invoices.length} invoices · ${invoices.reduce((s,i) => s + i.amount, 0).toLocaleString()} total</p>
        </div>
        <button
          onClick={() => navigate('/invoices/new')}
          className="btn btn-primary gap-2 w-full sm:w-auto"
        >
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeFilter === f ? 'bg-white text-charcoal-800 shadow-sm' : 'text-charcoal-500 hover:text-charcoal-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button onClick={handleExport} className="btn btn-outline btn-sm gap-1.5 self-start sm:self-auto">
          <Download size={12} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <Card padding={false}>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-3">
              <Filter size={20} className="text-charcoal-400" />
            </div>
            <p className="text-charcoal-500 text-sm">No invoices match your filters.</p>
          </div>
        ) : (
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
                <tr
                  key={inv.id}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/invoices/${inv.id}`)}
                >
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
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/invoices/${inv.id}`)}
                        className="btn btn-outline btn-sm"
                      >
                        View
                      </button>
                      {inv.status !== 'paid' && (
                        <button
                          onClick={() => markInvoicePaid(inv.id)}
                          className="btn btn-sage btn-sm"
                        >
                          Mark paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* Footer total */}
        <div className="px-4 py-3 border-t border-cream-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <p className="text-xs text-charcoal-400">Showing {filtered.length} of {invoices.length} invoices</p>
          <div className="text-sm font-semibold text-charcoal-700">
            Total: ${filtered.reduce((s, i) => s + i.amount, 0).toLocaleString()}
          </div>
        </div>
      </Card>
    </div>
  )
}
