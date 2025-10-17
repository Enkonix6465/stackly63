import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import FAQ from '../components/FAQ'
import { useTranslation } from 'react-i18next'

export default function OngoingSupport() {
  const [user, setUser] = useState(null)
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'))
  const [openIndex, setOpenIndex] = useState(0)
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
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/63S6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white whitespace-nowrap">
              {t('wellnessEvents.showcase.title')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="mt-6 text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed whitespace-nowrap">
              {t('wellnessEvents.showcase.subtitle')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="mt-6 flex gap-4 justify-center">
              <a href="/contact" className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 text-white shadow-lg hover:shadow-xl whitespace-nowrap" style={{ backgroundColor: '#4CAF50' }}>
                {t('wellnessEvents.showcase.connectButton')}
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>   

      {/* Hero */}
      <section
        id="hero"
        className={
          'relative overflow-hidden ' +
          (isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900')
        }
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <h1 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('wellnessEvents.hero.title')}
                </h1>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-xl leading-relaxed text-justify ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('wellnessEvents.hero.description')}
                </p>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Group Fitness</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Mindfulness</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Wellness Workshops</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Community Support</span>
                  </div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap">
                    {t('wellnessEvents.showcase.connectButton')}
                  </a>
                  <a href="#faq" className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-bold rounded-lg transition-all duration-300 whitespace-nowrap">
                    Learn More
                  </a>
                </div>
              </ScrollAnimation>
            </div>

            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-2">
              <div className="relative">
                <img src="/images/63S12.jpg" alt="Wellness Events Community" className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={isDark ? 'py-20 bg-green-900' : 'py-20 bg-green-50'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
            <div>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full mb-6 shadow-sm">
                  {t('wellnessEvents.faq.tag')}
                </span>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <h2 className={isDark ? 'text-3xl md:text-4xl font-extrabold text-white leading-tight' : 'text-3xl md:text-4xl font-extrabold text-black leading-tight'}>
                  {t('wellnessEvents.faq.title')}
                </h2>
              </ScrollAnimation>
              <div className="mt-8">
                <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img src="/images/63H2.jpg" alt="Wellness-focused events session" className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
            <div className="space-y-4">
              {t('wellnessEvents.faq.questions', { returnObjects: true }).map((faq, index) => (
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

      {/* Event Types Grid */}
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`${isDark ? 'text-3xl font-extrabold text-white mb-4 whitespace-nowrap' : 'text-3xl font-extrabold text-black mb-4 whitespace-nowrap'}`}>{t('wellnessEvents.eventTypes.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-base text-gray-400 max-w-2xl mx-auto whitespace-nowrap' : 'text-base text-black max-w-2xl mx-auto whitespace-nowrap'}`}>{t('wellnessEvents.eventTypes.subtitle')}</p>
            </ScrollAnimation>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t('wellnessEvents.eventTypes.events', { returnObjects: true }).map((event, index) => {
              const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6', 'scroll-stagger-1', 'scroll-stagger-2', 'scroll-stagger-3', 'scroll-stagger-4']
              const staggerClass = staggerClasses[index] || 'scroll-stagger-3'
              const icons = Array(8).fill(<svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 128 128"><path fill="#ffca28" d="M67.4 36.19s1.12 4.32-3.68 5.44c-4.2.99-5.08-3.25-5.08-3.25s-.93-4.28-2.85-4.7c-.73-.16-.89.02-2.98-.29c-3.57-.54-4.51-2.27-4.81-3.84c-.1-.48-.14-.95-.17-1.36c-.05-.57-.1-1.03-.3-1.29c-.16-.21-2.38-1.06-2.08-2.13c.4-1.42 3.02-2.55 2.91-3.87c.01-.34-.21-1.45-.24-1.6c-.21-1.26-.14-3.02.26-4.76c1.1-4.8 4.23-8.43 9.6-8.94c4.81-.44 10.31 3.14 12.56 7.41c1.44 2.74-.65 9.81-3.11 13.55c-3.2 4.88-.03 9.63-.03 9.63"></path><path fill="#795548" d="M50.48 29.02c-.76.49-1.62.63-2.48.53c-.1-.48-.14-.95-.17-1.36c.68.14 1.54.1 2.05-.07c.94-.32 1.44.38.6.9"></path><ellipse cx={52.17} cy={21.9} fill="#404040" rx={1.76} ry={1.14} transform="rotate(-87.799 52.17 21.9)"></ellipse><path fill="#6d4c41" d="M51.54 19.45c-1.1.36-1.39-.36-1.03-.97c.26-.44.92-.83 2.23-.62c1.23.2 1.76.89 2.1 1.31s.32.85.04.89c-.39.08-1.98-1.05-3.34-.61"></path><path fill="#616161" d="m98.86 82.64l-18.57 3.71l-5.17-17.87l-12.43 8.33l9.06 18.2l.04-.03a6 6 0 0 0 3.49 2.8c.45.14.9.22 1.36.25v.02l.15-.01c.56.03 1.11-.01 1.64-.12l22.92-8.71z"></path><path fill="#325599" d="M102.84 78.83c-.32-.54-1.01-.71-1.55-.39l-2.37 1.42c-1.61.96-2.48 3.69-2.48 3.69l3.52 5.91l4.93 4.28c1.27.99 3.02 1.1 4.41.29l1.07-.63c.47-.28.63-.89.35-1.36z"></path><path fill="#7c7c7c" d="M44.86 113.8L56.27 92s14.21-11.76 15.45-12.59c4.63-3.1 5.55-7.41 5.09-10.54c-.36-2.43-1.97-5.66-1.97-5.66l-18.65 5.56l.88 3.42s-5.71 7.38-7.04 8.92s-3.61 3.69-5.38 9.76c-1.87 6.4-6.56 21.83-6.56 21.83z"></path><path fill="#4568ad" d="M44.85 120.59c.62.1 1.2-.32 1.3-.93l.44-2.73c.31-1.85-1.22-4.27-1.22-4.27l-6.79-1.12l-6.45 1.01c-1.58.34-2.79 1.6-3.06 3.19l-.21 1.23c-.09.54.27 1.05.81 1.14z"></path></svg>)
              return (
                <ScrollAnimation key={event.name} animation="fade-in" stagger={staggerClass}>
                  <div className={`${isDark ? 'text-center p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300' : 'text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'}`}>
                    <div className="text-4xl mb-3 flex justify-center item-center">{icons[index]}</div>
                    <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{event.name}</h3>
                    <p className={`text-sm mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{event.description}</p>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={isDark ? 'py-20 bg-gray-900 text-white transition-colors duration-500' : 'py-20 bg-white text-gray-900 transition-colors duration-500'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`${isDark ? 'text-4xl font-extrabold text-white mb-4' : 'text-4xl font-extrabold text-gray-900 mb-4'}`}>{t('wellnessEvents.testimonials.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-base text-gray-300 max-w-2xl mx-auto whitespace-nowrap' : 'text-base text-gray-600 max-w-2xl mx-auto whitespace-nowrap'}`}>{t('wellnessEvents.testimonials.subtitle')}</p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(t('wellnessEvents.testimonials.participants', { returnObjects: true })).map((participant, index) => (
              <ScrollAnimation key={participant.name} animation="fade-in" stagger={`scroll-stagger-${index + 3}`}>
                <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">{participant.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{participant.name}</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{participant.role}</p>
                    </div>
                  </div>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    "{participant.content}"
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={isDark ? 'relative py-24 bg-gray-900' : 'relative py-24 bg-white'}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url('/images/CTAc.jpg')` }}></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight whitespace-nowrap">{t('wellnessEvents.cta.title')}</h2>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-10 whitespace-nowrap">{t('wellnessEvents.cta.subtitle')}</p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button onClick={() => navigate('/contact')} className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 text-white shadow-lg hover:shadow-xl whitespace-nowrap" style={{ backgroundColor: '#4CAF50' }}>
                {t('wellnessEvents.cta.startProjectButton')}
              </button>
              <button onClick={() => navigate('/services')} className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 bg-white text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl whitespace-nowrap">
                {t('wellnessEvents.cta.viewServicesButton')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
