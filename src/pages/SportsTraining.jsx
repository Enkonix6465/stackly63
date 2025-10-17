import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function SportsTraining() {
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
          <source src="/63S1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white whitespace-nowrap">
              {t('sportsTraining.showcase.title')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="mt-6 text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed whitespace-nowrap">
              {t('sportsTraining.showcase.subtitle')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="mt-6 flex gap-4 justify-center">
              <a href="/contact" className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 text-white shadow-lg hover:shadow-xl whitespace-nowrap" style={{ backgroundColor: '#4CAF50' }}>
                {t('sportsTraining.showcase.startButton')}
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
                  {t('sportsTraining.hero.title')}
                </h1>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-xl leading-relaxed text-justify ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('sportsTraining.hero.description')}
                </p>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('sportsTraining.hero.benefits.physicalHealth')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('sportsTraining.hero.benefits.mentalWellness')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('sportsTraining.hero.benefits.healthyHabits')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('sportsTraining.hero.benefits.overallWellbeing')}</span>
                  </div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap">
                    {t('sportsTraining.hero.getStartedButton')}
                  </a>
                  <a href="#faq" className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-bold rounded-lg transition-all duration-300 whitespace-nowrap">
                    {t('sportsTraining.hero.learnMoreButton')}
                  </a>
                </div>
              </ScrollAnimation>
            </div>

            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-2">
              <div className="relative">
                <img src="/images/63S12.jpg" alt="Health and Wellness Through Sports Training" className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl" />
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
                  {t('sportsTraining.faq.badge')}
                </span>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <h2 className={isDark ? 'text-3xl md:text-4xl font-extrabold text-white leading-tight' : 'text-3xl md:text-4xl font-extrabold text-black leading-tight'}>
                  {t('sportsTraining.faq.title')}
                </h2>
              </ScrollAnimation>
              <div className="mt-8">
                <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img src="/images/63H2.jpg" alt="Wellness-focused sports training session" className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
            <div className="space-y-4">
              {t('sportsTraining.faq.questions', { returnObjects: true }).map((faq, index) => (
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

      {/* Testimonials */}
      <section className={isDark ? 'py-20 bg-gray-900 text-white transition-colors duration-500' : 'py-20 bg-white text-gray-900 transition-colors duration-500'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`${isDark ? 'text-4xl font-extrabold text-white mb-4' : 'text-4xl font-extrabold text-gray-900 mb-4'}`}>{t('sportsTraining.testimonials.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-base text-gray-300 max-w-2xl mx-auto whitespace-nowrap' : 'text-base text-gray-600 max-w-2xl mx-auto whitespace-nowrap'}`}>{t('sportsTraining.testimonials.subtitle')}</p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">MT</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('sportsTraining.testimonials.clients.athlete1.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('sportsTraining.testimonials.clients.athlete1.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('sportsTraining.testimonials.clients.athlete1.content')}"
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">SC</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('sportsTraining.testimonials.clients.athlete2.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('sportsTraining.testimonials.clients.athlete2.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('sportsTraining.testimonials.clients.athlete2.content')}"
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">DR</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('sportsTraining.testimonials.clients.athlete3.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('sportsTraining.testimonials.clients.athlete3.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('sportsTraining.testimonials.clients.athlete3.content')}"
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">EW</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('sportsTraining.testimonials.clients.athlete4.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('sportsTraining.testimonials.clients.athlete4.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('sportsTraining.testimonials.clients.athlete4.content')}"
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Wellness Programs */}
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`${isDark ? 'text-3xl font-extrabold text-white mb-4 whitespace-nowrap' : 'text-3xl font-extrabold text-black mb-4 whitespace-nowrap'}`}>{t('sportsTraining.programs.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-base text-gray-400 max-w-2xl mx-auto whitespace-nowrap' : 'text-base text-black max-w-2xl mx-auto whitespace-nowrap'}`}>{t('sportsTraining.programs.subtitle')}</p>
            </ScrollAnimation>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t('sportsTraining.programs.list', { returnObjects: true }).map((tech, index) => {
              const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6', 'scroll-stagger-1', 'scroll-stagger-2', 'scroll-stagger-3', 'scroll-stagger-4']
              const staggerClass = staggerClasses[index] || 'scroll-stagger-3'
              return (
                <ScrollAnimation key={tech.name} animation="fade-in" stagger={staggerClass}>
                  <div className={`${isDark ? 'text-center p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300' : 'text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'}`}>
                    <div className="text-4xl mb-3 flex justify-center item-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><g fill="none"><path fill="#533566" d="M11 30v-2.5l-1.898.5s-.53.38-1.917 1.2c-.307.18-.14.8-.14.8zm10.01 0L21 27.5l1.892.5s.36.38 1.92 1.2c.312.16.142.8.142.8z"></path><path fill="#ffc83d" d="M14.5 14.878L12.323 16L7.86 7.013c-.254-.516-.058-.665.44-.924l.244-.06c-.489.25 2.313 1.51 1.552-.029zm3 0L19.677 16l4.462-8.987c.254-.516.058-.665-.44-.924l-.244-.06c.489.25-2.313 1.51-1.552-.029z"></path><path fill="#ff6723" d="M21.155 13.483a.253.253 0 0 0-.112-.324L18.5 11.8L18 14l.04.07a3.84 3.84 0 0 0-2.04-.6c-.74 0-1.43.22-2.02.59l.03-.06l-.46-2.2l-2.59 1.36a.253.253 0 0 0-.115.325c.293.67 1.155 2.744 1.155 3.865V22h8v-4.65c0-1.122.864-3.198 1.155-3.867"></path><path fill="#f1a11e" d="M13.4 13c.13.09.28.15.45.15l.05.72c.03.21.08.4.17.58c-.4-.16-.67-.55-.67-.99zm4.6 1.43c.08-.17.13-.36.16-.56l.05-.72c.15-.01.3-.06.42-.15v.46c0 .42-.25.8-.63.97"></path><path fill="#fdbb11" d="M14.5 12.82a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m4.5 0a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0"></path><path fill="#ffc83d" d="M16.53 9.28h-1.064c-1.189 0-2.088 1.02-1.952 2.286l.174 2.801c.125.95.918 1.663 1.856 1.663h.909c.938 0 1.73-.713 1.856-1.663l.174-2.8c.155-1.218-.764-2.287-1.953-2.287"></path><path fill="#990839" d="M15.993 14.68c-.24 0-.453-.06-.64-.17c-.062-.04-.134.04-.09.11c.16.27.428.45.739.45c.31 0 .578-.18.738-.45c.035-.07-.027-.15-.09-.11a1.35 1.35 0 0 1-.657.17"></path><path fill="#ed9200" d="m15.82 13.135l-.26.84c-.05.17.08.35.25.35h.38c.18 0 .31-.17.25-.35l-.26-.84c-.04-.18-.3-.18-.36 0"></path><path fill="#fff" d="M14.253 13.19a.644.644 0 0 1 .629-.49c.314 0 .582.222.628.517a.103.103 0 0 1-.102.13h-1.035a.128.128 0 0 1-.12-.157m3.507 0a.644.644 0 0 0-.628-.49a.63.63 0 0 0-.628.517c-.019.074.037.13.101.13h1.035a.128.128 0 0 0 .12-.157"></path><path fill="#7d4533" d="M14.567 13.236c0-.231.185-.416.416-.416c.222 0 .407.185.416.416c0 .037-.01.074-.018.11h-.795a.5.5 0 0 1-.019-.11m2.879 0a.414.414 0 0 0-.416-.416a.426.426 0 0 0-.416.416c0 .037.01.074.019.11h.795a.5.5 0 0 0 .018-.11"></path><path fill="#fff" d="M14.908 13.07a.073.073 0 1 1-.147-.001a.073.073 0 0 1 .147 0m2.075.001a.073.073 0 1 1-.147 0a.073.073 0 0 1 .147 0"></path><path fill="#000" d="M14.974 12.996c.139 0 .24.11.24.24q.002.056-.037.11h-.416a.24.24 0 0 1 .213-.351m2.066.001c-.139 0-.24.11-.24.24c0 .037.009.074.037.11h.415a.24.24 0 0 0-.213-.351"></path><path fill="#d37034" d="M14.322 12.03h.002l.01-.002l.044-.003q.061-.005.167.007a1.1 1.1 0 0 1 .506.194a.137.137 0 0 0 .158-.223a1.37 1.37 0 0 0-.923-.245h-.006l-.001.001h-.002a.137.137 0 0 0 .045.27m3.542-.085a.137.137 0 0 0-.105-.163l-.003-.001l-.005-.001l-.018-.003l-.061-.008a1.4 1.4 0 0 0-.855.21a.137.137 0 0 0 .146.233a1.12 1.12 0 0 1 .683-.17l.055.008a.137.137 0 0 0 .163-.105"></path><path fill="#9b9b9b" d="m23.05 20l-3.12 2h-7.81L9 20l.45 3.17l.55.93c2.26 1.35 3.39 1.9 6.02 1.9s3.72-.7 5.98-2.06l.5-.93z"></path><path fill="#ffc83d" d="m9.14 28l-.46-5.04h2.93L11 28zM21 28l-.53-5.04h2.77L22.86 28z"></path><path fill="#f1a11e" d="M18.853 10.61c-.14-.25-.355-.43-.588-.52c-.26-.1-.484-.28-.633-.53a1.056 1.056 0 0 0-1.36-.47a.68.68 0 0 1-.56 0c-.13-.06-.27-.09-.429-.09c-.391 0-.727.22-.922.54c-.15.26-.373.45-.644.55c-.251.09-.465.28-.605.56c-.177.39-.14.86.084 1.21a.8.8 0 0 1 .125.345a.75.75 0 0 1 .322-.127v-.088c0-.92.699-1.67 1.556-1.67h.597c.13 0 .242.08.289.21c.186.43.587.71 1.034.71h.652c.355.02.634.33.643.71l-.008.136a.75.75 0 0 1 .292.132a.8.8 0 0 1 .127-.358c.214-.36.242-.84.027-1.25"></path><path fill="#9b9b9b" d="M2 6.13A.13.13 0 0 1 2.13 6H3v1h-.87A.13.13 0 0 1 2 6.87zM26 6H6v1h20zm3.87 0a.13.13 0 0 1 .13.13v.74a.13.13 0 0 1-.13.13H29V6z"></path><path fill="#533566" d="M8.515 23h2.96a.533.533 0 0 0 .525-.515V21c0-1.101-.899-2-2-2s-2 .899-2 2v1.485c0 .283.232.515.515.515m11.591 0h2.798a.593.593 0 0 0 .596-.606V21c0-1.101-.9-2-2-2s-2 .899-2 2v1.394c0 .333.273.606.606.606"></path><path fill="#ffc83d" d="M9.75 5.375a.375.375 0 1 0-.75 0V5.5h-.007a.375.375 0 0 0-.736 0H8.23a.375.375 0 0 0-.729.125v.5a.375.375 0 0 0 .729.125h.022a.375.375 0 0 0 .748 0v.125a.375.375 0 1 0 .75 0a.375.375 0 1 0 .75 0v-.75a.375.375 0 0 0-.729-.125H9.75zm12.5 0a.375.375 0 0 1 .75 0V5.5h.008a.375.375 0 0 1 .735 0h.028a.375.375 0 0 1 .729.125v.5a.375.375 0 0 1-.729.125h-.022a.375.375 0 0 1-.748 0L23 6.375a.375.375 0 0 1-.75 0a.375.375 0 0 1-.75 0v-.75a.375.375 0 0 1 .729-.125h.021z"></path><path fill="#f59f00" d="M10.625 7.5a.375.375 0 1 1 0-.75a.375.375 0 0 1 0 .75m10.75 0a.375.375 0 1 0 0-.75a.375.375 0 0 0 0 .75"></path><path fill="#533566" d="M5.9 2a.9.9 0 0 0-.9.9v1.5a.9.9 0 0 0-.9-.9h-.2a.9.9 0 0 0-.9.9v4.2a.9.9 0 0 0 .9.9h.2a.9.9 0 0 0 .9-.9v1.5a.9.9 0 0 0 .9.9h.2a.9.9 0 0 0 .9-.9V2.9a.9.9 0 0 0-.9-.9zm20 0a.9.9 0 0 0-.9.9v7.2a.9.9 0 0 0 .9.9h.2a.9.9 0 0 0 .9-.9V8.6a.9.9 0 0 0 .9.9h.2a.9.9 0 0 0 .9-.9V4.4a.9.9 0 0 0-.9-.9h-.2a.9.9 0 0 0-.9.9V2.9a.9.9 0 0 0-.9-.9z"></path></g></svg>
                    </div>
                    <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{tech.name}</h3>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={isDark ? 'relative py-24 bg-gray-900' : 'relative py-24 bg-white'}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url('/images/CTAc.jpg')` }}></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight whitespace-nowrap">{t('sportsTraining.cta.title')}</h2>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-10 whitespace-nowrap">{t('sportsTraining.cta.subtitle')}</p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button onClick={() => navigate('/contact')} className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 text-white shadow-lg hover:shadow-xl whitespace-nowrap" style={{ backgroundColor: '#4CAF50' }}>
                {t('sportsTraining.cta.getStartedButton')}
              </button>
              <button onClick={() => navigate('/services')} className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 bg-white text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl whitespace-nowrap">
                {t('sportsTraining.cta.viewServicesButton')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
