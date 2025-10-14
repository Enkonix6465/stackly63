import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <footer className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'} border-t border-gray-200 dark:border-gray-700`}>
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information and Social Media */}
          <div className="lg:col-span-1">
            <img src="/Logo.jpg" alt="Logo" className="h-10 w-auto mb-4" />
            <p className={`${isDark ? 'text-gray-400' : 'text-black'} mb-6 leading-relaxed`}>
              {t('footer.companyDescription')}
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1877F2] text-white hover:bg-[#166FE5] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-white hover:bg-gray-800 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0077B5] text-white hover:bg-[#005885] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className={`text-lg font-bold mb-3 relative ${isDark ? 'text-white' : 'text-black'}`}> 
                {t('footer.quickLinks')}
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-600"></div>
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                { name: t('footer.home1'), path: '/home' },
                { name: t('footer.home2'), path: '/home2' },
                { name: t('footer.about'), path: '/about' },
                { name: t('footer.services'), path: '/services' },
                { name: t('footer.blog'), path: '/blog' },
                { name: t('footer.contact'), path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.path)}
                    className={`${isDark ? 'text-gray-400 hover:text-green-400' : 'text-black hover:text-green-600'} transition-colors duration-300 text-left`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* For Freelancers */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className={`text-lg font-bold mb-3 relative ${isDark ? 'text-white' : 'text-black'}`}> 
                {t('footer.forFreelancers')}
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-600"></div>
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                { name: t('footer.sportsTraining'), path: '/services/sports-training' },
                { name: t('footer.spaTherapies'), path: '/services/spa-therapies' },
                { name: t('footer.holisticHealing'), path: '/services/holistic-healing' },
                { name: t('footer.nutritionPlans'), path: '/services/nutrition-plans' },
                { name: t('footer.mindfulLiving'), path: '/services/mindful-living' },
                { name: t('footer.wellnessEvents'), path: '/services/wellness-events' }
              ].map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => navigate(service.path)}
                    className={`${isDark ? 'text-gray-400 hover:text-green-400' : 'text-black hover:text-green-600'} transition-colors duration-300 cursor-pointer text-left`}
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Us */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className={`text-lg font-bold mb-3 relative ${isDark ? 'text-white' : 'text-black'}`}> 
                {t('footer.contactUs')}
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-600"></div>
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className={`${isDark ? 'bg-green-900' : 'bg-green-100'} w-5 h-5 rounded-full flex items-center justify-center mt-0.5`}>
                  <svg className={`w-3 h-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <span className={`${isDark ? 'text-gray-400' : 'text-black'}`}>{t('footer.phone')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`${isDark ? 'bg-green-900' : 'bg-green-100'} w-5 h-5 rounded-full flex items-center justify-center mt-0.5`}>
                  <svg className={`w-3 h-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <span className={`${isDark ? 'text-gray-400' : 'text-black'}`}>{t('footer.email')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`${isDark ? 'bg-green-900' : 'bg-green-100'} w-5 h-5 rounded-full flex items-center justify-center mt-0.5`}>
                  <svg className={`w-3 h-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className={`${isDark ? 'text-gray-400' : 'text-black'}`}>{t('footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Copyright Section */}
      <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="text-center">
            <p className={`${isDark ? 'text-gray-400' : 'text-black'} text-sm`}>
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
