import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/auth'

function isValidEmail(value) {
  return /.+@.+\..+/.test(String(value).toLowerCase())
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Please enter your first and last name')
      return
    }
    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const { success, message } = registerUser({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email,
      password: form.password
    })

    if (!success) {
      setError(message)
      return
    }

    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen w-full bg-[url('/images/login-page.jpg')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 lg:p-10 text-white animate-slide-up">
            <div className="mb-6 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Create your account</h2>
              <p className="text-white/70 mt-1">Join us and get started</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white/80">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white/80">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-white/80">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>

              {error && (
                <div className="sm:col-span-2 text-red-300 bg-red-900/40 border border-red-700/50 rounded-md px-3 py-2 text-sm">{error}</div>
              )}

              <div className="sm:col-span-2">
                <button type="submit" className="w-full btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: '#4CAF50' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-green-300 hover:text-green-200 underline">
                Forgot your password?
              </Link>
            </div>

            <p className="mt-6 text-center text-sm text-white/80">
              Already have an account? <Link to="/login" className="text-green-300 hover:text-green-200 underline">Login</Link>
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-white/70">
            <span className="h-2 w-2 bg-white/40 rounded-full animate-float-slow" />
            <span className="h-2 w-2 bg-white/40 rounded-full animate-float-slow [animation-delay:200ms]" />
            <span className="h-2 w-2 bg-white/40 rounded-full animate-float-slow [animation-delay:400ms]" />
          </div>
        </div>
      </div>
    </div>
  )
} 