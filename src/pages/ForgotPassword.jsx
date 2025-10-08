import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '../components/language-selector'
import { resetPassword } from '../utils/auth'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [step, setStep] = useState(1) // 1: email, 2: reset password
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleEmailSubmit(e) {
    e.preventDefault()
    setError('')
    
    if (!email.trim()) {
      setError(t('forgotPassword.errorEmailRequired'))
      return
    }

    // Check if email exists in users
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase())
    
    if (!userExists) {
      setError(t('forgotPassword.errorEmailNotFound'))
      return
    }

    setStep(2)
    setSuccess(t('forgotPassword.successEmailVerified'))
  }

  function handlePasswordReset(e) {
    e.preventDefault()
    setError('')
    
    if (newPassword.length < 6) {
      setError(t('forgotPassword.errorPasswordLength'))
      return
    }
    
    if (newPassword !== confirmPassword) {
      setError(t('forgotPassword.errorPasswordsMismatch'))
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

  function handleBackToEmail() {
    setStep(1)
    setError('')
    setSuccess('')
    setNewPassword('')
    setConfirmPassword('')
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
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                {step === 1 ? t('forgotPassword.resetPassword') : t('forgotPassword.setNewPassword')}
              </h2>
              <p className="text-white/70 mt-1">
                {step === 1 ? t('forgotPassword.enterEmailToContinue') : t('forgotPassword.createNewPassword')}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80">{t('forgotPassword.email')}</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('forgotPassword.emailPlaceholder')}
                    className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  />
                </div>

                {error && (
                  <div className="text-red-300 bg-red-900/40 border border-red-700/50 rounded-md px-3 py-2 text-sm">{error}</div>
                )}

                <button type="submit" className="w-full btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: '#4CAF50' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
                  {t('forgotPassword.continue')}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-white/80">{t('forgotPassword.newPassword')}</label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t('forgotPassword.newPasswordPlaceholder')}
                    className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">{t('forgotPassword.confirmPassword')}</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('forgotPassword.confirmPasswordPlaceholder')}
                    className="mt-1 w-full rounded-lg bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  />
                </div>

                {error && (
                  <div className="text-red-300 bg-red-900/40 border border-red-700/50 rounded-md px-3 py-2 text-sm">{error}</div>
                )}

                {success && (
                  <div className="text-green-300 bg-green-900/40 border border-green-700/50 rounded-md px-3 py-2 text-sm">{success}</div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    className="flex-1 btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl"
                  >
                    {t('forgotPassword.back')}
                  </button>
                  <button type="submit" className="flex-1 btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: '#4CAF50' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
                    {t('forgotPassword.resetPasswordButton')}
                  </button>
                </div>
              </form>
            )}

            <p className="mt-6 text-center text-sm text-white/80">
              {t('forgotPassword.rememberPassword')} <Link to="/login" className="text-green-300 hover:text-green-200 underline">{t('forgotPassword.signIn')}</Link>
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
