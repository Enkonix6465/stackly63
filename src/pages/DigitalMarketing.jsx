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
          <source src="/HealthwellnessContact.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="absolute inset-0 bg-black/50"></div>
  <div className="relative z-10 px-6 max-w-4xl">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
      <h1 className="mt-4 text-4xl font-extrabold mb-4 leading-tight text-white">
        {t('mindfulLiving.title')}
      </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
      <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
        {t('mindfulLiving.description')}
      </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
      <div className="mt-8 flex gap-4 justify-center">
              <a href="/contact" className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: '#4CAF50' }}>
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
                <h1 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('mindfulLiving.title')}
        </h1>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <p className={`text-lg max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {t('mindfulLiving.description')}
        </p>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Mindful Breathing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Gentle Movement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Daily Reflection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Stress Reduction</span>
                  </div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="btn-animate-strong inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-green-500 hover:bg-green-600">
                    {t('mindfulLiving.connectButton')}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a href="#faq" className="inline-flex items-center justify-center px-8 py-4 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold rounded-lg transition-all duration-300">
                    Learn More
                  </a>
      </div>
    </ScrollAnimation>
            </div>

            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-2">
              <div className="relative">
                <img src="/images/63A6.jpg" alt="Mindful Living" className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl" />
      </div>
    </ScrollAnimation>
          </div>
  </div>
</section>




      {/* FAQ */}
      <section className={isDark ? 'py-20 bg-gray-800' : 'py-20 bg-gray-100'}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
              <div>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full mb-6 shadow-sm">
                  MINDFUL LIVING FAQ
                </span>
              </ScrollAnimation>
              <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-2">
                <h2 className={isDark ? 'text-4xl font-extrabold text-white mb-4' : 'text-4xl font-extrabold text-gray-900 mb-4'}>
                  Common Questions About Mindful Living
                </h2>
              </ScrollAnimation>
              <div className="mt-8">
                <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-3">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img src="/images/63A7.jpg" alt="Mindful living practice" className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                    </div>
                  </ScrollAnimation>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  question: "What is mindful living?",
                  answer: "Mindful living is the practice of bringing conscious awareness to your daily activities, thoughts, and emotions. It involves being present in the moment and cultivating a sense of calm and clarity in your everyday life."
                },
                {
                  question: "How much time do I need to practice mindfulness?",
                  answer: "Even just 5-10 minutes a day can make a significant difference. We'll help you start with small, manageable practices that fit into your existing routine and gradually build from there."
                },
                {
                  question: "Do I need any special equipment or experience?",
                  answer: "No special equipment is needed! Mindful living can be practiced anywhere, anytime. Our approach focuses on simple techniques like breathing exercises, gentle movement, and reflection that anyone can learn."
                },
                {
                  question: "How will mindful living help with stress?",
                  answer: "Mindful practices help activate your body's relaxation response, reduce cortisol levels, and improve your ability to handle challenging situations with greater calm and clarity."
                }
              ].map((faq, index) => (
                <ScrollAnimation key={index} animation="fade-in" stagger={`scroll-stagger-${index + 2}`}>
                  <div className={`${isDark ? 'bg-gray-900 rounded-xl border-2 border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-500' : 'bg-white rounded-xl border-2 border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-500'}`}>
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


      {/* Testimonials */}
      <section className={isDark ? 'py-20 bg-gray-900 text-white transition-colors duration-500' : 'py-20 bg-white text-gray-900 transition-colors duration-500'}>
        <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`${isDark ? 'text-4xl font-extrabold text-white mb-4' : 'text-4xl font-extrabold text-gray-900 mb-4'}`}>What Our Members Say</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-lg text-gray-300 max-w-2xl mx-auto' : 'text-lg text-gray-700 max-w-2xl mx-auto'}`}>Real stories from people who transformed their daily lives through mindful living</p>
            </ScrollAnimation>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">SM</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>Sarah Martinez</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Marketing Professional</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "The mindful breathing exercises completely changed how I handle work stress. I feel more centered and focused throughout my day. The gentle approach made it easy to stick with."
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">MC</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>Michael Chen</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Software Engineer</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "I was skeptical about mindfulness, but the daily reflection practices helped me sleep better and feel more balanced. The techniques are simple but incredibly effective."
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">ER</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>Emily Rodriguez</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Teacher</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "The gentle movement sequences and breathing exercises have been life-changing. I feel more patient and present with my students, and my anxiety has decreased significantly."
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">JW</span>
                  </div>
                  <div>
                    <h3 className={`${isDark ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>James Wilson</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Healthcare Worker</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  "Working in healthcare can be overwhelming, but the mindful living practices help me stay grounded. The journaling prompts and breathing techniques are perfect for busy schedules."
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
              <h2 className={`${isDark ? 'text-4xl font-extrabold text-white mb-4' : 'text-4xl font-extrabold text-gray-900 mb-4'}`}>Mindful Living Practices</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-lg text-gray-300 max-w-2xl mx-auto' : 'text-lg text-gray-700 max-w-2xl mx-auto'}`}>Simple, effective techniques to bring mindfulness into your daily life</p>
            </ScrollAnimation>
            </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
              { name: 'Breathing Exercises', emoji: '🫁' },
              { name: 'Gentle Movement', emoji: '🧘' },
              { name: 'Daily Reflection', emoji: '📝' },
              { name: 'Mindful Eating', emoji: '🍎' },
              { name: 'Body Scan', emoji: '👁️' },
              { name: 'Gratitude Practice', emoji: '🙏' },
              { name: 'Walking Meditation', emoji: '🚶' },
              { name: 'Stress Relief', emoji: '💆' }
            ].map((practice, index) => {
              const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6', 'scroll-stagger-1', 'scroll-stagger-2', 'scroll-stagger-3', 'scroll-stagger-4']
              const staggerClass = staggerClasses[index] || 'scroll-stagger-3'
        return (
                <ScrollAnimation key={practice.name} animation="fade-in" stagger={staggerClass}>
                  <div className={`${isDark ? 'text-center p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300' : 'text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'}`}>
                    <div className="text-4xl mb-3 flex justify-center item-center">{practice.emoji}</div>
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
            <h2 className="text-4xl font-extrabold mb-4 leading-tight text-white">{t('digitalMarketing.ctaTitle')}</h2>
    </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="text-xl max-w-2xl mx-auto text-white/90 leading-relaxed">{t('digitalMarketing.ctaDescription')}</p>
    </ScrollAnimation>
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/contact')} className="btn-animate-strong inline-flex items-center justify-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl" style={{ backgroundColor: '#4CAF50' }}>
          {t('digitalMarketing.startProjectButton')}
        </button>
              <button onClick={() => navigate('/services')} className="btn-animate-strong inline-flex items-center justify-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white/10 text-white border-2 border-white/30 backdrop-blur-sm hover:bg-white/20 shadow-lg hover:shadow-xl">
          {t('digitalMarketing.viewServicesButton')}
        </button>
      </div>
    </ScrollAnimation>
  </div>
</section>

      <Footer />
    </div>
  )
}
