import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import FAQ from '../components/FAQ'
import { useTranslation } from 'react-i18next'

export default function DigitalMarketing() {
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
          <source src="/63S4.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="absolute inset-0 bg-black/50"></div>
  <div className="relative z-10 px-6 max-w-4xl">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
      <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white whitespace-nowrap">
        {t('mindfulLiving.title')}
      </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
      <p className="mt-6 text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed whitespace-nowrap">
        {t('mindfulLiving.description')}
      </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
      <div className="mt-6 flex gap-4 justify-center">
              <a href="/contact" className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 text-white shadow-lg hover:shadow-xl whitespace-nowrap" style={{ backgroundColor: '#4CAF50' }}>
          {t('mindfulLiving.connectButton')}
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
          {t('mindfulLiving.title')}
        </h1>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-xl leading-relaxed text-justify ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('mindfulLiving.description')}
        </p>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('mindfulLiving.benefits.mindfulBreathing')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('mindfulLiving.benefits.gentleMovement')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('mindfulLiving.benefits.dailyReflection')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('mindfulLiving.benefits.stressReduction')}</span>
                  </div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap">
                    {t('mindfulLiving.connectButton')}
                  </a>
                  <a href="#faq" className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-bold rounded-lg transition-all duration-300 whitespace-nowrap">
                    {t('mindfulLiving.learnMore')}
                  </a>
      </div>
    </ScrollAnimation>
            </div>

            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-2">
              <div className="relative">
                <img src="/images/63S51.jpg" alt="Mindful Living" className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl" />
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
                  {t('mindfulLiving.faq.badge')}
                </span>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <h2 className={isDark ? 'text-3xl md:text-4xl font-extrabold text-white leading-tight' : 'text-3xl md:text-4xl font-extrabold text-black leading-tight'}>
                  {t('mindfulLiving.faq.title')}
                </h2>
              </ScrollAnimation>
              <div className="mt-8">
                <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img src="/images/63S52.jpg" alt="Mindful living practice" className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                    </div>
                  </ScrollAnimation>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  question: t('mindfulLiving.faq.questions.q1.question'),
                  answer: t('mindfulLiving.faq.questions.q1.answer')
                },
                {
                  question: t('mindfulLiving.faq.questions.q2.question'),
                  answer: t('mindfulLiving.faq.questions.q2.answer')
                },
                {
                  question: t('mindfulLiving.faq.questions.q3.question'),
                  answer: t('mindfulLiving.faq.questions.q3.answer')
                },
                {
                  question: t('mindfulLiving.faq.questions.q4.question'),
                  answer: t('mindfulLiving.faq.questions.q4.answer')
                },
                {
                  question: t('mindfulLiving.faq.questions.q5.question'),
                  answer: t('mindfulLiving.faq.questions.q5.answer')
                }
              ].map((faq, index) => (
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
              <h2 className={`${isDark ? 'text-4xl font-extrabold text-white mb-4' : 'text-4xl font-extrabold text-gray-900 mb-4'}`}>{t('mindfulLiving.testimonials.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-base text-gray-300 max-w-2xl mx-auto whitespace-nowrap' : 'text-base text-gray-600 max-w-2xl mx-auto whitespace-nowrap'}`}>{t('mindfulLiving.testimonials.subtitle')}</p>
            </ScrollAnimation>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">SM</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('mindfulLiving.testimonials.member1.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('mindfulLiving.testimonials.member1.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('mindfulLiving.testimonials.member1.content')}"
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">MC</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('mindfulLiving.testimonials.member2.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('mindfulLiving.testimonials.member2.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('mindfulLiving.testimonials.member2.content')}"
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">ER</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('mindfulLiving.testimonials.member3.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('mindfulLiving.testimonials.member3.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('mindfulLiving.testimonials.member3.content')}"
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">JW</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('mindfulLiving.testimonials.member4.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('mindfulLiving.testimonials.member4.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "{t('mindfulLiving.testimonials.member4.content')}"
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Practices */}
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`${isDark ? 'text-3xl font-extrabold text-white mb-4 whitespace-nowrap' : 'text-3xl font-extrabold text-black mb-4 whitespace-nowrap'}`}>{t('mindfulLiving.practices.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-base text-gray-400 max-w-2xl mx-auto whitespace-nowrap' : 'text-base text-black max-w-2xl mx-auto whitespace-nowrap'}`}>{t('mindfulLiving.practices.subtitle')}</p>
            </ScrollAnimation>
            </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
              { name: t('mindfulLiving.practices.breathingExercises'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path><path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path></g></svg> },
              { name: t('mindfulLiving.practices.gentleMovement'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path><path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path></g></svg> },
              { name: t('mindfulLiving.practices.dailyReflection'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path><path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path></g></svg> },
              { name: t('mindfulLiving.practices.mindfulEating'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path><path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path></g></svg> },
              { name: t('mindfulLiving.practices.bodyScan'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path><path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path></g></svg> },
              { name: t('mindfulLiving.practices.gratitudePractice'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path><path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path></g></svg> },
              { name: t('mindfulLiving.practices.walkingMeditation'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path><path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path></g></svg> },
              { name: t('mindfulLiving.practices.stressRelief'), icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path><path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path></g></svg> }
            ].map((practice, index) => {
              const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6', 'scroll-stagger-1', 'scroll-stagger-2', 'scroll-stagger-3', 'scroll-stagger-4']
              const staggerClass = staggerClasses[index] || 'scroll-stagger-3'
        return (
                <ScrollAnimation key={practice.name} animation="fade-in" stagger={staggerClass}>
                  <div className={`${isDark ? 'text-center p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300' : 'text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'}`}>
                    <div className="text-4xl mb-3 flex justify-center item-center">{practice.icon}</div>
                    <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{practice.name}</h3>
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight whitespace-nowrap">{t('mindfulLiving.ctaTitle')}</h2>
    </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-10 whitespace-nowrap">{t('mindfulLiving.ctaDescription')}</p>
    </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
      <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button onClick={() => navigate('/contact')} className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 text-white shadow-lg hover:shadow-xl whitespace-nowrap" style={{ backgroundColor: '#4CAF50' }}>
          {t('mindfulLiving.startProjectButton')}
        </button>
              <button onClick={() => navigate('/services')} className="btn-animate-strong rounded-lg px-6 py-3 font-bold text-base transition-all duration-300 bg-white text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl whitespace-nowrap">
          {t('mindfulLiving.viewServicesButton')}
        </button>
      </div>
    </ScrollAnimation>
  </div>
</section>

      <Footer />
    </div>
  )
}
