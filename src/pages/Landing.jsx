import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle, FileText, MessageSquare, Zap, ChevronRight } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Brief to Proposal in Minutes',
    desc: 'Paste your project brief and get a fully-structured proposal — scope, timeline, and pricing — ready to send.',
  },
  {
    icon: MessageSquare,
    title: 'Scope Creep Detection',
    desc: 'Connect your client chat and we\'ll flag new requests, design changes, and out-of-scope asks automatically.',
  },
  {
    icon: Zap,
    title: 'One-Click Invoicing',
    desc: 'Turn any signed proposal into a professional invoice with milestone splits pre-filled. No re-entering data.',
  },
]

const testimonials = [
  { name: 'Sasha Moran', role: 'Brand Designer', quote: 'I used to lose 3 hours a week writing proposals. Now it\'s 15 minutes.' },
  { name: 'Tom Reyes', role: 'Full-stack Developer', quote: 'The scope creep alerts alone have saved me thousands. Clients can\'t dispute what\'s flagged.' },
  { name: 'Nina Okafor', role: 'Creative Director', quote: 'Our agency sends 20+ proposals a month. PropFlow cut our admin time by 60%.' },
]

const pricing = [
  {
    name: 'Solo',
    price: 29,
    desc: 'For freelancers getting serious about their business.',
    features: ['10 proposals / month', 'Scope creep alerts', 'Client portal', 'PDF export'],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Studio',
    price: 79,
    desc: 'For agencies with multiple clients and team members.',
    features: ['Unlimited proposals', 'Everything in Solo', 'Team collaboration', 'White-label portal', 'Priority support'],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Agency',
    price: 199,
    desc: 'For larger agencies needing advanced controls.',
    features: ['Everything in Studio', 'Custom domain', 'API access', 'Dedicated success manager'],
    cta: 'Talk to sales',
    highlight: false,
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream-100 font-sans">
      {/* Nav */}
      <header className="border-b border-cream-300 bg-cream-50/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sage-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="font-display text-xl text-charcoal-800">PropFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-charcoal-500">
            <a href="#features" className="hover:text-charcoal-800 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-charcoal-800 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-charcoal-800 transition-colors">Stories</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-charcoal-600 hover:text-charcoal-900 transition-colors font-medium"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="btn-primary btn btn-sm"
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-50 border border-sage-200 rounded-full text-xs font-medium text-sage-700 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
          Built for creative freelancers & agencies
        </div>

        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal-800 max-w-4xl mx-auto leading-[1.05] mb-6">
          Stop losing money to{' '}
          <span className="gradient-text italic">scope creep</span>
        </h1>

        <p className="text-lg text-charcoal-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Generate professional proposals from a project brief, track scope creep in real time,
          and give clients a beautiful portal to sign off — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <button
            onClick={() => navigate('/signup')}
            className="btn btn-primary btn-lg group"
          >
            Build your first proposal
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-outline btn-lg"
          >
            View dashboard demo
          </button>
        </div>

        {/* Dashboard preview mockup */}
        <div className="relative max-w-4xl mx-auto">
          <div className="paper rounded-2xl overflow-hidden border border-cream-300">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-charcoal-100 border-b border-cream-300">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-sage-400" />
              <div className="flex-1 mx-4 h-5 bg-charcoal-200 rounded text-[10px] flex items-center px-2 text-charcoal-400">
                app.propflow.io/dashboard
              </div>
            </div>
            {/* Mockup content */}
            <div className="p-3 sm:p-6 bg-cream-100 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {[
                { label: 'Revenue MTD', value: '$14,600' },
                { label: 'Active Proposals', value: '5' },
                { label: 'Pending Sign-off', value: '2' },
                { label: 'Scope Alerts', value: '4' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-xl p-2.5 sm:p-4 border border-cream-300 min-w-0">
                  <p className="text-[9px] sm:text-[10px] text-charcoal-400 uppercase tracking-wide mb-1 break-words">{kpi.label}</p>
                  <p className="text-lg sm:text-xl font-display text-charcoal-800">{kpi.value}</p>
                </div>
              ))}
              <div className="col-span-2 sm:col-span-3 bg-white rounded-xl p-2.5 sm:p-4 border border-cream-300 h-24 sm:h-28 flex items-center justify-center min-w-0">
                <div className="flex items-end gap-1.5 sm:gap-2 h-14 sm:h-16">
                  {[40, 65, 50, 80, 60, 95].map((h, i) => (
                    <div
                      key={i}
                      className="w-4 sm:w-6 rounded-t bg-sage-200"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-2.5 sm:p-4 border border-cream-300 h-24 sm:h-28 space-y-2 min-w-0">
                {['Signed ✓', 'Scope Alert ⚠', 'Invoice Paid'].map((item) => (
                  <div key={item} className="h-5 bg-cream-200 rounded text-[9px] flex items-center px-1.5 sm:px-2 text-charcoal-500 truncate">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-sage-300/30 blur-2xl rounded-full -z-10" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">What it does</p>
          <h2 className="font-display text-4xl text-charcoal-800">Less admin. More billable hours.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="card-hover p-6 group">
                <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center mb-4 group-hover:bg-sage-200 transition-colors">
                  <Icon size={20} className="text-sage-700" />
                </div>
                <h3 className="font-semibold text-charcoal-800 mb-2">{f.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-charcoal-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-3">Client stories</p>
            <h2 className="font-display text-4xl text-white">Real freelancers. Real results.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-charcoal-700 rounded-2xl p-6 border border-charcoal-600">
                <p className="text-charcoal-200 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sage-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-white">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-charcoal-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-3">Pricing</p>
          <h2 className="font-display text-4xl text-charcoal-800">Simple, honest pricing.</h2>
          <p className="text-charcoal-500 mt-3 text-sm">14-day free trial on all plans. No credit card required.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-7 border transition-all ${
                plan.highlight
                  ? 'bg-charcoal-800 border-charcoal-700 shadow-card-lg scale-[1.02]'
                  : 'bg-white border-cream-300 shadow-card'
              }`}
            >
              {plan.highlight && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage-600 rounded-full text-[10px] font-semibold text-white uppercase tracking-wide mb-3">
                  Most popular
                </div>
              )}
              <h3 className={`font-display text-2xl mb-1 ${plan.highlight ? 'text-white' : 'text-charcoal-800'}`}>
                {plan.name}
              </h3>
              <p className={`text-xs mb-4 ${plan.highlight ? 'text-charcoal-400' : 'text-charcoal-500'}`}>{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-display ${plan.highlight ? 'text-white' : 'text-charcoal-800'}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ${plan.highlight ? 'text-charcoal-400' : 'text-charcoal-400'}`}>/mo</span>
              </div>
              <ul className="space-y-2.5 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle size={14} className={plan.highlight ? 'text-sage-400' : 'text-sage-500'} />
                    <span className={plan.highlight ? 'text-charcoal-300' : 'text-charcoal-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                  plan.highlight
                    ? 'bg-sage-600 text-white hover:bg-sage-700'
                    : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-sage-600 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl text-white mb-4">Ready to close more clients?</h2>
          <p className="text-sage-200 text-sm mb-8">Join 2,400+ freelancers and agencies sending better proposals.</p>
          <button
            onClick={() => navigate('/signup')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-sage-800 rounded-xl text-sm font-semibold hover:bg-cream-100 transition-all active:scale-[0.98] shadow-card-md"
          >
            Build your first proposal free
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cream-300 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-sage-600 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">P</span>
            </div>
            <span className="text-sm text-charcoal-500">PropFlow</span>
          </div>
          <p className="text-xs text-charcoal-400">© 2024 PropFlow. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-charcoal-400">
            <a href="#" className="hover:text-charcoal-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-charcoal-700 transition-colors">Terms</a>
            <a href="#" className="hover:text-charcoal-700 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
