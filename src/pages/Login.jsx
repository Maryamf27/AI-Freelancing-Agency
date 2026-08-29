import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import AuthLayout from '../components/layout/AuthLayout'
import { Input } from '../components/ui/FormFields'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Enter your email and password to continue.')
      return
    }
    setError('')
    setLoading(true)
    // Mock authentication — any credentials work in this demo
    setTimeout(() => {
      navigate('/dashboard')
    }, 700)
  }

  const handleForgotPassword = () => {
    if (!email) {
      setError('Enter your email above first, then click "Forgot password".')
      return
    }
    setError('')
    setResetSent(true)
    setTimeout(() => setResetSent(false), 4000)
  }

  return (
    <AuthLayout>
      <h1 className="font-display text-2xl text-charcoal-800 mb-1.5">Welcome back</h1>
      <p className="text-sm text-charcoal-400 mb-8">Sign in to your PropFlow workspace.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@studio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="field-label mb-0">Password</label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-sage-600 hover:text-sage-800 font-medium transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
        </div>

        {resetSent && (
          <p className="text-xs text-sage-600 bg-sage-50 border border-sage-200 rounded-lg px-3 py-2 animate-fade-in">
            Password reset link sent to {email}.
          </p>
        )}
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
              Sign in
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-cream-300" />
        <span className="text-xs text-charcoal-400">or</span>
        <div className="flex-1 h-px bg-cream-300" />
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="btn btn-outline w-full justify-center gap-2"
      >
        <svg width="15" height="15" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.12-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>

      <p className="text-sm text-charcoal-500 text-center mt-8">
        Don't have an account?{' '}
        <Link to="/signup" className="text-sage-700 font-medium hover:text-sage-900">
          Sign up free
        </Link>
      </p>
    </AuthLayout>
  )
}
