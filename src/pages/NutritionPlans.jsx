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
            <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-white">
              {t('wellnessServices.nutritionPlans.title')}
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              {t('wellnessServices.nutritionPlans.description')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="mt-8 flex gap-4 justify-center">
              <a href="/contact" className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl">
                Book Nutrition Consultation
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
                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Personalized Nutrition Plans
                </h1>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Tailored meal plans, macro tracking, and coaching to help you reach weight loss, muscle gain, or metabolic health goals—built around your lifestyle and food preferences.
                </p>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Diet plans for every goal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Macro & calorie guidance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Weekly check-ins</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Sustainable habit building</span>
                  </div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Start Your Plan
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a href="#faq" className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold rounded-lg transition-all duration-300">
                    Learn More
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
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'} id="faq">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
            <div>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-full mb-6 shadow-sm">
                  Nutrition FAQs
                </span>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <h2 className={isDark ? 'text-4xl md:text-6xl font-bold text-white leading-tight' : 'text-4xl md:text-6xl font-bold text-black leading-tight'}>
                  Everything you need to know
                </h2>
              </ScrollAnimation>
              <div className="mt-8">
                <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img src="/images/63H3.jpg" alt="Healthy meal" className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { question: 'What is included in a personalized plan?', answer: 'You receive a goal-aligned meal plan, grocery list, macro targets, and weekly adjustments based on progress and preferences.' },
                { question: 'Do you support vegetarian or cultural diets?', answer: 'Yes. Plans can be tailored for vegetarian, vegan, Jain, gluten-free, lactose-free, or regional cuisines.' },
                { question: 'Will I get continuous support?', answer: 'Yes. Weekly check-ins, habit tracking, and chat support help you stay on track and adapt as needed.' },
                { question: 'Do I need supplements?', answer: 'Supplements are optional and only suggested when beneficial. We prioritize whole-food nutrition first.' }
              ].map((faq, index) => (
                <ScrollAnimation key={index} animation="fade-in" stagger={`scroll-stagger-${index + 2}`}>
                  <div className={`${isDark ? 'bg-gray-900 rounded-xl border-2 border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-500' : 'bg-white rounded-xl border-2 border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-300'}`}>
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                      className={`w-full text-left p-6 flex justify-between items-center ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} rounded-xl transition-colors duration-300`}
                    >
                      <h3 className={`text-lg font-semibold pr-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h3>
                      <div className="flex-shrink-0">
                        {openIndex === index ? (
                          <svg className={`w-6 h-6 transition-transform duration-200 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <svg className={`w-6 h-6 transition-transform duration-200 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 12h6m-6 6l-6-6m6-6V6" />
                          </svg>
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

      {/* CTA */}
      <section className={isDark ? 'relative py-24 bg-gray-900' : 'relative py-24 bg-white'}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url('/images/CTAc.jpg')` }}></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">Ready to transform your nutrition?</h2>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-lg text-white max-w-2xl mx-auto mb-10">Get a plan that fits your goals, schedule, and tastes. Start feeling better, eating smarter, and living healthier—one meal at a time.</p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button onClick={() => navigate('/contact')} className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl">
                Claim Your Free Consultation
              </button>
              <button onClick={() => navigate('/services')} className="btn-animate-strong rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-emerald-600 border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white shadow-lg hover:shadow-xl">
                Explore Services
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
