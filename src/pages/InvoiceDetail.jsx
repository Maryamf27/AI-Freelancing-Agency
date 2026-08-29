import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Download, Send, Clock, ExternalLink } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { useAppData } from '../context/AppDataContext'

export default function InvoiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { invoices, proposals, markInvoicePaid, profile } = useAppData()

  const invoice = invoices.find((i) => i.id === id)

  if (!invoice) {
    return (
      <div className="max-w-[700px] mx-auto animate-fade-in text-center py-20">
        <p className="text-charcoal-500 mb-4">Invoice not found.</p>
        <button onClick={() => navigate('/invoices')} className="btn btn-outline gap-2">
          <ArrowLeft size={14} /> Back to invoices
        </button>
      </div>
    )
  }

  const proposal = proposals.find((p) => p.id === invoice.proposalId || p.title === invoice.proposal)

  return (
    <div className="max-w-[800px] mx-auto animate-fade-in space-y-5">
      {/* Back + Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/invoices')}
            className="flex items-center gap-1.5 text-sm text-charcoal-400 hover:text-charcoal-700 transition-colors mb-2"
          >
            <ArrowLeft size={14} /> All invoices
          </button>
          <h1 className="font-display text-xl sm:text-2xl text-charcoal-800">{invoice.id}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            <span className="text-sm text-charcoal-500">{invoice.client}</span>
            <span className="text-charcoal-300">·</span>
            <Badge variant={invoice.status}>
              <span className="capitalize">{invoice.status}</span>
            </Badge>
            <span className="text-charcoal-300">·</span>
            <span className="text-sm font-semibold text-charcoal-700">${invoice.amount.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex gap-2.5">
          {proposal && (
            <button
              onClick={() => navigate(`/proposals/${proposal.id}`)}
              className="btn btn-outline gap-2"
            >
              <ExternalLink size={14} /> View proposal
            </button>
          )}
          {invoice.status !== 'paid' ? (
            <button onClick={() => markInvoicePaid(invoice.id)} className="btn btn-sage gap-2">
              <Check size={14} /> Mark as paid
            </button>
          ) : (
            <button className="btn btn-outline gap-2">
              <Download size={14} /> Download PDF
            </button>
          )}
        </div>
      </div>

      {/* Invoice document */}
      <div className="paper rounded-2xl overflow-hidden">
        <div className="bg-charcoal-800 px-5 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-2">Invoice · {invoice.type}</p>
              <h2 className="font-display text-2xl sm:text-3xl text-white mb-1">{invoice.id}</h2>
              <p className="text-charcoal-300 text-sm">Billed to {invoice.client}</p>
            </div>
            <div className="sm:text-right">
              <div className="w-10 h-10 rounded-lg bg-sage-500 flex items-center justify-center mb-2 sm:ml-auto">
                <span className="text-white font-bold text-sm">{profile.avatarInitials}</span>
              </div>
              <p className="text-xs text-charcoal-400">{profile.studio}</p>
              <p className="text-xs text-charcoal-500">
                Issued {new Date(invoice.issued).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8 space-y-6">
          {/* Line item */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide mb-3">Details</h3>
            <div className="rounded-xl border border-cream-300 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-cream-50 border-b border-cream-300">
                <span className="text-sm text-charcoal-600">{invoice.proposal}</span>
                <span className="text-sm font-semibold text-charcoal-800">${invoice.amount.toLocaleString()}</span>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-charcoal-800">Total due</span>
                <span className="text-lg font-display text-charcoal-800">${invoice.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-cream-50 border border-cream-300 p-3">
              <p className="text-[10px] text-charcoal-400 uppercase tracking-wide mb-1">Due date</p>
              <p className="text-sm font-medium text-charcoal-700">
                {new Date(invoice.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="rounded-xl bg-cream-50 border border-cream-300 p-3">
              <p className="text-[10px] text-charcoal-400 uppercase tracking-wide mb-1">Type</p>
              <p className="text-sm font-medium text-charcoal-700">{invoice.type}</p>
            </div>
            <div className="rounded-xl bg-cream-50 border border-cream-300 p-3">
              <p className="text-[10px] text-charcoal-400 uppercase tracking-wide mb-1">Paid on</p>
              <p className="text-sm font-medium text-charcoal-700">
                {invoice.paid ? new Date(invoice.paid).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
              </p>
            </div>
          </div>

          {invoice.notes && (
            <div>
              <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide mb-2">Notes</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status timeline */}
      <Card>
        <CardHeader title="Invoice Timeline" eyebrow="Status history" />
        <div className="relative pl-4">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-cream-300" />
          {[
            { label: 'Issued', date: invoice.issued, done: true },
            { label: 'Sent to client', date: invoice.issued, done: true },
            { label: invoice.status === 'overdue' ? 'Overdue' : 'Awaiting payment', date: invoice.status === 'paid' ? null : invoice.due, done: invoice.status !== 'paid' },
            { label: 'Paid', date: invoice.paid, done: !!invoice.paid },
          ].map((event, i) => (
            <div key={i} className="flex items-start gap-4 pb-5 last:pb-0">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 -ml-2.5 mt-0.5 z-10 ${
                event.done ? 'bg-sage-500' : 'bg-cream-300'
              }`}>
                {event.done ? <Check size={10} className="text-white" /> : <Clock size={10} className="text-charcoal-400" />}
              </div>
              <div>
                <p className={`text-sm font-medium ${event.done ? 'text-charcoal-700' : 'text-charcoal-400'}`}>{event.label}</p>
                {event.date && (
                  <p className="text-xs text-charcoal-400 mt-0.5">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reminder action */}
      {invoice.status !== 'paid' && (
        <div className="flex justify-end">
          <button className="btn btn-outline gap-2">
            <Send size={14} /> Send payment reminder
          </button>
        </div>
      )}
    </div>
  )
}
