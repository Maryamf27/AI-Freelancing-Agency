import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Receipt, Check, Sparkles } from 'lucide-react'
import Card from '../components/ui/Card'
import { Input, Textarea, Select } from '../components/ui/FormFields'
import { useAppData } from '../context/AppDataContext'

const TYPES = ['Deposit', 'Milestone', 'Final', 'One-off', 'Retainer']

function addDays(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function NewInvoice() {
  const navigate = useNavigate()
  const { proposals, addInvoice, business } = useAppData()

  const [proposalId, setProposalId] = useState('')
  const [type, setType] = useState('Deposit')
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState(addDays(14))
  const [notes, setNotes] = useState('')
  const [created, setCreated] = useState(null)

  const proposal = proposals.find((p) => p.id === proposalId)

  const suggestedAmounts = useMemo(() => {
    if (!proposal) return null
    return proposal.sections.payment
  }, [proposal])

  const handleProposalChange = (id) => {
    setProposalId(id)
    const p = proposals.find((pr) => pr.id === id)
    if (p) {
      // Pre-fill a sensible default amount based on invoice type
      const pay = p.sections.payment
      if (type === 'Deposit') setAmount(pay.deposit)
      else if (type === 'Milestone') setAmount(pay.milestone)
      else if (type === 'Final') setAmount(pay.final)
    }
  }

  const handleTypeChange = (t) => {
    setType(t)
    if (proposal) {
      const pay = proposal.sections.payment
      if (t === 'Deposit') setAmount(pay.deposit)
      else if (t === 'Milestone') setAmount(pay.milestone)
      else if (t === 'Final') setAmount(pay.final)
    }
  }

  const canSubmit = proposal && Number(amount) > 0 && dueDate

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit) return
    const invoice = addInvoice({
      proposal: proposal.title,
      proposalId: proposal.id,
      client: proposal.client,
      amount: Number(amount),
      type,
      due: dueDate,
      notes,
    })
    setCreated(invoice)
    setTimeout(() => navigate('/invoices'), 1400)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/invoices')}
          className="flex items-center gap-1.5 text-sm text-charcoal-400 hover:text-charcoal-700 transition-colors mb-3"
        >
          <ArrowLeft size={14} /> All invoices
        </button>
        <h1 className="font-display text-xl sm:text-2xl text-charcoal-800 mb-1">New Invoice</h1>
        <p className="text-sm text-charcoal-400">Generate an invoice from a proposal's payment schedule.</p>
      </div>

      {created ? (
        <Card className="text-center py-12">
          <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-sage-600" />
          </div>
          <h2 className="font-display text-2xl text-charcoal-800 mb-2">Invoice {created.id} created</h2>
          <p className="text-sm text-charcoal-500">${created.amount.toLocaleString()} · due {new Date(created.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}. Redirecting to invoices…</p>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="space-y-5">
            <div>
              <h2 className="font-semibold text-charcoal-800 mb-0.5">Invoice details</h2>
              <p className="text-xs text-charcoal-400">Pick the proposal this invoice belongs to.</p>
            </div>

            <Select
              label="Proposal"
              value={proposalId}
              onChange={(e) => handleProposalChange(e.target.value)}
              required
            >
              <option value="">Select a proposal...</option>
              {proposals.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} — {p.client}
                </option>
              ))}
            </Select>

            {proposal && (
              <div className="rounded-xl bg-cream-50 border border-cream-300 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-xs text-charcoal-400">Client</p>
                  <p className="text-sm font-medium text-charcoal-700">{proposal.client}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal-400">Proposal value</p>
                  <p className="text-sm font-medium text-charcoal-700">${proposal.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal-400">Payment terms</p>
                  <p className="text-sm font-medium text-charcoal-700">{proposal.sections.payment.terms}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Invoice Type"
                value={type}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
              <Input
                label="Amount (USD)"
                type="number"
                placeholder="e.g. 4960"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            {suggestedAmounts && (
              <div className="flex flex-wrap gap-2">
                {[
                  { label: `Deposit · $${suggestedAmounts.deposit.toLocaleString()}`, value: suggestedAmounts.deposit },
                  { label: `Milestone · $${suggestedAmounts.milestone.toLocaleString()}`, value: suggestedAmounts.milestone },
                  { label: `Final · $${suggestedAmounts.final.toLocaleString()}`, value: suggestedAmounts.final },
                ].map((s) => (
                  <button
                    type="button"
                    key={s.label}
                    onClick={() => setAmount(s.value)}
                    className="text-xs px-2.5 py-1 rounded-full bg-sage-50 border border-sage-200 text-sage-700 hover:bg-sage-100 transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            <Input
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <Textarea
              label="Notes (optional)"
              placeholder="Payment instructions, reference numbers, or a note to the client..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="rounded-xl bg-sage-50 border border-sage-200 px-4 py-3 flex gap-3">
              <Sparkles size={15} className="text-sage-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-sage-700 leading-relaxed">
                Invoices use your default payment terms ({business.defaultPaymentTerms}) and invoice numbering set in{' '}
                <button type="button" onClick={() => navigate('/settings')} className="underline font-medium hover:text-sage-900">
                  Settings
                </button>.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`btn btn-primary gap-2 ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Receipt size={15} />
                Create invoice
              </button>
            </div>
          </Card>
        </form>
      )}
    </div>
  )
}
