import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '../components/language-selector'
import { loginUser, getUsers, saveUsers } from '../utils/auth'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    console.log('🔍 Login attempt:', { email, password })

    if (!email.trim() || !password) {
      setError(t('login.errorEmailPassword'))
      return
    }

    // Check for admin credentials
    if ((email === "admin@enkonix.in" || email === "admin@enkonix.com") && password === "admin123") {
      console.log('✅ Admin credentials detected')
      
      // Create admin user object (DO NOT add to users list)
      const adminUser = {
        id: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        email: email,
        password: password,
        role: 'admin',
        loginTime: new Date().toISOString(),
        isAdmin: true // Special flag to identify admin
      }
      
      // Store admin user in localStorage for authentication ONLY
      localStorage.setItem('authUser', JSON.stringify(adminUser))
      console.log('💾 Admin user authenticated:', adminUser)
      
      // Verify storage
      const stored = localStorage.getItem('authUser')
      console.log('🔍 Stored auth data:', stored)
      
      console.log('🚀 Navigating to admin dashboard')
      navigate('/admin-dashboard', { replace: true })
      return
    }

    console.log('👤 Regular user login attempt')
    const { success, message } = loginUser(email, password)
    if (!success) {
      setError(message)
      return
    }
    navigate('/home', { replace: true })
  }

  return (
    <div className="min-h-screen w-full bg-[url('/images/login-page.jpg')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Header with Language Selector */}
      <div className="relative z-20 w-full animate-fade-in">
        <header className="bg-black/80 backdrop-blur-md border-b border-white/20 shadow-lg">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src="/Logo.jpg" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <LanguageSelector variant="login" />
            </div>
          </div>
        </header>
      </div>
      
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-lg lg:max-w-xl animate-fade-in">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 lg:p-10 text-white animate-slide-up">
            <div className="mb-6 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">{t('login.welcomeBack')}</h2>
              <p className="text-white/70 mt-1">{t('login.loginToContinue')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80">{t('login.email')}</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('login.emailPlaceholder')}
                  className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80">{t('login.password')}</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>

              {error && (
                <div className="text-red-300 bg-red-900/40 border border-red-700/50 rounded-md px-3 py-2 text-sm">{error}</div>
              )}

              <button type="submit" className="w-full btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: '#4CAF50' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
                {t('login.signIn')}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-green-300 hover:text-green-200 underline">
                {t('login.forgotPassword')}
              </Link>
            </div>

            <p className="mt-6 text-center text-sm text-white/80">
              {t('login.noAccount')} <Link to="/register" className="text-green-300 hover:text-green-200 underline">{t('login.register')}</Link>
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