import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Check, MessageSquare, Download, Shield, Sparkles } from 'lucide-react'
import { proposals } from '../data/mockData'

export default function ClientPortal() {
  const { token } = useParams()
  const proposal = proposals.find((p) => p.id === token) || proposals[0]
  const [signed, setSigned] = useState(proposal.status === 'signed')
  const [signerName, setSignerName] = useState('')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'SC',
      text: 'This looks great! One question on the timeline — is week 3 flexible if we delay the discovery session?',
      time: '2 hours ago',
    },
  ])
  const [signing, setSigning] = useState(false)

  const handleSign = () => {
    if (!signerName) return
    setSigning(true)
    setTimeout(() => {
      setSigned(true)
      setSigning(false)
    }, 1500)
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setComments([...comments, {
      id: Date.now(),
      author: 'Client',
      avatar: 'CL',
      text: comment,
      time: 'Just now',
    }])
    setComment('')
  }

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Client portal header */}
      <header className="bg-white border-b border-cream-300 py-4 px-4 sm:px-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-sage-600 flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="font-display text-base text-charcoal-700">PropFlow</span>
          <span className="text-charcoal-300 mx-2">·</span>
          <span className="text-sm text-charcoal-500">Client Proposal</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-charcoal-400">
          <Shield size={12} className="text-sage-500" />
          Secure & confidential
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10 space-y-6">
        {/* Signed banner */}
        {signed && (
          <div className="flex items-center gap-3 px-5 py-4 bg-sage-50 border border-sage-200 rounded-2xl animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-sage-500 flex items-center justify-center flex-shrink-0">
              <Check size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-sage-800">Proposal Signed</p>
              <p className="text-xs text-sage-600">Thank you! The studio has been notified and will be in touch shortly.</p>
            </div>
          </div>
        )}

        {/* Proposal document */}
        <div className="paper rounded-2xl overflow-hidden">
          {/* Header band */}
          <div className="bg-charcoal-800 px-5 py-7 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-2">Project Proposal</p>
                <h1 className="font-display text-2xl sm:text-3xl text-white mb-2">{proposal.title}</h1>
                <p className="text-charcoal-300 text-sm">Prepared for <strong className="text-white">{proposal.client}</strong></p>
              </div>
              <div className="text-left sm:text-right">
                <div className="w-10 h-10 rounded-xl bg-sage-500 flex items-center justify-center mb-2 ml-auto">
                  <span className="text-white font-bold text-sm">JK</span>
                </div>
                <p className="text-xs text-charcoal-400">James Keller Studio</p>
                <p className="text-xs text-charcoal-500">
                  {new Date(proposal.created).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Document body */}
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            {/* Overview */}
            <section className="mb-8">
              <h2 className="font-display text-xl text-charcoal-800 mb-3 pb-2 border-b border-cream-300">Project Overview</h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">{proposal.sections.overview}</p>
            </section>

            {/* Scope */}
            <section className="mb-8">
              <h2 className="font-display text-xl text-charcoal-800 mb-3 pb-2 border-b border-cream-300">What's Included</h2>
              <ul className="space-y-2.5">
                {proposal.sections.scope.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={10} className="text-sage-600" />
                    </div>
                    <span className="text-sm text-charcoal-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Timeline */}
            <section className="mb-8">
              <h2 className="font-display text-xl text-charcoal-800 mb-3 pb-2 border-b border-cream-300">Timeline</h2>
              <div className="space-y-0">
                {proposal.sections.timeline.map((t, i) => (
                  <div key={i} className="flex items-center gap-6 py-3.5 border-b border-cream-200 last:border-0">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-xs font-semibold text-sage-700 bg-sage-100 px-2.5 py-1 rounded-full">
                        Week {t.weeks}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-charcoal-300" />
                      <span className="text-sm text-charcoal-700">{t.phase}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Investment */}
            <section className="mb-8">
              <h2 className="font-display text-xl text-charcoal-800 mb-3 pb-2 border-b border-cream-300">Investment</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {[
                  { label: '40% Deposit', value: proposal.sections.payment.deposit, note: 'Due upon signing' },
                  { label: '40% Milestone', value: proposal.sections.payment.milestone, note: 'Due at project midpoint' },
                  { label: '20% Final', value: proposal.sections.payment.final, note: 'Due at final delivery' },
                ].map((r) => (
                  <div key={r.label} className="rounded-xl border border-cream-300 bg-cream-50 p-4 text-center">
                    <p className="text-[10px] text-charcoal-400 uppercase tracking-wide mb-2">{r.label}</p>
                    <p className="text-2xl font-display text-charcoal-800">${r.value.toLocaleString()}</p>
                    <p className="text-[10px] text-charcoal-400 mt-1.5">{r.note}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between py-3 px-4 bg-charcoal-800 rounded-xl">
                <span className="text-sm text-charcoal-300">Total project value</span>
                <span className="text-xl font-display text-white">${proposal.value.toLocaleString()}</span>
              </div>
              <p className="text-xs text-charcoal-400 mt-2">Payment terms: {proposal.sections.payment.terms} from invoice date.</p>
            </section>

            {/* Sign-off */}
            {!signed ? (
              <section className="bg-cream-50 rounded-2xl border border-cream-300 p-6">
                <h2 className="font-display text-xl text-charcoal-800 mb-1">Ready to proceed?</h2>
                <p className="text-sm text-charcoal-500 mb-5">Type your full name below to accept the proposal and begin the project.</p>
                <div className="space-y-4">
                  <div>
                    <label className="field-label">Full name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Chen"
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      className="field-input max-w-xs"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-charcoal-400">By signing you agree to the scope, timeline and payment terms outlined above.</p>
                  </div>
                  <button
                    onClick={handleSign}
                    disabled={!signerName || signing}
                    className={`btn btn-sage btn-lg gap-2 ${!signerName ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {signing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing...
                      </>
                    ) : (
                      <>
                        <Check size={17} />
                        Accept & sign proposal
                      </>
                    )}
                  </button>
                </div>
              </section>
            ) : (
              <div className="rounded-2xl bg-sage-50 border-2 border-sage-300 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-sage-500 flex items-center justify-center mx-auto mb-3">
                  <Check size={22} className="text-white" />
                </div>
                <h2 className="font-display text-2xl text-sage-800 mb-1">You're all set!</h2>
                <p className="text-sm text-sage-600">The studio has been notified. Expect an onboarding email within 24 hours.</p>
              </div>
            )}
          </div>
        </div>

        {/* Download */}
        <div className="flex justify-center">
          <button className="btn btn-outline gap-2 text-sm">
            <Download size={14} />
            Download PDF copy
          </button>
        </div>

        {/* Comments */}
        <div className="paper rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare size={16} className="text-charcoal-500" />
            <h2 className="font-semibold text-charcoal-800">Questions & Comments</h2>
            <span className="text-xs text-charcoal-400">({comments.length})</span>
          </div>

          <div className="space-y-4 mb-5">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-charcoal-200 flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-charcoal-600">
                  {c.avatar}
                </div>
                <div className="flex-1 bg-cream-50 rounded-xl px-4 py-3 border border-cream-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-charcoal-700">{c.author}</span>
                    <span className="text-[10px] text-charcoal-400">{c.time}</span>
                  </div>
                  <p className="text-sm text-charcoal-600">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Leave a question or comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="field-input flex-1"
            />
            <button type="submit" className="btn btn-primary btn-sm flex-shrink-0">Send</button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-charcoal-400 pb-6">
          Powered by <span className="text-sage-600 font-medium">PropFlow</span> · Secure client portal
        </p>
      </div>
    </div>
  )
}
