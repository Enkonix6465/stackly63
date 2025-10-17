import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function NutritionPlans() {
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
          'relative overflow-hidden h-screen flex items-center justify-center text-center '
        }
      >
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/63S4.mp4" type="video/mp4" />
          {t('services.video.notSupported')}
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-6 max-w-4xl">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-4xl font-extrabold leading-tight text-white whitespace-nowrap">
              {t('wellnessServices.nutritionPlans.title')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto whitespace-nowrap">
              {t('wellnessServices.nutritionPlans.description')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="mt-8 flex gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#4CAF50' }}
              >
                {t('nutritionPlansPage.showcase.bookConsultation')}
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
          (isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-emerald-50 via-white to-lime-50 text-gray-900')
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
                <h1 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('nutritionPlansPage.hero.title')}
                </h1>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('nutritionPlansPage.hero.description')}
                </p>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('nutritionPlansPage.hero.benefits.dietPlans')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('nutritionPlansPage.hero.benefits.macroGuidance')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('nutritionPlansPage.hero.benefits.weeklyCheckins')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('nutritionPlansPage.hero.benefits.habitBuilding')}</span>
                  </div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/contact" 
                    className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: '#4CAF50' }}
                  >
                    {t('nutritionPlansPage.hero.startPlanButton')}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a 
                    href="#faq" 
                    className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl"
                  >
                    {t('nutritionPlansPage.hero.learnMoreButton')}
                  </a>
                </div>
              </ScrollAnimation>
            </div>

            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-2">
              <div className="relative">
                <img src="/images/63S4.jpg" alt="Nutrition Plans" className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* FAQ-like accordion with nutrition questions */}
      <section className={isDark ? 'py-20 bg-green-900' : 'py-20 bg-green-50'} id="faq">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
            <div>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white rounded-full mb-6 shadow-sm" style={{ backgroundColor: '#4CAF50' }}>
                  {t('nutritionPlansPage.faq.badge')}
                </span>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('nutritionPlansPage.faq.title')}
                </h2>
              </ScrollAnimation>
              <div className="mt-8">
                <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img src="/images/nutrition-plans.jpg" alt="Healthy meal preparation" className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { question: t('nutritionPlansPage.faq.questions.q1.question'), answer: t('nutritionPlansPage.faq.questions.q1.answer') },
                { question: t('nutritionPlansPage.faq.questions.q2.question'), answer: t('nutritionPlansPage.faq.questions.q2.answer') },
                { question: t('nutritionPlansPage.faq.questions.q3.question'), answer: t('nutritionPlansPage.faq.questions.q3.answer') },
                { question: t('nutritionPlansPage.faq.questions.q4.question'), answer: t('nutritionPlansPage.faq.questions.q4.answer') },
                { question: t('nutritionPlansPage.faq.questions.q5.question'), answer: t('nutritionPlansPage.faq.questions.q5.answer') }
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
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('nutritionPlansPage.testimonials.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>{t('nutritionPlansPage.testimonials.subtitle')}</p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#4CAF50' }}>
                    <span className="text-white font-bold text-lg">SP</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('nutritionPlansPage.testimonials.client1.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('nutritionPlansPage.testimonials.client1.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {t('nutritionPlansPage.testimonials.client1.content')}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#4CAF50' }}>
                    <span className="text-white font-bold text-lg">RK</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('nutritionPlansPage.testimonials.client2.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('nutritionPlansPage.testimonials.client2.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {t('nutritionPlansPage.testimonials.client2.content')}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#4CAF50' }}>
                    <span className="text-white font-bold text-lg">MA</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('nutritionPlansPage.testimonials.client3.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('nutritionPlansPage.testimonials.client3.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {t('nutritionPlansPage.testimonials.client3.content')}
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#4CAF50' }}>
                    <span className="text-white font-bold text-lg">DL</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>{t('nutritionPlansPage.testimonials.client4.name')}</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('nutritionPlansPage.testimonials.client4.role')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {t('nutritionPlansPage.testimonials.client4.content')}
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Nutrition Programs */}
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('nutritionPlansPage.programs.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>{t('nutritionPlansPage.programs.subtitle')}</p>
            </ScrollAnimation>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: t('nutritionPlansPage.programs.list.weightLoss') },
              { name: t('nutritionPlansPage.programs.list.muscleBuilding') },
              { name: t('nutritionPlansPage.programs.list.keto') },
              { name: t('nutritionPlansPage.programs.list.diabetic') },
              { name: t('nutritionPlansPage.programs.list.pcos') },
              { name: t('nutritionPlansPage.programs.list.cardiac') },
              { name: t('nutritionPlansPage.programs.list.prenatal') },
              { name: t('nutritionPlansPage.programs.list.fasting') }
            ].map((program, index) => {
              const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6', 'scroll-stagger-1', 'scroll-stagger-2', 'scroll-stagger-3', 'scroll-stagger-4']
              const staggerClass = staggerClasses[index] || 'scroll-stagger-3'
              return (
                <ScrollAnimation key={program.name} animation="fade-in" stagger={staggerClass}>
                  <div className={`${isDark ? 'text-center p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300' : 'text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'}`}>
                    <div className="text-4xl mb-3 flex justify-center item-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 128 128"><path fill="#d5d5d5" d="M63.87 43.71S5.32 49.66 5.56 55.41c.19 4.6-1.1 20.34 12.08 36.44c8.64 10.55 23.78 20.72 48.53 20.72c24.34 0 37.71-11.24 46.04-23.4c10.7-15.64 10.17-30.31 10.17-33.95c-.01-7.29-45.66-14.38-58.51-11.51"></path><path fill="#307d31" d="M66.9 30.59s-3.95-2.59-7.56-2.26c-3.61.34-5.3 2.48-5.3 2.48L42.73 58.95l12.03 13.42l7.85 5.44l15.19-.38l6.71-46.71z"></path><path fill="#58a12f" d="M67.66 37.46s-2.75-4.63-3.08-8.59s2.77-6.24 4.42-6.24c4.04 0 4.5 2.5 6.92 2.28s3.2-2.36 3.85-5.62c.66-3.32 3.51-5.19 6.1-3.54c2.49 1.59 1.61 6.29 1.61 6.29s1.98-2.42 4.19-.66c1.96 1.57 1.32 6.39 1.32 6.39s4.3-4.96 7.93-2.53s.88 10.79.88 10.79l-1.21 7.49l-20.7-7.93s-1.21-2.86-5.62-2.53c-4.4.33-6.61 4.4-6.61 4.4M45.53 57.29s3.7-7.51 11.75-5c8.44 2.63 6.91 10.76 6.91 10.76s2.16-1.58 4.69-1.8s5.62.22 5.62.22l-.4-4.36s-5.37.71-8.63-3.13c-4.38-5.17-1.43-11.12-1.43-11.12l.77-3.74l-7.71-4.96l-5.29-6.83s-1.76-3.85-6.5-4.07s-6.97 3.12-6.97 3.12s-10.15-2.93-15.33 1.47c-3.5 2.98-2.59 7.86-2.59 7.86s-2.46 1.46-6.71-2.11c-1.89-1.59-5.59-.38-6.14 2.6c-.55 2.97.63 6.68.63 6.68l-3.41 2.09l11.56 11.89z"></path><path fill="#86c82c" d="M71.19 54.64s-4.69.27-8.26-8.04c-2.14-4.98-.64-14.64 4.41-13.66c3.96.77 3.41 7.49 6.17 8.04c1.37.27 4.41-6.94 10.9-7.38c5.28-.36 12.22 6.61 12.22 6.61s3.08-2.2 3.41-2.97s.88-3.74 4.3-3.52c3.79.24 3.3 4.41 3.3 4.41s4.52-1.76 7.82-.11c3.55 1.78 3.3 5.18 3.3 5.18s3.19-3.41 5.73-1.65s-4.62 15.81-11.45 22.86s-15.67 6.58-15.67 6.58z"></path><path fill="#d2608c" d="m27.92 32.02l-.83-1.61s2.53-3.27 8.17-2.37c6.19.99 6.81 5.3 6.81 5.3s-3.19 1.21-3.29 1.06s-3.09-3.29-3.09-3.29l-5.92.2z"></path><path fill="#fff" d="M28.51 33.24s2.88-1.36 5.71-.75s3.49 2.88 3.49 2.88l2.63-1.06s-1.66-3.56-5.57-4.25c-4.29-.76-6.93 1.83-6.93 1.83z"></path><path fill="#fe2a19" d="M27.58 37.38s9.2-2.61 12.72-4.35c5.64-2.79 10.54-5.3 11.97-6.26c.76-.51 1.29-1.09 2.31-.88s10.19 18.45-4.76 25.09c-6.05 2.69-12.55 3.6-12.55 3.6l-9.34-7.89z"></path><path fill="#cb1c35" d="M30.77 40.03c-.22.65 4.7 10.02 15.03 6.19c9.72-3.6 6.53-15.1 5.92-15.51c-.4-.26-5.01 2.29-9.99 4.51c-5.2 2.31-10.78 4.29-10.96 4.81"></path><path fill="#ff5f5d" d="M38.15 41.86c1.7.67 3.95-.03 6.22-1.01c2.09-.9 4.67-2.3 4.74-3.81c.07-1.5-3.6-3.18-4.56-3.15c-.95.04-5.23 1.92-5.8 2.83c-.57.92-1.84 4.65-.6 5.14"></path><path fill="#f7ca76" d="M37 41.82c-.96-.25-1.84.7-2.08 1.81c-.31 1.45 1.09 1.76 1.73 1.23c.99-.82 1.26-2.81.35-3.04m5.16.78c-.95.03-1.31 1.55-.98 2.64c.42 1.43 1.85 1.05 2.1.26c.46-1.4-.18-2.93-1.12-2.9m5.13-2.53c-.69.61-.02 1.97.9 2.58c1.2.8 2.03-.36 1.73-1.11c-.53-1.33-1.95-2.07-2.63-1.47m1.84-4.36c.05.89 1.46 1.25 2.45.96c1.3-.38.91-1.73.18-1.98c-1.3-.45-2.68.14-2.63 1.02"></path><path fill="#e9fcae" d="M47.76 59.21c.91-2.46 5.68-6.4 10.72-2.77c4.91 3.54 2.66 9.36.56 11.27c-2.28 2.08-6.82 2.69-9.37-.13s-3.13-5.08-1.91-8.37"></path><path fill="#307d31" d="M18.32 62.6c.26-.32.91-1.14.51-2.58c-.67-2.41-2.37-5.38-5.62-9.21c-5.67-6.68-8.48-8.42-10.28-6.52c-1.91 2.02.79 6.74 4.38 11.07s9.38 9.26 11.01 7.24"></path><path fill="#e9fcae" d="M16.41 58.5c-.55.45-3.54-1.63-6.63-5.28S4.42 46.5 5.4 45.75c1.24-.95 5.73 3.76 6.91 5.39s5.33 6.35 4.1 7.36"></path><path fill="#fff" d="m81.34 39.45l1.69-1.63s5.47 7.27 9.77 4.04c5.17-3.88.06-10.17.06-10.17l2.25-1.12l2.98 4.61l.22 6.52l-5.11 4.44s-5.62 0-6.07-.67c-.45-.68-5.79-6.02-5.79-6.02"></path><path fill="#d2608c" d="m79.6 40.97l2.23-1.98s6.31 8.95 12.61 4.3c6.04-4.47.49-12.62.49-12.62l2.23-1.31s4.42 4.99 2.67 11.52c-1.41 5.24-6.64 7.69-10.91 6.79c-6.7-1.42-9.32-6.7-9.32-6.7"></path><path fill="#2c7b2e" d="M88.92 52.48s.18-4.16 6-8.8s10.71-3.37 12.34-1.98c1.64 1.4 3.59 6.54-.84 12.12c-2.12 2.66-3.76 3.04-6.07 2.83c-2.7-.25-7.39-2.59-7.39-2.59z"></path><path fill="#e0feac" d="M105.05 43.55c-2.43-1.61-7.44.94-10.02 3.35c-2.75 2.58-3.51 5.5-3.51 5.5l6.01 2.12s3.38-.08 5.64-2.66c3.37-3.84 3.7-7.1 1.88-8.31"></path><path fill="#fe2a19" d="M72.43 45.73c-.84.42-3.98 4.1-3.05 11.42c.97 7.57 6.38 12.55 15.34 13.2c11.47.82 17.92-7.58 18.8-9.1s2.64-4.86 1.41-5.97s-8.9-1.58-17.74-4.33c-9.93-3.1-12.89-6.16-14.76-5.22"></path><path fill="#cb1c35" d="M76.4 49.99c-1.25.62-2.48 11.73 7.33 14.98c8.45 2.8 14.73-6.5 14.09-7.74s-4.45-.82-10.74-3.05c-6.3-2.24-9.7-4.67-10.68-4.19"></path><path fill="#fe6261" d="M80.68 55.89c.29 1.47 1.66 3.26 4.77 4.59c2.47 1.06 5.12.59 6.24.12s.69-4.93.18-5.06c-1.59-.41-6.41-2.06-7.88-2.65c-.95-.38-3.62 1.42-3.31 3"></path><path fill="#f7ca76" d="M80.12 56c-.05-.92-1.54-1.23-2.58-.89c-1.37.44-.97 1.81-.2 2.04c1.37.42 2.83-.24 2.78-1.15m3.01 3.84c-.72-.57-1.94.34-2.37 1.35c-.57 1.32.72 1.93 1.4 1.5c1.22-.76 1.68-2.29.97-2.85"></path><path fill="#86c82c" d="M68.86 76.25s.27-1.81-1.05-4.43c-.57-1.13-2.82-3.38-1.13-5.32c1.69-1.93 7.41-.72 9.26-.32s4.83.32 5.96-.81s1.93-5.8 6.04-6.93c4.24-1.16 6.24 2.58 7.97 4.11c1.37 1.21 3.38 1.69 6.2.72s2.01 2.74 2.01 2.74l-3.3 7.33zm-50.97-10.3s-2.98-5.72-4.91-14.5s-1.78-11.66.24-12.32c3.46-1.13 5.8 3.06 7.01 2.82s1.45-5.32 4.99-6.12c3.54-.81 4.91 2.42 6.68 5.32s5.07 10.63 5.07 10.63s3.14-1.45 5.88 0s5.4 5.8 6.52 8.86c1.13 3.06 2.23 5.75 2.23 5.75s3.87.73 7.43 2.87c4.03 2.42 5.96 7.17 5.96 7.17l-19.8 1.27s-24-8.62-24.24-9.02c-.25-.4-3.31-3.06-3.06-2.73"></path><path fill="#2d792a" d="M21.03 69.09s-1.21-2.9-.81-6.6s2.13-6.06 5.03-6.06c2.26 0 6.16 1.47 9.95 6.78s4.27 10.15 4.27 10.15l-16.03-2.09z"></path><path fill="#e7fcae" d="M22.07 68.04s-1.57-6.39.4-7.89c1.37-1.05 3.46-.72 7.25 3.46c4.32 4.78 5.23 8.94 5.23 8.94z"></path><path fill="#fff" d="m41.51 74.12l1.85.16s1.05-4.91 5.15-6.93c3.95-1.93 8.13-.32 8.13-.32l.64-2.34l-4.35-1.77l-5.88 1.21s-5.32 4.83-5.32 5.07s-.22 4.68-.22 4.92"></path><path fill="#d2608c" d="M38.3 74.83c0-.24.49-7 6.2-10.79c7.25-4.81 13.25-.72 13.25-.72L57 65.63s-6.24-2.73-11.05 1.39c-3.95 3.38-4.83 8.46-4.83 8.46z"></path><path fill="#f6f6f6" d="M67.45 108.67c34.77-.11 46.57-28.2 49.38-38.6c1.84-6.81 2.5-13 2.5-13l-12.2 13.74s-38.26 7.34-39.54 7.34s-22.42-1.7-22.42-1.7l-21.72-5.19L8.56 56.84s.28 8.97 2.69 15.78c1.86 5.25 12.63 36.19 56.2 36.05"></path><path fill="#fff" d="M64.04 80.43c16.6.21 40.86-4.11 49.95-13.2c5.82-5.82 5.39-11.07 5.39-11.07s-10.5 19.83-55.49 19.16C25.73 74.75 8.53 56.79 8.53 56.79s1.02 6.18 5.7 10.02C25.3 75.86 41.9 80.14 64.04 80.43m-43.58-1.61c-1.95 1.83.16 6.48 4.92 10.67s9.52 7.55 11.9 5.17c2.47-2.47-3.36-8.37-6.65-11.24s-7.63-6.98-10.17-4.6"></path></svg>
                    </div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{program.name}</h3>
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
            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">{t('nutritionPlansPage.cta.title')}</h2>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">{t('nutritionPlansPage.cta.description')}</p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button 
                onClick={() => navigate('/contact')} 
                className="btn-animate-strong inline-flex items-center justify-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#4CAF50' }}
              >
                {t('nutritionPlansPage.cta.consultationButton')}
              </button>
              <button 
                onClick={() => navigate('/services')} 
                className="btn-animate-strong inline-flex items-center justify-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl"
              >
                {t('nutritionPlansPage.cta.servicesButton')}
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
