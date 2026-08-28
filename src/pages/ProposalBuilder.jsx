import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ArrowLeft, Check, Edit3, Send, Eye } from 'lucide-react'
import StepIndicator from '../components/ui/StepIndicator'
import { Input, Textarea, Select } from '../components/ui/FormFields'
import Card from '../components/ui/Card'

const STEPS = ['Project Brief', 'Review Draft', 'Preview & Send']

const projectTypes = [
  'Brand Identity',
  'Website Design & Development',
  'Mobile App Design',
  'E-commerce Store',
  'Content Strategy & SEO',
  'Social Media',
  'Photography / Video',
  'Consulting',
  'Other',
]

const generateDraft = (brief) => ({
  overview: `We will deliver ${brief.projectType?.toLowerCase() || 'a comprehensive project'} for ${brief.clientName || 'your brand'} that achieves your business objectives and sets a strong foundation for growth. Our approach combines strategic thinking with meticulous craft to ensure every deliverable is purposeful, polished, and built to last.`,
  scope: [
    `Initial discovery workshop and stakeholder interviews`,
    `${brief.projectType || 'Project'} strategy and concept development`,
    `Design — 2–3 concepts with 2 rounds of revisions`,
    `Final deliverables and asset handoff`,
    `30-day post-launch support`,
  ],
  timeline: [
    { phase: 'Discovery & Strategy', weeks: '1–2' },
    { phase: 'Design & Iteration', weeks: '3–6' },
    { phase: 'Refinement & QA', weeks: '7–8' },
    { phase: 'Delivery & Handoff', weeks: '9' },
  ],
  payment: {
    deposit: Math.round(Number(brief.budget || 0) * 0.4),
    milestone: Math.round(Number(brief.budget || 0) * 0.4),
    final: Math.round(Number(brief.budget || 0) * 0.2),
    terms: 'Net 14',
  },
})

