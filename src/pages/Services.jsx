import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import ClassesTimetable from '../components/ClassesTimetable'
import WellnessProgress from '../components/WellnessProgress'
import PricingPlans from '../components/PricingPlans'
import WellnessServicesGrid from '../components/WellnessServicesGrid'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function Services() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
    }
    // Theme detection
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [navigate])

  // Smooth scroll to section if hash is present
  useEffect(() => {
    const { hash } = window.location
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 0)
      }
    }
  }, [])

  const user = getCurrentUser()

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar user={user} />

      {/* Showcase */}
      <section
        id="showcase"
        className="relative overflow-hidden h-screen flex items-center justify-center text-center"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/63S.mp4" type="video/mp4" />
          {t('services.video.notSupported')}
        </video>

        {/* Overlay (darken video for readability) */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight text-white">
            {t('services.showcase.title')}
          </h1>
          <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
            {t('services.showcase.subtitle')}
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            {/* Primary Button */}
            <a
              href="/services"
              className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#4CAF50' }}
            >
              {t('services.showcase.exploreButton')}
            </a>

            {/* Secondary Button */}
            <a
              href="/contact"
              className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#4CAF50' }}
            >
              {t('services.showcase.reachOutButton')}
            </a>
          </div>
        </div>
      </section>

      {/* Our Wellness Services section */}
      <WellnessServicesGrid />

      {/* Pricing section with fixed background image */}
      <PricingPlans />

      {/* Wellness progress section (before timetable) */}
      <WellnessProgress />

      {/* Classes Timetable */}
      <ClassesTimetable />

      {/* 6) CTA - Health & Wellness consultation */}
      <section id="cta" className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('services.cta.title')}
            </h2>
            <p className={`mt-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('services.cta.subtitle')}
            </p>
                <a
                  href="/contact"
              className="btn-animate-strong inline-flex items-center justify-center rounded-lg px-8 py-4 font-semibold text-lg text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#4CAF50' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              {t('services.cta.button')}
                </a>
              </div>
          <div className="relative">
            <img
              src="/images/63S9.jpg"
              alt={t('services.cta.consultationImage')}
              className="w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute left-4 top-8">
              <div className="mb-3 rounded-full bg-white/90 text-gray-900 px-5 py-3 text-sm font-semibold shadow">{t('services.cta.badges.personalizedSupport')}</div>
              <div className="mb-3 rounded-full bg-white/90 text-gray-900 px-5 py-3 text-sm font-semibold shadow">{t('services.cta.badges.growthFocusedTools')}</div>
              <div className="rounded-full bg-white/90 text-gray-900 px-5 py-3 text-sm font-semibold shadow">{t('services.cta.badges.safeConfidential')}</div>
                </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


