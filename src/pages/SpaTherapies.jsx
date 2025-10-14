import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import FAQ from '../components/FAQ'
import { useTranslation } from 'react-i18next'

export default function SpaTherapies() {
  const [user, setUser] = useState(null)
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'))
  const [openIndex, setOpenIndex] = useState(0) // First FAQ opens by default
  const navigate = useNavigate()
  const { t } = useTranslation()

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

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className={isDark ? 'bg-gray-900 text-white transition-colors' : 'bg-white text-black transition-colors'}>
      <Navbar user={user} />

      {/* Showcase */}
      <section
        id="showcase"
        className={
          'relative overflow-hidden h-screen flex items-center justify-center text-center ' +
          (isDark ? '' : '')
        }
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/63S2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay (darken video for readability) */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-4xl">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white whitespace-nowrap">
              {t('spaTherapies.showcase.title')}
            </h1>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="mt-6 text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed whitespace-nowrap">
              {t('spaTherapies.showcase.subtitle')}
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="mt-6 flex gap-4 justify-center">
              <a href="/contact" className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 text-white shadow-lg hover:shadow-xl whitespace-nowrap" style={{ backgroundColor: '#4CAF50' }}>
                {t('spaTherapies.showcase.connectButton')}
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>
      
      {/* Enhanced Spa Therapies Hero */}
      <section
        id="hero"
        className={
          'relative overflow-hidden ' +
          (isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900')
        }
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <h1 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('spaTherapies.hero.title')}
                </h1>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-xl leading-relaxed text-justify ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('spaTherapies.hero.description')}
                </p>
              </ScrollAnimation>

              {/* Feature Points */}
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('spaTherapies.hero.features.professionalTherapists')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('spaTherapies.hero.features.personalizedTreatments')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('spaTherapies.hero.features.holisticApproach')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('spaTherapies.hero.features.relaxingEnvironment')}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>

              {/* CTA Buttons */}
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap">
                    {t('spaTherapies.hero.bookSessionButton')}
                  </a>
                  <a href="#faq" className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-bold rounded-lg transition-all duration-300 whitespace-nowrap">
                    {t('spaTherapies.hero.learnMoreButton')}
                  </a>
                </div>
              </ScrollAnimation>
            </div>

            {/* Right Content - Clean Image Only */}
            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-2">
              <div className="relative">
                <img
                  src="/images/63S3.jpg"
                  alt="Spa Therapies"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={isDark ? 'py-20 bg-green-900' : 'py-20 bg-green-50'}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Top header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
            <div>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full mb-6 shadow-sm">
                  {t('spaTherapies.faq.tag')}
                </span>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <h2 className={isDark ? 'text-3xl md:text-4xl font-extrabold text-white leading-tight' : 'text-3xl md:text-4xl font-extrabold text-black leading-tight'}>
                  {t('spaTherapies.faq.title')}
                </h2>
              </ScrollAnimation>
              
              {/* Image below heading */}
              <div className="mt-8">
                <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img
                        src="/images/63S7.jpg"
                        alt="Spa therapy session"
                        className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
            <div className="space-y-4">
              {t('spaTherapies.faq.questions', { returnObjects: true }).map((faq, index) => (
                <ScrollAnimation key={index} animation="fade-in" stagger={`scroll-stagger-${index + 2}`}>
                  <div className={`${isDark ? 'bg-gray-900 rounded-xl border-2 border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-500' : 'bg-white rounded-xl border-2 border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-300'}`}>
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                      className={`w-full text-left p-6 flex justify-between items-center ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-xl transition-colors duration-300`}
                    >
                      <h3 className={`text-lg font-semibold pr-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h3>
                      <div className="flex-shrink-0">
                        {openIndex === index ? (
                          <span className={`text-2xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>−</span>
                        ) : (
                          <span className={`text-2xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+</span>
                        )}
                      </div>
                    </button>
                    {openIndex === index && (
                      <div className={`px-6 pb-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                        <div className="pt-4 animate-in fade-in duration-300">
                          <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={isDark ? 'py-20 bg-gray-900 text-white transition-colors duration-500' : 'py-20 bg-white text-gray-900 transition-colors duration-500'}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`${isDark ? 'text-4xl font-extrabold text-white mb-4' : 'text-4xl font-extrabold text-gray-900 mb-4'}`}>{t('spaTherapies.testimonials.title')}</h2>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-base text-gray-300 max-w-2xl mx-auto whitespace-nowrap' : 'text-base text-gray-600 max-w-2xl mx-auto whitespace-nowrap'}`}>{t('spaTherapies.testimonials.subtitle')}</p>
            </ScrollAnimation>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">SM</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>
                      {t('spaTherapies.testimonials.clients.client1.name')}
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      {t('spaTherapies.testimonials.clients.client1.role')}
                    </p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('spaTherapies.testimonials.clients.client1.content')}"
                </p>
              </div>
            </ScrollAnimation>

            {/* Testimonial 2 */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">JL</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>
                      {t('spaTherapies.testimonials.clients.client2.name')}
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      {t('spaTherapies.testimonials.clients.client2.role')}
                    </p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('spaTherapies.testimonials.clients.client2.content')}"
                </p>
              </div>
            </ScrollAnimation>

            {/* Testimonial 3 */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">MR</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>
                      {t('spaTherapies.testimonials.clients.client3.name')}
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      {t('spaTherapies.testimonials.clients.client3.role')}
                    </p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('spaTherapies.testimonials.clients.client3.content')}"
                </p>
              </div>
            </ScrollAnimation>

            {/* Testimonial 4 */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">AW</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>
                      {t('spaTherapies.testimonials.clients.client4.name')}
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      {t('spaTherapies.testimonials.clients.client4.role')}
                    </p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('spaTherapies.testimonials.clients.client4.content')}"
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Spa Therapy Services */}
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`${isDark ? 'text-3xl font-extrabold text-white mb-4 whitespace-nowrap' : 'text-3xl font-extrabold text-black mb-4 whitespace-nowrap'}`}>
                {t('spaTherapies.services.title')}
              </h2>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-base text-gray-400 max-w-2xl mx-auto whitespace-nowrap' : 'text-base text-black max-w-2xl mx-auto whitespace-nowrap'}`}>
                {t('spaTherapies.services.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: t('spaTherapies.services.deepTissueMassage'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
              { name: t('spaTherapies.services.aromatherapy'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg> },
              { name: t('spaTherapies.services.hotStoneTherapy'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" fill="none" stroke="#9C27B0" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
              { name: t('spaTherapies.services.facialTreatments'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
              { name: t('spaTherapies.services.bodyWraps'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> },
              { name: t('spaTherapies.services.reflexology'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" fill="none" stroke="#607D8B" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
              { name: t('spaTherapies.services.couplesMassage'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" fill="none" stroke="#795548" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { name: t('spaTherapies.services.wellnessPackages'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg> }
            ].map((service, index) => {
              const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6', 'scroll-stagger-1', 'scroll-stagger-2', 'scroll-stagger-3', 'scroll-stagger-4'];
              const staggerClass = staggerClasses[index] || 'scroll-stagger-3';
        
              return (
                <ScrollAnimation key={index} animation="fade-in" stagger={staggerClass}>
                  <div className={`${isDark ? 'text-center p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300' : 'text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'}`}>
                    <div className="text-4xl mb-3 flex justify-center item-center">{service.icon}</div>
                    <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{service.name}</h3>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className={isDark ? 'relative py-24 bg-gray-900' : 'relative py-24 bg-white'}>
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url('/images/CTAc.jpg')` }}></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Heading */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight whitespace-nowrap">{t('spaTherapies.cta.title')}</h2>
          </ScrollAnimation>

          {/* Subtext */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-10 whitespace-nowrap">{t('spaTherapies.cta.subtitle')}</p>
          </ScrollAnimation>

          {/* Buttons */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button onClick={() => navigate('/contact')} className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 text-white shadow-lg hover:shadow-xl whitespace-nowrap" style={{ backgroundColor: '#4CAF50' }}>
                {t('spaTherapies.cta.startProjectButton')}
              </button>
              <button onClick={() => navigate('/services')} className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 bg-white text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl whitespace-nowrap">
                {t('spaTherapies.cta.viewServicesButton')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
