import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout'
import { Input } from '../components/ui/FormFields'
import { useAppData } from '../context/AppDataContext'

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('') || 'JK'
}

export default function Signup() {
  const navigate = useNavigate()
  const { setProfile } = useAppData()
  const [name, setName] = useState('')
  const [studio, setStudio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const passwordChecks = {
    length: password.length >= 8,
    number: /\d/.test(password),
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Fill in your name, email, and password to continue.')
      return
    }
    if (!passwordChecks.length || !passwordChecks.number) {
      setError('Password must be at least 8 characters and include a number.')
      return
    }
    if (!agreed) {
      setError('Please agree to the Terms and Privacy Policy.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setProfile((prev) => ({
        ...prev,
        name,
        studio: studio || `${name}'s Studio`,
        email,
        avatarInitials: initials(name),
      }))
      navigate('/dashboard')
    }, 800)
  }

  return (
    <AuthLayout>
      <h1 className="font-display text-2xl text-charcoal-800 mb-1.5">Create your account</h1>
      <p className="text-sm text-charcoal-400 mb-8">Start your 14-day free trial. No credit card required.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          placeholder="James Keller"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <Input
          label="Studio / business name (optional)"
          placeholder="James Keller Studio"
          value={studio}
          onChange={(e) => setStudio(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@studio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <div>
          <label className="field-label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="field-input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {password && (
            <div className="flex gap-3 mt-1.5">
              <span className={`flex items-center gap-1 text-[11px] ${passwordChecks.length ? 'text-sage-600' : 'text-charcoal-400'}`}>
                <Check size={11} /> 8+ characters
              </span>
              <span className={`flex items-center gap-1 text-[11px] ${passwordChecks.number ? 'text-sage-600' : 'text-charcoal-400'}`}>
                <Check size={11} /> a number
              </span>
            </div>
          )}
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-3.5 h-3.5 rounded border-cream-400 text-sage-600 focus:ring-sage-400"
          />
          <span className="text-xs text-charcoal-500 leading-relaxed">
            I agree to the <a href="#" onClick={(e) => e.preventDefault()} className="text-sage-700 hover:text-sage-900 font-medium">Terms of Service</a> and{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="text-sage-700 hover:text-sage-900 font-medium">Privacy Policy</a>.
          </span>
        </label>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 animate-fade-in">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full justify-center gap-2 ${loading ? 'opacity-70 pointer-events-none' : ''}`}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create account
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      <p className="text-sm text-charcoal-500 text-center mt-8">
        Already have an account?{' '}
        <Link to="/login" className="text-sage-700 font-medium hover:text-sage-900">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
