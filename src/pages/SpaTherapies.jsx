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
              { name: t('spaTherapies.services.deepTissueMassage'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#63453b" d="M95.65 107.76s4.3-11.18 7.29-43.34c3.2-34.44-17.17-51.95-36.15-53.02c-18.97-1.07-43.08 11.66-40.31 54.25c1.46 22.37 4.04 36.54 7.73 45.91c12.94.23 31.3.23 31.3.23l30.12-4.03z"></path><path fill="#f09d02" d="m52.57 93.45l-.23 8.41s-.79 8.96 11.72 8.96s11.95-8.3 11.95-8.3l-.23-10.18l-23.22 1.11z"></path><path fill="#583ee2" d="M14.59 123.58c-.36-.49.24-5.23 4.74-9.79c3.59-3.65 10.67-7.1 14.41-8.78c8.42-3.77 18.59-5.89 18.59-5.89s1.76 7.63 12.49 7.82c11.74.21 11.19-8.15 11.19-8.15s22.42 3.44 31.91 12.64c4.54 4.4 5.84 9.16 5.53 12.16c-.1.96-22.44.2-48.64.47c-26.2.28-50.22-.47-50.22-.48"></path><path fill="#ffca26" d="M20.16 4.98c-.64.72.4 4.96-.13 9.47s-2.12 17.38-.53 24.68s3.72 11.01 4.25 15.53s.93 12.61 2.79 13s5.57-1.46 6.1-6.9s-.93-11.28-.8-15.13s.8-6.1 1.73-6.1s3.98 1.59 7.7 1.46s7.15-2.52 6.1-5.44c-.66-1.86-3.21-.32-6.81-5.5C38.44 27 38.75 24 36.63 18.7c-1.21-3.03-2.65-4.91-2.65-4.91s-.01-6.36-.32-7.55c-.47-1.83-12.42-2.45-13.48-1.26zm77.81.15c-.88.62-.26 6.44-.26 6.44s-2.74 5.12-4.15 9.45s-3.09 8.65-6.27 9.98s-5.39 1.24-6.18 2.3s.18 5.83 6.89 6.36s7.95-2.3 9.09-1.41s.09 18.72 1.5 22.51c1.41 3.8 6 6.36 7.33 5.21s.09-9.18 1.41-17.04c1.16-6.86 2.47-10.51 3.18-15.63s.88-13.86.35-17.3s-1.24-5.39-1.24-5.39s.35-4.41-.09-5.03s-2.56-1.68-5.74-1.68s-4.94.62-5.83 1.24z"></path><path fill="#ffca26" d="M71.31 30.2c-.52 0-5.52 5.64-16.19 11.09c-12.09 6.18-18.73 6.31-18.73 6.31s-2.18 11.61 1.44 26.74c2.21 9.24 11.93 22.16 26.55 22.09c18.9-.09 25.76-14.24 27.57-23.57c2.52-13.04.84-23.15.84-23.15s-8.66-5.18-13.51-10.25s-7.97-9.26-7.97-9.26"></path><path fill="#e59700" d="M64.79 69.55c-3.11.06-4.27-.99-5.37.12c-1.01 1.02-.11 2.48 1.57 3.78c2.28 1.77 5.8 1.71 7.62.07c1.81-1.62 2.59-2.98 1.42-3.98c-1.16-.99-2.07-.06-5.24 0z"></path><path fill="#785446" d="M64.88 78.85c-4.36 0-8.47-1.65-9.45.07s2.34 5.5 9.45 5.55c8.04.06 10.64-4.24 9.62-5.8s-4.6.19-9.62.19z"></path><path fill="#6d4c42" d="M41.54 51.86c.91 1.19 3.54-.9 7.76-1.44c3.46-.44 6.9.84 7.39-1.48c.58-2.75-2.99-3.23-8.11-2.48c-5.24.77-8.27 3.79-7.04 5.4m31.96-1.54c1.74.57 2.96.04 6.54.45c3.34.38 6.33 1.82 7.35.77s-1.78-4.09-7.27-4.88c-4.96-.71-7.18-.5-7.84 1.29c-.4 1.08.51 2.14 1.22 2.37"></path><path fill="#3f4040" d="M42.04 59.69c-.6 1.94 3.57 4.38 7.66 4.38c4.34 0 8.76-2.13 7.43-4.44c-1.03-1.79-3.14.39-7.59.43c-3.86.04-6.75-2.85-7.51-.38zm30.34.19c-1.08 1.55 2.11 4.38 7.23 4.27c5.81-.13 8.05-3.39 6.99-4.65c-1.47-1.74-3.4 1-7.12 1.04s-5.76-2.58-7.1-.66"></path></svg> },
              { name: t('spaTherapies.services.aromatherapy'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#63453b" d="M95.65 107.76s4.3-11.18 7.29-43.34c3.2-34.44-17.17-51.95-36.15-53.02c-18.97-1.07-43.08 11.66-40.31 54.25c1.46 22.37 4.04 36.54 7.73 45.91c12.94.23 31.3.23 31.3.23l30.12-4.03z"></path><path fill="#f09d02" d="m52.57 93.45l-.23 8.41s-.79 8.96 11.72 8.96s11.95-8.3 11.95-8.3l-.23-10.18l-23.22 1.11z"></path><path fill="#583ee2" d="M14.59 123.58c-.36-.49.24-5.23 4.74-9.79c3.59-3.65 10.67-7.1 14.41-8.78c8.42-3.77 18.59-5.89 18.59-5.89s1.76 7.63 12.49 7.82c11.74.21 11.19-8.15 11.19-8.15s22.42 3.44 31.91 12.64c4.54 4.4 5.84 9.16 5.53 12.16c-.1.96-22.44.2-48.64.47c-26.2.28-50.22-.47-50.22-.48"></path><path fill="#ffca26" d="M20.16 4.98c-.64.72.4 4.96-.13 9.47s-2.12 17.38-.53 24.68s3.72 11.01 4.25 15.53s.93 12.61 2.79 13s5.57-1.46 6.1-6.9s-.93-11.28-.8-15.13s.8-6.1 1.73-6.1s3.98 1.59 7.7 1.46s7.15-2.52 6.1-5.44c-.66-1.86-3.21-.32-6.81-5.5C38.44 27 38.75 24 36.63 18.7c-1.21-3.03-2.65-4.91-2.65-4.91s-.01-6.36-.32-7.55c-.47-1.83-12.42-2.45-13.48-1.26zm77.81.15c-.88.62-.26 6.44-.26 6.44s-2.74 5.12-4.15 9.45s-3.09 8.65-6.27 9.98s-5.39 1.24-6.18 2.3s.18 5.83 6.89 6.36s7.95-2.3 9.09-1.41s.09 18.72 1.5 22.51c1.41 3.8 6 6.36 7.33 5.21s.09-9.18 1.41-17.04c1.16-6.86 2.47-10.51 3.18-15.63s.88-13.86.35-17.3s-1.24-5.39-1.24-5.39s.35-4.41-.09-5.03s-2.56-1.68-5.74-1.68s-4.94.62-5.83 1.24z"></path><path fill="#ffca26" d="M71.31 30.2c-.52 0-5.52 5.64-16.19 11.09c-12.09 6.18-18.73 6.31-18.73 6.31s-2.18 11.61 1.44 26.74c2.21 9.24 11.93 22.16 26.55 22.09c18.9-.09 25.76-14.24 27.57-23.57c2.52-13.04.84-23.15.84-23.15s-8.66-5.18-13.51-10.25s-7.97-9.26-7.97-9.26"></path><path fill="#e59700" d="M64.79 69.55c-3.11.06-4.27-.99-5.37.12c-1.01 1.02-.11 2.48 1.57 3.78c2.28 1.77 5.8 1.71 7.62.07c1.81-1.62 2.59-2.98 1.42-3.98c-1.16-.99-2.07-.06-5.24 0z"></path><path fill="#785446" d="M64.88 78.85c-4.36 0-8.47-1.65-9.45.07s2.34 5.5 9.45 5.55c8.04.06 10.64-4.24 9.62-5.8s-4.6.19-9.62.19z"></path><path fill="#6d4c42" d="M41.54 51.86c.91 1.19 3.54-.9 7.76-1.44c3.46-.44 6.9.84 7.39-1.48c.58-2.75-2.99-3.23-8.11-2.48c-5.24.77-8.27 3.79-7.04 5.4m31.96-1.54c1.74.57 2.96.04 6.54.45c3.34.38 6.33 1.82 7.35.77s-1.78-4.09-7.27-4.88c-4.96-.71-7.18-.5-7.84 1.29c-.4 1.08.51 2.14 1.22 2.37"></path><path fill="#3f4040" d="M42.04 59.69c-.6 1.94 3.57 4.38 7.66 4.38c4.34 0 8.76-2.13 7.43-4.44c-1.03-1.79-3.14.39-7.59.43c-3.86.04-6.75-2.85-7.51-.38zm30.34.19c-1.08 1.55 2.11 4.38 7.23 4.27c5.81-.13 8.05-3.39 6.99-4.65c-1.47-1.74-3.4 1-7.12 1.04s-5.76-2.58-7.1-.66"></path></svg> },
              { name: t('spaTherapies.services.hotStoneTherapy'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#63453b" d="M95.65 107.76s4.3-11.18 7.29-43.34c3.2-34.44-17.17-51.95-36.15-53.02c-18.97-1.07-43.08 11.66-40.31 54.25c1.46 22.37 4.04 36.54 7.73 45.91c12.94.23 31.3.23 31.3.23l30.12-4.03z"></path><path fill="#f09d02" d="m52.57 93.45l-.23 8.41s-.79 8.96 11.72 8.96s11.95-8.3 11.95-8.3l-.23-10.18l-23.22 1.11z"></path><path fill="#583ee2" d="M14.59 123.58c-.36-.49.24-5.23 4.74-9.79c3.59-3.65 10.67-7.1 14.41-8.78c8.42-3.77 18.59-5.89 18.59-5.89s1.76 7.63 12.49 7.82c11.74.21 11.19-8.15 11.19-8.15s22.42 3.44 31.91 12.64c4.54 4.4 5.84 9.16 5.53 12.16c-.1.96-22.44.2-48.64.47c-26.2.28-50.22-.47-50.22-.48"></path><path fill="#ffca26" d="M20.16 4.98c-.64.72.4 4.96-.13 9.47s-2.12 17.38-.53 24.68s3.72 11.01 4.25 15.53s.93 12.61 2.79 13s5.57-1.46 6.1-6.9s-.93-11.28-.8-15.13s.8-6.1 1.73-6.1s3.98 1.59 7.7 1.46s7.15-2.52 6.1-5.44c-.66-1.86-3.21-.32-6.81-5.5C38.44 27 38.75 24 36.63 18.7c-1.21-3.03-2.65-4.91-2.65-4.91s-.01-6.36-.32-7.55c-.47-1.83-12.42-2.45-13.48-1.26zm77.81.15c-.88.62-.26 6.44-.26 6.44s-2.74 5.12-4.15 9.45s-3.09 8.65-6.27 9.98s-5.39 1.24-6.18 2.3s.18 5.83 6.89 6.36s7.95-2.3 9.09-1.41s.09 18.72 1.5 22.51c1.41 3.8 6 6.36 7.33 5.21s.09-9.18 1.41-17.04c1.16-6.86 2.47-10.51 3.18-15.63s.88-13.86.35-17.3s-1.24-5.39-1.24-5.39s.35-4.41-.09-5.03s-2.56-1.68-5.74-1.68s-4.94.62-5.83 1.24z"></path><path fill="#ffca26" d="M71.31 30.2c-.52 0-5.52 5.64-16.19 11.09c-12.09 6.18-18.73 6.31-18.73 6.31s-2.18 11.61 1.44 26.74c2.21 9.24 11.93 22.16 26.55 22.09c18.9-.09 25.76-14.24 27.57-23.57c2.52-13.04.84-23.15.84-23.15s-8.66-5.18-13.51-10.25s-7.97-9.26-7.97-9.26"></path><path fill="#e59700" d="M64.79 69.55c-3.11.06-4.27-.99-5.37.12c-1.01 1.02-.11 2.48 1.57 3.78c2.28 1.77 5.8 1.71 7.62.07c1.81-1.62 2.59-2.98 1.42-3.98c-1.16-.99-2.07-.06-5.24 0z"></path><path fill="#785446" d="M64.88 78.85c-4.36 0-8.47-1.65-9.45.07s2.34 5.5 9.45 5.55c8.04.06 10.64-4.24 9.62-5.8s-4.6.19-9.62.19z"></path><path fill="#6d4c42" d="M41.54 51.86c.91 1.19 3.54-.9 7.76-1.44c3.46-.44 6.9.84 7.39-1.48c.58-2.75-2.99-3.23-8.11-2.48c-5.24.77-8.27 3.79-7.04 5.4m31.96-1.54c1.74.57 2.96.04 6.54.45c3.34.38 6.33 1.82 7.35.77s-1.78-4.09-7.27-4.88c-4.96-.71-7.18-.5-7.84 1.29c-.4 1.08.51 2.14 1.22 2.37"></path><path fill="#3f4040" d="M42.04 59.69c-.6 1.94 3.57 4.38 7.66 4.38c4.34 0 8.76-2.13 7.43-4.44c-1.03-1.79-3.14.39-7.59.43c-3.86.04-6.75-2.85-7.51-.38zm30.34.19c-1.08 1.55 2.11 4.38 7.23 4.27c5.81-.13 8.05-3.39 6.99-4.65c-1.47-1.74-3.4 1-7.12 1.04s-5.76-2.58-7.1-.66"></path></svg> },
              { name: t('spaTherapies.services.facialTreatments'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#63453b" d="M95.65 107.76s4.3-11.18 7.29-43.34c3.2-34.44-17.17-51.95-36.15-53.02c-18.97-1.07-43.08 11.66-40.31 54.25c1.46 22.37 4.04 36.54 7.73 45.91c12.94.23 31.3.23 31.3.23l30.12-4.03z"></path><path fill="#f09d02" d="m52.57 93.45l-.23 8.41s-.79 8.96 11.72 8.96s11.95-8.3 11.95-8.3l-.23-10.18l-23.22 1.11z"></path><path fill="#583ee2" d="M14.59 123.58c-.36-.49.24-5.23 4.74-9.79c3.59-3.65 10.67-7.1 14.41-8.78c8.42-3.77 18.59-5.89 18.59-5.89s1.76 7.63 12.49 7.82c11.74.21 11.19-8.15 11.19-8.15s22.42 3.44 31.91 12.64c4.54 4.4 5.84 9.16 5.53 12.16c-.1.96-22.44.2-48.64.47c-26.2.28-50.22-.47-50.22-.48"></path><path fill="#ffca26" d="M20.16 4.98c-.64.72.4 4.96-.13 9.47s-2.12 17.38-.53 24.68s3.72 11.01 4.25 15.53s.93 12.61 2.79 13s5.57-1.46 6.1-6.9s-.93-11.28-.8-15.13s.8-6.1 1.73-6.1s3.98 1.59 7.7 1.46s7.15-2.52 6.1-5.44c-.66-1.86-3.21-.32-6.81-5.5C38.44 27 38.75 24 36.63 18.7c-1.21-3.03-2.65-4.91-2.65-4.91s-.01-6.36-.32-7.55c-.47-1.83-12.42-2.45-13.48-1.26zm77.81.15c-.88.62-.26 6.44-.26 6.44s-2.74 5.12-4.15 9.45s-3.09 8.65-6.27 9.98s-5.39 1.24-6.18 2.3s.18 5.83 6.89 6.36s7.95-2.3 9.09-1.41s.09 18.72 1.5 22.51c1.41 3.8 6 6.36 7.33 5.21s.09-9.18 1.41-17.04c1.16-6.86 2.47-10.51 3.18-15.63s.88-13.86.35-17.3s-1.24-5.39-1.24-5.39s.35-4.41-.09-5.03s-2.56-1.68-5.74-1.68s-4.94.62-5.83 1.24z"></path><path fill="#ffca26" d="M71.31 30.2c-.52 0-5.52 5.64-16.19 11.09c-12.09 6.18-18.73 6.31-18.73 6.31s-2.18 11.61 1.44 26.74c2.21 9.24 11.93 22.16 26.55 22.09c18.9-.09 25.76-14.24 27.57-23.57c2.52-13.04.84-23.15.84-23.15s-8.66-5.18-13.51-10.25s-7.97-9.26-7.97-9.26"></path><path fill="#e59700" d="M64.79 69.55c-3.11.06-4.27-.99-5.37.12c-1.01 1.02-.11 2.48 1.57 3.78c2.28 1.77 5.8 1.71 7.62.07c1.81-1.62 2.59-2.98 1.42-3.98c-1.16-.99-2.07-.06-5.24 0z"></path><path fill="#785446" d="M64.88 78.85c-4.36 0-8.47-1.65-9.45.07s2.34 5.5 9.45 5.55c8.04.06 10.64-4.24 9.62-5.8s-4.6.19-9.62.19z"></path><path fill="#6d4c42" d="M41.54 51.86c.91 1.19 3.54-.9 7.76-1.44c3.46-.44 6.9.84 7.39-1.48c.58-2.75-2.99-3.23-8.11-2.48c-5.24.77-8.27 3.79-7.04 5.4m31.96-1.54c1.74.57 2.96.04 6.54.45c3.34.38 6.33 1.82 7.35.77s-1.78-4.09-7.27-4.88c-4.96-.71-7.18-.5-7.84 1.29c-.4 1.08.51 2.14 1.22 2.37"></path><path fill="#3f4040" d="M42.04 59.69c-.6 1.94 3.57 4.38 7.66 4.38c4.34 0 8.76-2.13 7.43-4.44c-1.03-1.79-3.14.39-7.59.43c-3.86.04-6.75-2.85-7.51-.38zm30.34.19c-1.08 1.55 2.11 4.38 7.23 4.27c5.81-.13 8.05-3.39 6.99-4.65c-1.47-1.74-3.4 1-7.12 1.04s-5.76-2.58-7.1-.66"></path></svg> },
              { name: t('spaTherapies.services.bodyWraps'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#63453b" d="M95.65 107.76s4.3-11.18 7.29-43.34c3.2-34.44-17.17-51.95-36.15-53.02c-18.97-1.07-43.08 11.66-40.31 54.25c1.46 22.37 4.04 36.54 7.73 45.91c12.94.23 31.3.23 31.3.23l30.12-4.03z"></path><path fill="#f09d02" d="m52.57 93.45l-.23 8.41s-.79 8.96 11.72 8.96s11.95-8.3 11.95-8.3l-.23-10.18l-23.22 1.11z"></path><path fill="#583ee2" d="M14.59 123.58c-.36-.49.24-5.23 4.74-9.79c3.59-3.65 10.67-7.1 14.41-8.78c8.42-3.77 18.59-5.89 18.59-5.89s1.76 7.63 12.49 7.82c11.74.21 11.19-8.15 11.19-8.15s22.42 3.44 31.91 12.64c4.54 4.4 5.84 9.16 5.53 12.16c-.1.96-22.44.2-48.64.47c-26.2.28-50.22-.47-50.22-.48"></path><path fill="#ffca26" d="M20.16 4.98c-.64.72.4 4.96-.13 9.47s-2.12 17.38-.53 24.68s3.72 11.01 4.25 15.53s.93 12.61 2.79 13s5.57-1.46 6.1-6.9s-.93-11.28-.8-15.13s.8-6.1 1.73-6.1s3.98 1.59 7.7 1.46s7.15-2.52 6.1-5.44c-.66-1.86-3.21-.32-6.81-5.5C38.44 27 38.75 24 36.63 18.7c-1.21-3.03-2.65-4.91-2.65-4.91s-.01-6.36-.32-7.55c-.47-1.83-12.42-2.45-13.48-1.26zm77.81.15c-.88.62-.26 6.44-.26 6.44s-2.74 5.12-4.15 9.45s-3.09 8.65-6.27 9.98s-5.39 1.24-6.18 2.3s.18 5.83 6.89 6.36s7.95-2.3 9.09-1.41s.09 18.72 1.5 22.51c1.41 3.8 6 6.36 7.33 5.21s.09-9.18 1.41-17.04c1.16-6.86 2.47-10.51 3.18-15.63s.88-13.86.35-17.3s-1.24-5.39-1.24-5.39s.35-4.41-.09-5.03s-2.56-1.68-5.74-1.68s-4.94.62-5.83 1.24z"></path><path fill="#ffca26" d="M71.31 30.2c-.52 0-5.52 5.64-16.19 11.09c-12.09 6.18-18.73 6.31-18.73 6.31s-2.18 11.61 1.44 26.74c2.21 9.24 11.93 22.16 26.55 22.09c18.9-.09 25.76-14.24 27.57-23.57c2.52-13.04.84-23.15.84-23.15s-8.66-5.18-13.51-10.25s-7.97-9.26-7.97-9.26"></path><path fill="#e59700" d="M64.79 69.55c-3.11.06-4.27-.99-5.37.12c-1.01 1.02-.11 2.48 1.57 3.78c2.28 1.77 5.8 1.71 7.62.07c1.81-1.62 2.59-2.98 1.42-3.98c-1.16-.99-2.07-.06-5.24 0z"></path><path fill="#785446" d="M64.88 78.85c-4.36 0-8.47-1.65-9.45.07s2.34 5.5 9.45 5.55c8.04.06 10.64-4.24 9.62-5.8s-4.6.19-9.62.19z"></path><path fill="#6d4c42" d="M41.54 51.86c.91 1.19 3.54-.9 7.76-1.44c3.46-.44 6.9.84 7.39-1.48c.58-2.75-2.99-3.23-8.11-2.48c-5.24.77-8.27 3.79-7.04 5.4m31.96-1.54c1.74.57 2.96.04 6.54.45c3.34.38 6.33 1.82 7.35.77s-1.78-4.09-7.27-4.88c-4.96-.71-7.18-.5-7.84 1.29c-.4 1.08.51 2.14 1.22 2.37"></path><path fill="#3f4040" d="M42.04 59.69c-.6 1.94 3.57 4.38 7.66 4.38c4.34 0 8.76-2.13 7.43-4.44c-1.03-1.79-3.14.39-7.59.43c-3.86.04-6.75-2.85-7.51-.38zm30.34.19c-1.08 1.55 2.11 4.38 7.23 4.27c5.81-.13 8.05-3.39 6.99-4.65c-1.47-1.74-3.4 1-7.12 1.04s-5.76-2.58-7.1-.66"></path></svg> },
              { name: t('spaTherapies.services.reflexology'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#63453b" d="M95.65 107.76s4.3-11.18 7.29-43.34c3.2-34.44-17.17-51.95-36.15-53.02c-18.97-1.07-43.08 11.66-40.31 54.25c1.46 22.37 4.04 36.54 7.73 45.91c12.94.23 31.3.23 31.3.23l30.12-4.03z"></path><path fill="#f09d02" d="m52.57 93.45l-.23 8.41s-.79 8.96 11.72 8.96s11.95-8.3 11.95-8.3l-.23-10.18l-23.22 1.11z"></path><path fill="#583ee2" d="M14.59 123.58c-.36-.49.24-5.23 4.74-9.79c3.59-3.65 10.67-7.1 14.41-8.78c8.42-3.77 18.59-5.89 18.59-5.89s1.76 7.63 12.49 7.82c11.74.21 11.19-8.15 11.19-8.15s22.42 3.44 31.91 12.64c4.54 4.4 5.84 9.16 5.53 12.16c-.1.96-22.44.2-48.64.47c-26.2.28-50.22-.47-50.22-.48"></path><path fill="#ffca26" d="M20.16 4.98c-.64.72.4 4.96-.13 9.47s-2.12 17.38-.53 24.68s3.72 11.01 4.25 15.53s.93 12.61 2.79 13s5.57-1.46 6.1-6.9s-.93-11.28-.8-15.13s.8-6.1 1.73-6.1s3.98 1.59 7.7 1.46s7.15-2.52 6.1-5.44c-.66-1.86-3.21-.32-6.81-5.5C38.44 27 38.75 24 36.63 18.7c-1.21-3.03-2.65-4.91-2.65-4.91s-.01-6.36-.32-7.55c-.47-1.83-12.42-2.45-13.48-1.26zm77.81.15c-.88.62-.26 6.44-.26 6.44s-2.74 5.12-4.15 9.45s-3.09 8.65-6.27 9.98s-5.39 1.24-6.18 2.3s.18 5.83 6.89 6.36s7.95-2.3 9.09-1.41s.09 18.72 1.5 22.51c1.41 3.8 6 6.36 7.33 5.21s.09-9.18 1.41-17.04c1.16-6.86 2.47-10.51 3.18-15.63s.88-13.86.35-17.3s-1.24-5.39-1.24-5.39s.35-4.41-.09-5.03s-2.56-1.68-5.74-1.68s-4.94.62-5.83 1.24z"></path><path fill="#ffca26" d="M71.31 30.2c-.52 0-5.52 5.64-16.19 11.09c-12.09 6.18-18.73 6.31-18.73 6.31s-2.18 11.61 1.44 26.74c2.21 9.24 11.93 22.16 26.55 22.09c18.9-.09 25.76-14.24 27.57-23.57c2.52-13.04.84-23.15.84-23.15s-8.66-5.18-13.51-10.25s-7.97-9.26-7.97-9.26"></path><path fill="#e59700" d="M64.79 69.55c-3.11.06-4.27-.99-5.37.12c-1.01 1.02-.11 2.48 1.57 3.78c2.28 1.77 5.8 1.71 7.62.07c1.81-1.62 2.59-2.98 1.42-3.98c-1.16-.99-2.07-.06-5.24 0z"></path><path fill="#785446" d="M64.88 78.85c-4.36 0-8.47-1.65-9.45.07s2.34 5.5 9.45 5.55c8.04.06 10.64-4.24 9.62-5.8s-4.6.19-9.62.19z"></path><path fill="#6d4c42" d="M41.54 51.86c.91 1.19 3.54-.9 7.76-1.44c3.46-.44 6.9.84 7.39-1.48c.58-2.75-2.99-3.23-8.11-2.48c-5.24.77-8.27 3.79-7.04 5.4m31.96-1.54c1.74.57 2.96.04 6.54.45c3.34.38 6.33 1.82 7.35.77s-1.78-4.09-7.27-4.88c-4.96-.71-7.18-.5-7.84 1.29c-.4 1.08.51 2.14 1.22 2.37"></path><path fill="#3f4040" d="M42.04 59.69c-.6 1.94 3.57 4.38 7.66 4.38c4.34 0 8.76-2.13 7.43-4.44c-1.03-1.79-3.14.39-7.59.43c-3.86.04-6.75-2.85-7.51-.38zm30.34.19c-1.08 1.55 2.11 4.38 7.23 4.27c5.81-.13 8.05-3.39 6.99-4.65c-1.47-1.74-3.4 1-7.12 1.04s-5.76-2.58-7.1-.66"></path></svg> },
              { name: t('spaTherapies.services.couplesMassage'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#63453b" d="M95.65 107.76s4.3-11.18 7.29-43.34c3.2-34.44-17.17-51.95-36.15-53.02c-18.97-1.07-43.08 11.66-40.31 54.25c1.46 22.37 4.04 36.54 7.73 45.91c12.94.23 31.3.23 31.3.23l30.12-4.03z"></path><path fill="#f09d02" d="m52.57 93.45l-.23 8.41s-.79 8.96 11.72 8.96s11.95-8.3 11.95-8.3l-.23-10.18l-23.22 1.11z"></path><path fill="#583ee2" d="M14.59 123.58c-.36-.49.24-5.23 4.74-9.79c3.59-3.65 10.67-7.1 14.41-8.78c8.42-3.77 18.59-5.89 18.59-5.89s1.76 7.63 12.49 7.82c11.74.21 11.19-8.15 11.19-8.15s22.42 3.44 31.91 12.64c4.54 4.4 5.84 9.16 5.53 12.16c-.1.96-22.44.2-48.64.47c-26.2.28-50.22-.47-50.22-.48"></path><path fill="#ffca26" d="M20.16 4.98c-.64.72.4 4.96-.13 9.47s-2.12 17.38-.53 24.68s3.72 11.01 4.25 15.53s.93 12.61 2.79 13s5.57-1.46 6.1-6.9s-.93-11.28-.8-15.13s.8-6.1 1.73-6.1s3.98 1.59 7.7 1.46s7.15-2.52 6.1-5.44c-.66-1.86-3.21-.32-6.81-5.5C38.44 27 38.75 24 36.63 18.7c-1.21-3.03-2.65-4.91-2.65-4.91s-.01-6.36-.32-7.55c-.47-1.83-12.42-2.45-13.48-1.26zm77.81.15c-.88.62-.26 6.44-.26 6.44s-2.74 5.12-4.15 9.45s-3.09 8.65-6.27 9.98s-5.39 1.24-6.18 2.3s.18 5.83 6.89 6.36s7.95-2.3 9.09-1.41s.09 18.72 1.5 22.51c1.41 3.8 6 6.36 7.33 5.21s.09-9.18 1.41-17.04c1.16-6.86 2.47-10.51 3.18-15.63s.88-13.86.35-17.3s-1.24-5.39-1.24-5.39s.35-4.41-.09-5.03s-2.56-1.68-5.74-1.68s-4.94.62-5.83 1.24z"></path><path fill="#ffca26" d="M71.31 30.2c-.52 0-5.52 5.64-16.19 11.09c-12.09 6.18-18.73 6.31-18.73 6.31s-2.18 11.61 1.44 26.74c2.21 9.24 11.93 22.16 26.55 22.09c18.9-.09 25.76-14.24 27.57-23.57c2.52-13.04.84-23.15.84-23.15s-8.66-5.18-13.51-10.25s-7.97-9.26-7.97-9.26"></path><path fill="#e59700" d="M64.79 69.55c-3.11.06-4.27-.99-5.37.12c-1.01 1.02-.11 2.48 1.57 3.78c2.28 1.77 5.8 1.71 7.62.07c1.81-1.62 2.59-2.98 1.42-3.98c-1.16-.99-2.07-.06-5.24 0z"></path><path fill="#785446" d="M64.88 78.85c-4.36 0-8.47-1.65-9.45.07s2.34 5.5 9.45 5.55c8.04.06 10.64-4.24 9.62-5.8s-4.6.19-9.62.19z"></path><path fill="#6d4c42" d="M41.54 51.86c.91 1.19 3.54-.9 7.76-1.44c3.46-.44 6.9.84 7.39-1.48c.58-2.75-2.99-3.23-8.11-2.48c-5.24.77-8.27 3.79-7.04 5.4m31.96-1.54c1.74.57 2.96.04 6.54.45c3.34.38 6.33 1.82 7.35.77s-1.78-4.09-7.27-4.88c-4.96-.71-7.18-.5-7.84 1.29c-.4 1.08.51 2.14 1.22 2.37"></path><path fill="#3f4040" d="M42.04 59.69c-.6 1.94 3.57 4.38 7.66 4.38c4.34 0 8.76-2.13 7.43-4.44c-1.03-1.79-3.14.39-7.59.43c-3.86.04-6.75-2.85-7.51-.38zm30.34.19c-1.08 1.55 2.11 4.38 7.23 4.27c5.81-.13 8.05-3.39 6.99-4.65c-1.47-1.74-3.4 1-7.12 1.04s-5.76-2.58-7.1-.66"></path></svg> },
              { name: t('spaTherapies.services.wellnessPackages'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 128 128"><path fill="#63453b" d="M95.65 107.76s4.3-11.18 7.29-43.34c3.2-34.44-17.17-51.95-36.15-53.02c-18.97-1.07-43.08 11.66-40.31 54.25c1.46 22.37 4.04 36.54 7.73 45.91c12.94.23 31.3.23 31.3.23l30.12-4.03z"></path><path fill="#f09d02" d="m52.57 93.45l-.23 8.41s-.79 8.96 11.72 8.96s11.95-8.3 11.95-8.3l-.23-10.18l-23.22 1.11z"></path><path fill="#583ee2" d="M14.59 123.58c-.36-.49.24-5.23 4.74-9.79c3.59-3.65 10.67-7.1 14.41-8.78c8.42-3.77 18.59-5.89 18.59-5.89s1.76 7.63 12.49 7.82c11.74.21 11.19-8.15 11.19-8.15s22.42 3.44 31.91 12.64c4.54 4.4 5.84 9.16 5.53 12.16c-.1.96-22.44.2-48.64.47c-26.2.28-50.22-.47-50.22-.48"></path><path fill="#ffca26" d="M20.16 4.98c-.64.72.4 4.96-.13 9.47s-2.12 17.38-.53 24.68s3.72 11.01 4.25 15.53s.93 12.61 2.79 13s5.57-1.46 6.1-6.9s-.93-11.28-.8-15.13s.8-6.1 1.73-6.1s3.98 1.59 7.7 1.46s7.15-2.52 6.1-5.44c-.66-1.86-3.21-.32-6.81-5.5C38.44 27 38.75 24 36.63 18.7c-1.21-3.03-2.65-4.91-2.65-4.91s-.01-6.36-.32-7.55c-.47-1.83-12.42-2.45-13.48-1.26zm77.81.15c-.88.62-.26 6.44-.26 6.44s-2.74 5.12-4.15 9.45s-3.09 8.65-6.27 9.98s-5.39 1.24-6.18 2.3s.18 5.83 6.89 6.36s7.95-2.3 9.09-1.41s.09 18.72 1.5 22.51c1.41 3.8 6 6.36 7.33 5.21s.09-9.18 1.41-17.04c1.16-6.86 2.47-10.51 3.18-15.63s.88-13.86.35-17.3s-1.24-5.39-1.24-5.39s.35-4.41-.09-5.03s-2.56-1.68-5.74-1.68s-4.94.62-5.83 1.24z"></path><path fill="#ffca26" d="M71.31 30.2c-.52 0-5.52 5.64-16.19 11.09c-12.09 6.18-18.73 6.31-18.73 6.31s-2.18 11.61 1.44 26.74c2.21 9.24 11.93 22.16 26.55 22.09c18.9-.09 25.76-14.24 27.57-23.57c2.52-13.04.84-23.15.84-23.15s-8.66-5.18-13.51-10.25s-7.97-9.26-7.97-9.26"></path><path fill="#e59700" d="M64.79 69.55c-3.11.06-4.27-.99-5.37.12c-1.01 1.02-.11 2.48 1.57 3.78c2.28 1.77 5.8 1.71 7.62.07c1.81-1.62 2.59-2.98 1.42-3.98c-1.16-.99-2.07-.06-5.24 0z"></path><path fill="#785446" d="M64.88 78.85c-4.36 0-8.47-1.65-9.45.07s2.34 5.5 9.45 5.55c8.04.06 10.64-4.24 9.62-5.8s-4.6.19-9.62.19z"></path><path fill="#6d4c42" d="M41.54 51.86c.91 1.19 3.54-.9 7.76-1.44c3.46-.44 6.9.84 7.39-1.48c.58-2.75-2.99-3.23-8.11-2.48c-5.24.77-8.27 3.79-7.04 5.4m31.96-1.54c1.74.57 2.96.04 6.54.45c3.34.38 6.33 1.82 7.35.77s-1.78-4.09-7.27-4.88c-4.96-.71-7.18-.5-7.84 1.29c-.4 1.08.51 2.14 1.22 2.37"></path><path fill="#3f4040" d="M42.04 59.69c-.6 1.94 3.57 4.38 7.66 4.38c4.34 0 8.76-2.13 7.43-4.44c-1.03-1.79-3.14.39-7.59.43c-3.86.04-6.75-2.85-7.51-.38zm30.34.19c-1.08 1.55 2.11 4.38 7.23 4.27c5.81-.13 8.05-3.39 6.99-4.65c-1.47-1.74-3.4 1-7.12 1.04s-5.76-2.58-7.1-.66"></path></svg> }
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
