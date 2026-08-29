import { useNavigate } from 'react-router-dom'
import { Sparkles, CheckCircle } from 'lucide-react'

const points = [
  'Turn a project brief into a client-ready proposal in minutes',
  'Automatic scope creep alerts from your client chat',
  'One-click invoicing with milestone splits pre-filled',
]

export default function AuthLayout({ children }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream-100 flex">
      {/* Left: form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-10"
          >
            <div className="w-7 h-7 rounded-lg bg-sage-600 flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-display text-lg text-charcoal-800 tracking-tight">PropFlow</span>
          </button>

          {children}
        </div>
      </div>

      {/* Right: branded panel */}
      <div className="hidden lg:flex flex-1 bg-charcoal-800 relative overflow-hidden items-center justify-center px-16">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-sage-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sage-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-4">Why creatives switch to PropFlow</p>
          <h2 className="font-display text-3xl text-white leading-snug mb-8">
            Less admin.<br />More billable hours.
          </h2>
          <ul className="space-y-4 mb-10">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle size={17} className="text-sage-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal-200 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
          <div className="bg-charcoal-700 rounded-2xl p-5 border border-charcoal-600">
            <p className="text-sm text-charcoal-200 leading-relaxed italic mb-4">
              "I used to lose 3 hours a week writing proposals. Now it's 15 minutes."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sage-600 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-white">S</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Sasha Moran</p>
                <p className="text-xs text-charcoal-400">Brand Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
