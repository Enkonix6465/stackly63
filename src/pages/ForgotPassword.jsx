import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '../components/language-selector'
import { ThemeToggle } from '../components/theme-toggle'
import { resetPassword } from '../utils/auth'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
    
    if (!email.trim()) {
      setError(t('forgotPassword.errorEmailRequired'))
      return
    }

    if (newPassword.length < 6) {
      setError(t('forgotPassword.errorPasswordLength'))
      return
    }
    
    if (newPassword !== confirmPassword) {
      setError(t('forgotPassword.errorPasswordsMismatch'))
      return
    }

    // Check if email exists in users
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase())
    
    if (!userExists) {
      setError(t('forgotPassword.errorEmailNotFound'))
      return
    }

    const result = resetPassword(email, newPassword)
    if (result.success) {
      setSuccess(t('forgotPassword.successPasswordReset'))
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 2000)
    } else {
      setError(result.message)
    }
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
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                {t('forgotPassword.resetPassword')}
              </h2>
              <p className={`mt-1 ${
                isDark ? "text-gray-300" : "text-white/70"
              }`}>
                {t('forgotPassword.enterEmailToContinue')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-white/80"
                }`}>{t('forgotPassword.email')}</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('forgotPassword.emailPlaceholder')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
                    isDark 
                      ? "bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400" 
                      : "bg-white/20 border-white/30 text-white placeholder-white/60"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="newPassword" className={`block text-sm font-medium ${
                  isDark ? "text-gray-200" : "text-white/80"
                }`}>{t('forgotPassword.newPassword')}</label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t('forgotPassword.newPasswordPlaceholder')}
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
                }`}>{t('forgotPassword.confirmPassword')}</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('forgotPassword.confirmPasswordPlaceholder')}
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

              {success && (
                <div className={`rounded-md px-3 py-2 text-sm ${
                  isDark 
                    ? "text-green-400 bg-green-800/40 border-green-600/50" 
                    : "text-green-300 bg-green-900/40 border-green-700/50"
                }`}>{success}</div>
              )}

              <button type="submit" className="w-full btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: '#4CAF50' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
                {t('forgotPassword.resetPasswordButton')}
              </button>
            </form>

            <p className={`mt-6 text-center text-sm ${
              isDark ? "text-gray-300" : "text-white/80"
            }`}>
              {t('forgotPassword.rememberPassword')} <Link to="/login" className={`underline ${
                isDark 
                  ? "text-green-400 hover:text-green-300" 
                  : "text-green-300 hover:text-green-200"
              }`}>{t('forgotPassword.signIn')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
