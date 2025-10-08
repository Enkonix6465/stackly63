import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import FAQ from '../components/FAQ'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../components/theme-provider'

export default function Contact() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)
  const [videoLoading, setVideoLoading] = useState(false)

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])


  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser()
        setUser(currentUser)
      } else {
        navigate('/login')
      }
    }
    checkAuth()
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = t('contact.form.errors.name')
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid')
    }
    if (!formData.subject.trim()) newErrors.subject = t('contact.form.errors.subject')
    if (!formData.message.trim()) newErrors.message = t('contact.form.errors.message')
    if (!formData.consent) newErrors.consent = t('contact.form.errors.consent')
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false)
      return
    }
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false
      })
    }, 3000)
  }

  if (!user) {
    return null
  }

  return (
    <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} text-black dark:text-white transition-colors`}>
      <Navbar user={user} />


      {/* Showcase */}
<section
  id="showcase"
  className="relative overflow-hidden h-screen flex items-center justify-center text-center"
>
  {/* Fallback Background */}
  <div className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-white'}`}></div>
  
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
    onLoadedData={() => {
      console.log('Video loaded successfully')
    }}
    onError={(e) => {
      console.error('Video error:', e)
    }}
  >
    <source src="/HealthwellnessContact.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay (darken video for readability) */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
      <h1 className="mt-4 text-4xl font-extrabold mb-4 leading-tight text-white">
        {t('contact.hero.title')}
      </h1>
    </ScrollAnimation>
    
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
      <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
        {t('contact.hero.subtitle')}
      </p>
    </ScrollAnimation>
    
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
      <div className="mt-8 flex gap-4 justify-center">
        {/* Primary Button */}
        <a
          href="#contact"
          className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
          style={{ backgroundColor: '#4CAF50' }}
        >
          {t('contact.hero.primaryCta')}
        </a>
      </div>
    </ScrollAnimation>
  </div>
</section>
      
      

      {/* Contact Form Section - full width form */}
      <section id="contact" className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-5xl px-4">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
              <div className="text-center mb-12">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('contact.form.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>{t('contact.form.subtitle')}</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
            <div className="w-full">
              {submitSuccess && (
                <div className={`mb-6 rounded-xl p-4 border-2 border-green-500 text-green-500 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  {t('contact.form.successMessage')}
                </div>
              )}
              <form onSubmit={handleSubmit} className={`w-full rounded-2xl shadow-xl p-6 md:p-8 border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('contact.form.fullName')}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.name ? 'border-red-500' : (isDark ? 'border-gray-600' : 'border-gray-300')
                      } ${isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
                      placeholder={t('contact.form.fullNamePlaceholder')}
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('contact.form.emailAddress')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.email ? 'border-red-500' : (isDark ? 'border-gray-600' : 'border-gray-300')
                      } ${isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('contact.form.phoneNumber')}</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('contact.form.subject')}</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.subject ? 'border-red-500' : (isDark ? 'border-gray-600' : 'border-gray-300')
                      } ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    >
                      <option value="" className={isDark ? 'bg-gray-700' : 'bg-white'}>{t('contact.form.subjectPlaceholder')}</option>
                      <option value="Nutrition" className={isDark ? 'bg-gray-700' : 'bg-white'}>{t('contact.form.subjectOptions.nutrition')}</option>
                      <option value="Fitness" className={isDark ? 'bg-gray-700' : 'bg-white'}>{t('contact.form.subjectOptions.fitness')}</option>
                      <option value="Mental Health" className={isDark ? 'bg-gray-700' : 'bg-white'}>{t('contact.form.subjectOptions.mental')}</option>
                      <option value="Sleep" className={isDark ? 'bg-gray-700' : 'bg-white'}>{t('contact.form.subjectOptions.sleep')}</option>
                      <option value="Chronic Care" className={isDark ? 'bg-gray-700' : 'bg-white'}>{t('contact.form.subjectOptions.chronic')}</option>
                      <option value="General" className={isDark ? 'bg-gray-700' : 'bg-white'}>{t('contact.form.subjectOptions.general')}</option>
                    </select>
                    {errors.subject && <p className="mt-2 text-sm text-red-500">{errors.subject}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.message ? 'border-red-500' : (isDark ? 'border-gray-600' : 'border-gray-300')
                    } ${isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                  {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={handleCheckboxChange}
                    className={`mt-1 h-5 w-5 rounded border focus:ring-2 focus:ring-green-500 ${
                      isDark ? 'border-gray-600 bg-gray-700 text-green-500' : 'border-gray-300 bg-white text-green-500'
                    }`}
                  />
                  <label htmlFor="consent" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.form.consent')}
                  </label>
                </div>
                {errors.consent && <p className="mt-2 text-sm text-red-500">{errors.consent}</p>}

                <div className="mt-8 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-animate-strong inline-flex items-center rounded-lg px-6 py-3 font-semibold transition-all whitespace-nowrap text-white shadow-lg bg-green-500 hover:bg-green-600 disabled:opacity-70"
                  >
                    {isSubmitting ? t('contact.form.sendingMessage') : t('contact.form.sendMessage')}
                  </button>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('contact.form.avgResponse')}</p>
                </div>
              </form>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Why reach out? Section - improved UI/UX */}
      <section id="why-reach-out" className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-6xl px-4">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('contact.why.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>{t('contact.why.subtitle')}</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
                isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-green-500">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('contact.why.cards.plansTitle')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('contact.why.cards.plansDesc')}</p>
              </div>
              <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
                isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-green-500">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('contact.why.cards.expertsTitle')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('contact.why.cards.expertsDesc')}</p>
              </div>
              <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
                isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-green-500">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('contact.why.cards.followupsTitle')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('contact.why.cards.followupsDesc')}</p>
              </div>
              <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
                isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-green-500">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('contact.why.cards.habitsTitle')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('contact.why.cards.habitsDesc')}</p>
              </div>
            </div>
          </ScrollAnimation>

        </div>
      </section>

      {/* Features Strip removed as requested */}

      {/* Map Section */}