export default function ProposalBuilder() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [brief, setBrief] = useState({
    clientName: '',
    clientEmail: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
  })
  const [draft, setDraft] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [sent, setSent] = useState(false)

  const handleGenerateDraft = () => {
    setGenerating(true)
    setTimeout(() => {
      setDraft(generateDraft(brief))
      setGenerating(false)
      setStep(1)
    }, 1800)
  }

  const handleSend = () => {
    setSent(true)
    setTimeout(() => navigate('/proposals'), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl text-charcoal-800 mb-1">New Proposal</h1>
        <p className="text-sm text-charcoal-400">Fill in the brief and we'll generate a professional proposal draft.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center py-2">
        <StepIndicator steps={STEPS} currentStep={step} />
      </div>

      
      {step === 0 && (
        <Card className="space-y-5">
          <div>
            <h2 className="font-semibold text-charcoal-800 mb-0.5">Client & Project Details</h2>
            <p className="text-xs text-charcoal-400">The more context you give, the better the draft.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Client Name"
              placeholder="e.g. Meridian Coffee Co."
              value={brief.clientName}
              onChange={(e) => setBrief({ ...brief, clientName: e.target.value })}
            />
            <Input
              label="Client Email"
              type="email"
              placeholder="hello@client.com"
              value={brief.clientEmail}
              onChange={(e) => setBrief({ ...brief, clientEmail: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Project Type"
              value={brief.projectType}
              onChange={(e) => setBrief({ ...brief, projectType: e.target.value })}
            >
              <option value="">Select type...</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
            <Input
              label="Budget (USD)"
              type="number"
              placeholder="e.g. 12000"
              value={brief.budget}
              onChange={(e) => setBrief({ ...brief, budget: e.target.value })}
            />
          </div>

          <Input
            label="Desired Timeline"
            placeholder="e.g. 8–10 weeks, by end of October"
            value={brief.timeline}
            onChange={(e) => setBrief({ ...brief, timeline: e.target.value })}
          />

          <Textarea
            label="Project Description"
            placeholder="Describe the project, goals, and any important context. The more detail the better..."
            rows={5}
            value={brief.description}
            onChange={(e) => setBrief({ ...brief, description: e.target.value })}
          />

          {/* Tip box */}
          <div className="rounded-xl bg-sage-50 border border-sage-200 px-4 py-3 flex gap-3">
            <Sparkles size={15} className="text-sage-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-sage-700 leading-relaxed">
              <strong>Tip:</strong> Include your client's goals, target audience, and any technical requirements. PropFlow uses this to tailor the scope, timeline, and payment structure.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleGenerateDraft}
              disabled={!brief.clientName || !brief.projectType || generating}
              className={`btn btn-primary gap-2 ${generating ? 'opacity-70' : ''}`}
            >
              {generating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating draft...
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  Generate proposal draft
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </Card>
      )}

      {/* ── Step 1: Review Draft  */}
      {step === 1 && draft && (
        <div className="space-y-5">
          {/* AI generation notice */}
          <div className="flex items-center gap-3 px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-sage-500 flex items-center justify-center flex-shrink-0">
              <Check size={12} className="text-white" />
            </div>
            <p className="text-sm text-sage-800">
              Draft generated for <strong>{brief.clientName}</strong> · {brief.projectType} · ${Number(brief.budget).toLocaleString()} budget
            </p>
            <button
              onClick={() => setStep(0)}
              className="ml-auto text-xs text-sage-600 hover:text-sage-800 font-medium transition-colors"
            >
              Edit brief
            </button>
          </div>

          {/* Overview */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide">Overview</h3>
              <button className="btn-ghost btn btn-sm gap-1">
                <Edit3 size={12} /> Edit
              </button>
            </div>
            <textarea
              className="field-input resize-none text-charcoal-600 leading-relaxed"
              rows={4}
              defaultValue={draft.overview}
            />
          </Card>

          {/* Scope */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide">Scope of Work</h3>
              <button className="btn-ghost btn btn-sm gap-1">
                <Edit3 size={12} /> Edit
              </button>
            </div>
            <ul className="space-y-2">
              {draft.scope.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={10} className="text-sage-600" />
                  </div>
                  <input
                    type="text"
                    className="flex-1 text-sm text-charcoal-700 bg-transparent border-b border-transparent hover:border-cream-300 focus:border-sage-400 focus:outline-none py-0.5 transition-colors"
                    defaultValue={item}
                  />
                </li>
              ))}
            </ul>
            <button className="mt-3 text-xs text-sage-600 hover:text-sage-800 font-medium transition-colors">
              + Add deliverable
            </button>
          </Card>

          {/* Timeline */}
          <Card>
            <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide mb-3">Timeline</h3>
            <div className="space-y-2">
              {draft.timeline.map((t, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-cream-200 last:border-0">
                  <div className="w-5 h-5 rounded-full bg-charcoal-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-semibold text-charcoal-500">{i + 1}</span>
                  </div>
                  <span className="flex-1 text-sm text-charcoal-700">{t.phase}</span>
                  <span className="text-xs font-medium text-charcoal-400 bg-cream-100 px-2 py-0.5 rounded">Week {t.weeks}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Payment */}
          <Card>
            <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide mb-3">Investment & Payment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Deposit (40%)', value: draft.payment.deposit },
                { label: 'Milestone (40%)', value: draft.payment.milestone },
                { label: 'Final (20%)', value: draft.payment.final },
              ].map((row) => (
                <div key={row.label} className="bg-cream-50 rounded-xl p-3 border border-cream-300">
                  <p className="text-[10px] text-charcoal-400 uppercase tracking-wide mb-1">{row.label}</p>
                  <p className="text-lg font-display text-charcoal-800">${row.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-charcoal-400 mt-3">Payment terms: {draft.payment.terms} · Total: <strong className="text-charcoal-700">${Number(brief.budget).toLocaleString()}</strong></p>
          </Card>

          <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button onClick={() => setStep(0)} className="btn btn-outline gap-2">
              <ArrowLeft size={15} /> Back
            </button>
            <div className="flex gap-3 sm:justify-end">
              <button onClick={() => setStep(2)} className="btn btn-ghost gap-2">
                <Eye size={15} /> Preview
              </button>
              <button onClick={() => setStep(2)} className="btn btn-primary gap-2">
                Continue
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Preview & Send  */}
      {step === 2 && draft && (
        <div className="space-y-5">
          {sent ? (
            <Card className="text-center py-12">
              <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-sage-600" />
              </div>
              <h2 className="font-display text-2xl text-charcoal-800 mb-2">Proposal Sent!</h2>
              <p className="text-sm text-charcoal-500">Your proposal has been sent to {brief.clientEmail}. Redirecting...</p>
            </Card>
          ) : (
            <>
              {/* Proposal preview document */}
              <div className="paper rounded-2xl overflow-hidden">
                {/* Document header */}
                <div className="bg-charcoal-800 px-8 py-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-2">Proposal</p>
                      <h2 className="font-display text-3xl text-white mb-1">{brief.projectType}</h2>
                      <p className="text-charcoal-300 text-sm">Prepared for {brief.clientName}</p>
                    </div>
                    <div className="text-right">
                      <div className="w-10 h-10 rounded-lg bg-sage-500 flex items-center justify-center mb-2 ml-auto">
                        <span className="text-white font-bold text-sm">P</span>
                      </div>
                      <p className="text-xs text-charcoal-400">PropFlow Studio</p>
                      <p className="text-xs text-charcoal-500">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                {/* Document body */}
                <div className="px-8 py-8 proposal-prose">
                  <h2>Project Overview</h2>
                  <p>{draft.overview}</p>

                  <h2>Scope of Work</h2>
                  <ul>
                    {draft.scope.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>

                  <h2>Timeline</h2>
                  <div className="not-prose mb-4">
                    {draft.timeline.map((t, i) => (
                      <div key={i} className="flex items-center gap-4 py-2.5 border-b border-cream-200 last:border-0">
                        <span className="text-xs font-medium text-sage-600 w-20">Week {t.weeks}</span>
                        <span className="text-sm text-charcoal-700">{t.phase}</span>
                      </div>
                    ))}
                  </div>

                  <h2>Investment</h2>
                  <p>Total project investment: <strong>${Number(brief.budget).toLocaleString()}</strong>, structured in three milestone payments:</p>
                  <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {[
                      { label: '40% Deposit', value: draft.payment.deposit, note: 'Due upon signing' },
                      { label: '40% Milestone', value: draft.payment.milestone, note: 'Due at midpoint' },
                      { label: '20% Final', value: draft.payment.final, note: 'Due at delivery' },
                    ].map((r) => (
                      <div key={r.label} className="rounded-xl bg-cream-50 border border-cream-300 p-4 text-center">
                        <p className="text-xs text-charcoal-400 mb-1">{r.label}</p>
                        <p className="text-xl font-display text-charcoal-800">${r.value.toLocaleString()}</p>
                        <p className="text-[10px] text-charcoal-400 mt-1">{r.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Send config */}
              <Card>
                <h3 className="text-sm font-semibold text-charcoal-700 mb-4">Send to client</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Recipient Email" value={brief.clientEmail} readOnly className="col-span-2 md:col-span-1" />
                  <Input label="Your name / studio" defaultValue="James Keller Studio" className="col-span-2 md:col-span-1" />
                  <Textarea
                    label="Personal note (optional)"
                    placeholder="Hi Sarah, it was great speaking with you! Here's the proposal we discussed..."
                    rows={3}
                    className="col-span-2"
                  />
                </div>
              </Card>

              <div className="flex items-center justify-between">
                <button onClick={() => setStep(1)} className="btn btn-outline gap-2">
                  <ArrowLeft size={15} /> Back
                </button>
                <div className="flex gap-3">
                  <button className="btn btn-outline gap-2">
                    Save as draft
                  </button>
                  <button onClick={handleSend} className="btn btn-sage gap-2">
                    <Send size={15} />
                    Send proposal
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
