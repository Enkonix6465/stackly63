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
    <source src="/vedio12.mp4" type="video/mp4" />
          {t('common.videoNotSupported')}
  </video>

        {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              {t('wellnessEvents.showcase.title')}
      </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              {t('wellnessEvents.showcase.subtitle')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-400">
            <button
              onClick={() => navigate('/contact')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
              {t('wellnessEvents.showcase.connectButton')}
            </button>
    </ScrollAnimation>
  </div>
</section>   

      {/* Hero Section */}
      <section className={`py-20 transition-colors duration-500 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}>
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('wellnessEvents.hero.title')}
        </h1>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('wellnessEvents.hero.description')}
                </p>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                    <div className="text-2xl mb-2">🏃‍♀️</div>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Group Fitness</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>High-energy workouts</p>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                    <div className="text-2xl mb-2">🧘‍♀️</div>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Mindfulness</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Stress reduction</p>
      </div>
      </div>
    </ScrollAnimation>
  </div>
            <div className="relative">
              <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-1">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img src="/images/63S6.jpg" alt="Wellness events community" className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
            <div>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-full mb-6 shadow-sm">
                  {t('wellnessEvents.faq.tag')}
                </span>
                  </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <h2 className={isDark ? 'text-4xl md:text-6xl font-bold text-white leading-tight' : 'text-4xl md:text-6xl font-bold text-black leading-tight'}>
                  {t('wellnessEvents.faq.title')}
                </h2>
                  </ScrollAnimation>
              <div className="mt-8">
                <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img src="/images/63H2.jpg" alt="Wellness event session" className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
            <div className="space-y-4">
              {t('wellnessEvents.faq.questions', { returnObjects: true }).map((faq, index) => (
                <ScrollAnimation key={index} animation="slide-in-right" stagger={`scroll-stagger-${index + 1}`}>
                  <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-sm`}>
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                      onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    >
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''} ${isDark ? 'text-gray-300' : 'text-gray-500'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-4">
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {faq.answer}
        </p>
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
      <section className={isDark ? 'py-20 bg-gray-900' : 'py-20 bg-white'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('wellnessEvents.eventTypes.title')}
        </h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('wellnessEvents.eventTypes.subtitle')}
              </p>
            </ScrollAnimation>
      </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t('wellnessEvents.eventTypes.events', { returnObjects: true }).map((event, index) => {
              const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6', 'scroll-stagger-1', 'scroll-stagger-2', 'scroll-stagger-3', 'scroll-stagger-4']
              const staggerClass = staggerClasses[index] || 'scroll-stagger-3'
              const emojis = ['🏃‍♀️', '🧘‍♀️', '🥗', '🧘‍♂️', '💪', '😌', '🏥', '👥']
        return (
                <ScrollAnimation key={event.name} animation="fade-in" stagger={staggerClass}>
                  <div className={`${isDark ? 'text-center p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300' : 'text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'}`}>
                    <div className="text-4xl mb-3 flex justify-center item-center">{emojis[index]}</div>
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
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('wellnessEvents.testimonials.title')}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
              <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('wellnessEvents.testimonials.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.values(t('wellnessEvents.testimonials.participants', { returnObjects: true })).map((participant, index) => (
              <ScrollAnimation key={participant.name} animation="fade-in-up" stagger={`scroll-stagger-${index + 1}`}>
                <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {participant.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{participant.name}</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{participant.role}</p>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
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
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
    {/* Heading */}
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true}>
      <h2 className="text-5xl font-extrabold mb-6 leading-tight text-white">
              {t('wellnessEvents.cta.title')}
      </h2>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-200">
      <p className="text-lg max-w-2xl mx-auto mb-10 text-white">
              {t('wellnessEvents.cta.subtitle')}
      </p>
    </ScrollAnimation>

    {/* Buttons */}
    <ScrollAnimation animation="fade-in-up" threshold={0.2} triggerOnce={true} stagger="delay-400">
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <button
          onClick={() => navigate('/contact')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg hover:shadow-xl"
        >
                {t('wellnessEvents.cta.startProjectButton')}
        </button>
        <button
          onClick={() => navigate('/services')}
          className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-indigo-600 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white shadow-lg hover:shadow-xl"
        >
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