<section className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {t('contact.map.title')}
      </h2>
      <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {t('contact.map.subtitle')}
      </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
            <div className={`rounded-2xl overflow-hidden shadow-xl border ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <div className="aspect-w-16 aspect-h-9 h-96 md:h-[500px]">
              {/* Placeholder for Google Maps - Replace with actual map integration */}
              <div className={`w-full h-full flex items-center justify-center ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}>
                <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.953736315904!3d-37.8162797420217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1620211234567!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
              </div>
            </div>
          </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Information Section */}
<section className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {t('contact.contactInfo.title')}
      </h2>
      <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {t('contact.contactInfo.subtitle')}
      </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Phone */}
            <div className={`rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
              isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.contactInfo.phone')}
              </h3>
              <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('contact.contactInfo.phoneNumber')}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('contact.contactInfo.phoneHours')}
              </p>
            </div>

            {/* Email */}
            <div className={`rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
              isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.contactInfo.email')}
              </h3>
              <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('contact.contactInfo.emailAddress')}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('contact.contactInfo.emailResponse')}
              </p>
            </div>

            {/* Office */}
            <div className={`rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
              isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('contact.contactInfo.office')}
              </h3>
              <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('contact.contactInfo.officeAddress')}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('contact.contactInfo.officeCity')}
              </p>
            </div>
          </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Call to Action Section - Image Overlay Design */}
<section className="relative py-32 overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
    style={{
      backgroundImage: 'url(/images/hero.jpg)'
    }}
  ></div>
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
  
  {/* Content */}
  <div className="relative z-10 mx-auto max-w-7xl px-4">
    <div className="text-left">
      
      {/* Left Side - Text Content */}
      <div className="space-y-8">
        <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              <span className="text-green-300 font-medium">{t('contact.ctaBanner.tag')}</span>
            </div>
            
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              {t('contact.ctaBanner.title')}
    </h2>
            
            <p className="text-xl text-white/90 leading-relaxed">
              {t('contact.ctaBanner.desc')}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold">{t('contact.ctaBanner.highlights.expertsTitle')}</div>
                <div className="text-white/70 text-sm">{t('contact.ctaBanner.highlights.expertsDesc')}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold">{t('contact.ctaBanner.highlights.supportTitle')}</div>
                <div className="text-white/70 text-sm">{t('contact.ctaBanner.highlights.supportDesc')}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold">{t('contact.ctaBanner.highlights.resultsTitle')}</div>
                <div className="text-white/70 text-sm">{t('contact.ctaBanner.highlights.resultsDesc')}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold">{t('contact.ctaBanner.highlights.plansTitle')}</div>
                <div className="text-white/70 text-sm">{t('contact.ctaBanner.highlights.plansDesc')}</div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
    <a
      href='#contact2'
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-105"
              style={{ 
                backgroundColor: '#4CAF50',
                boxShadow: '0 10px 30px rgba(76, 175, 80, 0.4)'
              }}
            >
              <span className="relative z-10">{t('contact.ctaBanner.ctaPrimary')}</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a
              href='tel:+18005550134'
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {t('contact.ctaBanner.ctaCall')}
            </a>
          </div>
        </ScrollAnimation>
      </div>

    </div>
  </div>
</section>

      {/* Secondary Anchor to Form */}
      <section id="contact2" className="py-0"></section>

      <Footer />
    </div>
  )
}
