import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '../components/language-selector'
import { ThemeToggle } from '../components/theme-toggle'
import { loginUser, getUsers, saveUsers } from '../utils/auth'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

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
    <div className={`h-screen w-full bg-[url('/images/login-page.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden ${
      isDark ? "dark:bg-gray-900" : ""
    }`}>
      <div className={`absolute inset-0 ${
        isDark ? "bg-black/50" : "bg-black/30"
      }`} />
      
      {/* Header with Language Selector */}
      <div className="relative z-20 w-full animate-fade-in">
        <header className={`backdrop-blur-md border-b shadow-lg ${
          isDark 
            ? "bg-gray-800/90 border-gray-700/30" 
            : "bg-white/90 border-gray-200/30"
        }`}>
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src="/Logo.jpg" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>
            
            {/* Language Selector and Theme Toggle */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSelector variant="login" />
            </div>
          </div>
        </header>
      </div>
      
      <div className="relative z-10 flex h-screen items-center justify-center p-6">
        <div className="w-full max-w-lg lg:max-w-xl animate-fade-in">
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 lg:p-10 animate-slide-up ${
            isDark 
              ? "bg-gray-800/20 border-gray-600/30 text-gray-100" 
              : "bg-white/10 border-white/20 text-white"
          }`}>
            <div className="mb-6 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">{t('login.welcomeBack')}</h2>
              <p className={`mt-1 ${
                isDark ? "text-gray-300" : "text-white/70"
              }`}>{t('login.loginToContinue')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-white/80"
                }`}>{t('login.email')}</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('login.emailPlaceholder')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
                    isDark 
                      ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400" 
                      : "bg-white/20 border-white/30 text-white placeholder-white/60"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-white/80"
                }`}>{t('login.password')}</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
                    isDark 
                      ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400" 
                      : "bg-white/20 border-white/30 text-white placeholder-white/60"
                  }`}
                />
              </div>

              {error && (
                <div className={`rounded-md px-3 py-2 text-sm ${
                  isDark 
                    ? "text-red-400 bg-red-800/40 border-red-600/50" 
                    : "text-red-300 bg-red-900/40 border-red-700/50"
                }`}>{error}</div>
              )}

              <button type="submit" className="w-full btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: '#4CAF50' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
                {t('login.signIn')}
              </button>
            </form>

            <div className="mt-4 text-center">
              <span className={`text-sm ${
                isDark 
                  ? "text-gray-300" 
                  : "text-white/80"
              }`}>
                {t('login.forgotPassword')} 
              </span>
              <Link to="/forgot-password" className={`text-sm underline ml-1 ${
                isDark 
                  ? "text-green-400 hover:text-green-300" 
                  : "text-green-300 hover:text-green-200"
              }`}>
                {t('login.reset')}
              </Link>
            </div>

            <p className={`mt-6 text-center text-sm ${
              isDark ? "text-gray-300" : "text-white/80"
            }`}>
              {t('login.noAccount')} <Link to="/register" className={`underline ${
                isDark 
                  ? "text-green-400 hover:text-green-300" 
                  : "text-green-300 hover:text-green-200"
              }`}>{t('login.register')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 