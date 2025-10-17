import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { registerUser } from '../utils/auth'
import { ThemeToggle } from '../components/theme-toggle'
import { LanguageSelector } from '../components/language-selector'

function isValidEmail(value) {
  return /.+@.+\..+/.test(String(value).toLowerCase())
}

export default function Register() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError(t('register.errorNameRequired'))
      return
    }
    if (!isValidEmail(form.email)) {
      setError(t('register.errorEmailInvalid'))
      return
    }
    if (form.password.length < 6) {
      setError(t('register.errorPasswordLength'))
      return
    }
    if (form.password !== form.confirmPassword) {
      setError(t('register.errorPasswordsMismatch'))
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
        <div className="w-full max-w-2xl animate-fade-in">
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl p-8 lg:p-10 animate-slide-up ${
            isDark 
              ? "bg-gray-800/20 border-gray-600/30 text-gray-100" 
              : "bg-white/10 border-white/20 text-white"
          }`}>
            <div className="mb-6 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">{t('register.createAccount')}</h2>
              <p className={`mt-1 ${
                isDark ? "text-gray-300" : "text-white/70"
              }`}>{t('register.joinUs')}</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={`block text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-white/80"
                }`}>{t('register.firstName')}</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder={t('register.firstNamePlaceholder')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
                    isDark 
                      ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400" 
                      : "bg-white/20 border-white/30 text-white placeholder-white/60"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="lastName" className={`block text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-white/80"
                }`}>{t('register.lastName')}</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder={t('register.lastNamePlaceholder')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
                    isDark 
                      ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400" 
                      : "bg-white/20 border-white/30 text-white placeholder-white/60"
                  }`}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className={`block text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-white/80"
                }`}>{t('register.email')}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('register.emailPlaceholder')}
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
                }`}>{t('register.password')}</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={t('register.passwordPlaceholder')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
                    isDark 
                      ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400" 
                      : "bg-white/20 border-white/30 text-white placeholder-white/60"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className={`block text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-white/80"
                }`}>{t('register.confirmPassword')}</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder={t('register.confirmPasswordPlaceholder')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
                    isDark 
                      ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400" 
                      : "bg-white/20 border-white/30 text-white placeholder-white/60"
                  }`}
                />
              </div>

              {error && (
                <div className={`sm:col-span-2 rounded-md px-3 py-2 text-sm ${
                  isDark 
                    ? "text-red-400 bg-red-800/40 border-red-600/50" 
                    : "text-red-300 bg-red-900/40 border-red-700/50"
                }`}>{error}</div>
              )}

              <div className="sm:col-span-2">
                <button type="submit" className="w-full btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: '#4CAF50' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
                  {t('register.createAccountButton')}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <span className={`text-sm ${
                isDark 
                  ? "text-gray-300" 
                  : "text-white/80"
              }`}>
                {t('register.forgotPassword')} 
              </span>
              <Link to="/forgot-password" className={`text-sm underline ml-1 ${
                isDark 
                  ? "text-green-400 hover:text-green-300" 
                  : "text-green-300 hover:text-green-200"
              }`}>
                {t('register.reset')}
              </Link>
            </div>

            <p className={`mt-6 text-center text-sm ${
              isDark ? "text-gray-300" : "text-white/80"
            }`}>
              {t('register.alreadyHaveAccount')} <Link to="/login" className={`underline ${
                isDark 
                  ? "text-green-400 hover:text-green-300" 
                  : "text-green-300 hover:text-green-200"
              }`}>{t('register.login')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 