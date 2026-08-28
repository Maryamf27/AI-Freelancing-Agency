import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, ExternalLink, AlertTriangle, Check, MessageSquare, ChevronDown } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import Card, { CardHeader } from '../components/ui/Card'
import { proposals, chatLogs } from '../data/mockData'

const changeTypeLabels = {
  'new-feature': { label: 'New Feature', color: 'bg-blue-100 text-blue-500' },
  'design-change': { label: 'Design Change', color: 'bg-amber-50 text-amber-500' },
}

export default function ProposalDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const proposal = proposals.find((p) => p.id === id) || proposals[1]
  const logs = chatLogs.filter((c) => c.proposalId === proposal.id)
  const flaggedCount = logs.filter((c) => c.flagged).length

  return (
    <div className="max-w-[1100px] animate-fade-in space-y-5">
      {/* Back + Header */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
        <div>
          <button
            onClick={() => navigate('/proposals')}
            className="flex items-center gap-1.5 text-sm text-charcoal-400 hover:text-charcoal-700 transition-colors mb-2"
          >
            <ArrowLeft size={14} /> All proposals
          </button>
          <h1 className="font-display text-2xl text-charcoal-800">{proposal.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="text-sm text-charcoal-500">{proposal.client}</span>
            <span className="text-charcoal-300">·</span>
            <Badge variant={proposal.status}>
              <span className="capitalize">{proposal.status}</span>
            </Badge>
            <span className="text-charcoal-300">·</span>
            <span className="text-sm font-semibold text-charcoal-700">${proposal.value.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-2.5">
          <button
            onClick={() => navigate(`/client/${proposal.id}`)}
            className="btn btn-outline gap-2 justify-center"
          >
            <ExternalLink size={14} /> Client view
          </button>
          <button className="btn btn-sage gap-2 justify-center">
            <Send size={14} /> Send reminder
          </button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        {/* Left: Proposal preview */}
        <div className="space-y-5">
          {/* Proposal document */}
          <div className="paper rounded-2xl overflow-hidden">
            <div className="bg-charcoal-800 px-8 py-8">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-charcoal-400 mb-2">Proposal · {proposal.created}</p>
              <h2 className="font-display text-2xl text-white mb-1">{proposal.title}</h2>
              <p className="text-charcoal-300 text-sm">Prepared for {proposal.client}</p>
            </div>
            <div className="px-8 py-8 proposal-prose">
              <h2>Project Overview</h2>
              <p>{proposal.sections.overview}</p>

              <h2>Scope of Work</h2>
              <ul>
                {proposal.sections.scope.map((s, i) => <li key={i}>{s}</li>)}
              </ul>

              <h2>Project Timeline</h2>
              <div className="not-prose mb-6">
                {proposal.sections.timeline.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 py-2.5 border-b border-cream-200 last:border-0">
                    <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-sage-700">{i + 1}</span>
                    </div>
                    <span className="flex-1 text-sm text-charcoal-700">{t.phase}</span>
                    <span className="text-xs font-medium text-charcoal-400 bg-cream-100 px-2 py-0.5 rounded">Week {t.weeks}</span>
                  </div>
                ))}
              </div>

              <h2>Investment</h2>
              <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {[
                  { label: '40% Deposit', value: proposal.sections.payment.deposit, note: 'Upon signing' },
                  { label: '40% Milestone', value: proposal.sections.payment.milestone, note: 'At midpoint' },
                  { label: '20% Final', value: proposal.sections.payment.final, note: 'At delivery' },
                ].map((r) => (
                  <div key={r.label} className="rounded-xl bg-cream-50 border border-cream-300 p-4 text-center">
                    <p className="text-[10px] text-charcoal-400 uppercase tracking-wide mb-1">{r.label}</p>
                    <p className="text-xl font-display text-charcoal-800">${r.value.toLocaleString()}</p>
                    <p className="text-[10px] text-charcoal-400 mt-1">{r.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-charcoal-500">Total: <strong className="text-charcoal-800">${proposal.value.toLocaleString()}</strong> · Payment terms: {proposal.sections.payment.terms}</p>
            </div>
          </div>

          {/* Timeline / status */}
          <Card>
            <CardHeader title="Proposal Timeline" eyebrow="Status history" />
            <div className="relative pl-4">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-cream-300" />
              {[
                { label: 'Created', date: proposal.created, done: true },
                { label: 'Sent to client', date: proposal.sent, done: !!proposal.sent },
                { label: 'Viewed by client', date: proposal.sent ? '2024-07-14' : null, done: proposal.status !== 'draft' && proposal.status !== 'sent' },
                { label: 'Signed', date: proposal.signed, done: !!proposal.signed },
              ].map((event, i) => (
                <div key={i} className="flex items-start gap-4 pb-5 last:pb-0">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 -ml-2.5 mt-0.5 z-10 ${
                    event.done ? 'bg-sage-500' : 'bg-cream-300'
                  }`}>
                    {event.done && <Check size={10} className="text-white" />}
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
        </div>

        {/* Right: Scope Creep Tracker */}
        <div className="space-y-4">
          {/* Score card */}
          <Card className={`border-2 ${proposal.scopeScore > 30 ? 'border-red-400' : proposal.scopeScore > 15 ? 'border-amber-300' : 'border-sage-300'}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="section-eyebrow mb-0.5">Scope Creep Score</p>
                <p className="text-3xl font-display text-charcoal-800">{proposal.scopeScore}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                proposal.scopeScore > 30 ? 'bg-red-100' : proposal.scopeScore > 15 ? 'bg-amber-50' : 'bg-sage-50'
              }`}>
                <AlertTriangle size={22} className={
                  proposal.scopeScore > 30 ? 'text-red-500' : proposal.scopeScore > 15 ? 'text-amber-500' : 'text-sage-600'
                } />
              </div>
            </div>
            {/* Score bar */}
            <div className="w-full bg-cream-200 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  proposal.scopeScore > 30 ? 'bg-red-500' : proposal.scopeScore > 15 ? 'bg-amber-400' : 'bg-sage-500'
                }`}
                style={{ width: `${Math.min(proposal.scopeScore * 2, 100)}%` }}
              />
            </div>
            <p className="text-xs text-charcoal-400">{flaggedCount} flagged messages · {proposal.scopeScore > 30 ? 'High risk — send a change order' : proposal.scopeScore > 15 ? 'Moderate — monitor closely' : 'Low risk'}</p>
            {proposal.scopeScore > 15 && (
              <button className="mt-3 w-full py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700 hover:bg-amber-100 transition-colors">
                Generate change order →
              </button>
            )}
          </Card>

          {/* Chat log */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-cream-200">
              <div className="flex items-center gap-2">
                <MessageSquare size={15} className="text-charcoal-500" />
                <span className="text-sm font-semibold text-charcoal-700">Chat Log</span>
              </div>
              <Badge variant="scope">{flaggedCount} flagged</Badge>
            </div>

            {logs.length === 0 ? (
              <div className="py-10 text-center">
                <MessageSquare size={20} className="text-charcoal-300 mx-auto mb-2" />
                <p className="text-xs text-charcoal-400">No chat messages linked yet.</p>
                <button className="mt-2 text-xs text-sage-600 font-medium hover:text-sage-800 transition-colors">Connect chat →</button>
              </div>
            ) : (
              <div className="space-y-0">
                {logs.map((msg) => (
                  <div
                    key={msg.id}
                    className={`px-4 py-3.5 border-b border-cream-100 last:border-0 ${
                      msg.flagged ? 'chat-flagged' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Avatar */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold ${
                        msg.sender === 'Client' ? 'bg-blue-100 text-blue-600' : 'bg-charcoal-700 text-white'
                      }`}>
                        {msg.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-charcoal-700">{msg.sender}</span>
                          <span className="text-[10px] text-charcoal-400">{msg.time.split(' ')[1]}</span>
                          {msg.flagged && (
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${changeTypeLabels[msg.changeType]?.color}`}>
                              {changeTypeLabels[msg.changeType]?.label}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-charcoal-600 leading-relaxed">{msg.message}</p>
                        {msg.flagged && msg.flagReason && (
                          <div className="mt-2 flex items-start gap-1.5">
                            <AlertTriangle size={10} className="text-amber-500 flex-shrink-0 mt-0.5" />
                            <p className="text-[10px] text-amber-700 font-medium">{msg.flagReason}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Connect chat CTA if no flagged */}
            {logs.length > 0 && (
              <div className="px-4 py-3 bg-cream-50 border-t border-cream-200">
                <button className="text-xs text-charcoal-400 hover:text-sage-600 font-medium transition-colors flex items-center gap-1.5">
                  <MessageSquare size={11} />
                  Connect Slack / email to auto-scan
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
