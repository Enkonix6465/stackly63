import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function About() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
    }
    // Theme detection
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [navigate])

  const user = getCurrentUser()
   const highlights = [
    t("about.aboutSection.highlights.verifiedFreelancers"),
    t("about.aboutSection.highlights.securePayments"),
    t("about.aboutSection.highlights.globalTalentPool"),
    t("about.aboutSection.highlights.support"),
  ];



  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
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
    <source src="/63A.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay (darken video for readability) */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
      <h1 className="mt-4 text-4xl font-extrabold mb-4 leading-tight text-white">
        {t('about.showcase.title')}
      </h1>
    </ScrollAnimation>
    
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
      <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
        {t('about.showcase.subtitle')}
      </p>
    </ScrollAnimation>
    
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
      <div className="mt-8 flex gap-4 justify-center">
        {/* Primary Button */}
        <a
          href="/contact"
          className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
          style={{ backgroundColor: '#4CAF50' }}
        >
          {t('about.showcase.connectButton')}
        </a>
      </div>
    </ScrollAnimation>
  </div>
</section>




      {/* 2) Mission & Values (upgraded design) */}
<section
      id="mission"
      className={`py-20 transition-colors duration-500 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
    >  <div className="mx-auto max-w-6xl px-4">
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.mission.title')}</h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>{t("about.mission.subtitle")}</p>
      </div>
    </ScrollAnimation>
    
    <div className="mt-12 grid md:grid-cols-3 gap-8">
      {[{
        t: t('about.mission.trust.title'), 
        d: t('about.mission.trust.description'), 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 36 36"><path fill="#ef9645" d="M16.428 30.331a2.31 2.31 0 0 0 3.217-.568a.8.8 0 0 0-.197-1.114l-1.85-1.949l4.222 2.955a1.497 1.497 0 0 0 2.089-.369a1.5 1.5 0 0 0-.369-2.089l-3.596-3.305l5.375 3.763a1.497 1.497 0 0 0 2.089-.369a1.5 1.5 0 0 0-.369-2.089l-4.766-4.073l5.864 4.105a1.497 1.497 0 0 0 2.089-.369a1.5 1.5 0 0 0-.369-2.089L4.733 11.194l-3.467 5.521c-.389.6-.283 1.413.276 1.891l7.786 6.671q.533.456 1.107.859z"></path><path fill="#ffdc5d" d="M29.802 21.752L18.5 13.601l-.059-.08l.053-.08l.053-.053l.854.469c.958.62 3.147 1.536 4.806 1.536c1.135 0 1.815-.425 2.018-1.257a1.41 1.41 0 0 0-1.152-1.622a6.8 6.8 0 0 1-2.801-1.091l-.555-.373c-.624-.421-1.331-.898-1.853-1.206c-.65-.394-1.357-.585-2.163-.585c-1.196 0-2.411.422-3.585.83l-1.266.436a5.2 5.2 0 0 1-1.696.271c-1.544 0-3.055-.586-4.516-1.152l-.147-.058a1.39 1.39 0 0 0-1.674.56L1.35 15.669a1.36 1.36 0 0 0 .257 1.761l7.785 6.672c.352.301.722.588 1.1.852l6.165 4.316a2 2 0 0 0 2.786-.491a.803.803 0 0 0-.196-1.115l-1.833-1.283a.424.424 0 0 1-.082-.618a.42.42 0 0 1 .567-.075l3.979 2.785a1.4 1.4 0 0 0 1.606-2.294l-3.724-2.606a.424.424 0 0 1-.082-.618a.423.423 0 0 1 .567-.075l5.132 3.593a1.4 1.4 0 0 0 1.606-2.294l-4.868-3.407a.42.42 0 0 1-.081-.618a.377.377 0 0 1 .506-.066l5.656 3.959a1.4 1.4 0 0 0 1.606-2.295"></path><path fill="#ef9645" d="M16.536 27.929c-.07.267-.207.498-.389.681l-1.004.996a1.5 1.5 0 0 1-1.437.396a1.5 1.5 0 0 1-.683-2.512l1.004-.996a1.5 1.5 0 0 1 1.437-.396a1.5 1.5 0 0 1 1.072 1.831M5.992 23.008l1.503-1.497a1.5 1.5 0 0 0-.444-2.429a1.495 1.495 0 0 0-1.674.31l-1.503 1.497a1.5 1.5 0 0 0 .445 2.429a1.5 1.5 0 0 0 1.673-.31m5.204.052a1.5 1.5 0 1 0-2.122-2.118L6.072 23.94a1.5 1.5 0 1 0 2.122 2.118zm2.25 3a1.5 1.5 0 0 0-.945-2.555a1.49 1.49 0 0 0-1.173.44L9.323 25.94a1.5 1.5 0 0 0 .945 2.556c.455.036.874-.141 1.173-.44zm16.555-4.137l.627-.542l-6.913-10.85l-12.27 1.985a1.507 1.507 0 0 0-1.235 1.737c.658 2.695 6.003.693 8.355-.601z"></path><path fill="#ffcc4d" d="M16.536 26.929c-.07.267-.207.498-.389.681l-1.004.996a1.5 1.5 0 0 1-1.437.396a1.5 1.5 0 0 1-.683-2.512l1.004-.996a1.5 1.5 0 0 1 1.437-.396a1.5 1.5 0 0 1 1.072 1.831M5.992 22.008l1.503-1.497a1.5 1.5 0 0 0-.444-2.429a1.5 1.5 0 0 0-1.674.31l-1.503 1.497a1.5 1.5 0 0 0 .445 2.429a1.5 1.5 0 0 0 1.673-.31m5.204.052a1.5 1.5 0 1 0-2.122-2.118L6.072 22.94a1.5 1.5 0 1 0 2.122 2.118zm2.25 3a1.5 1.5 0 0 0-.945-2.555a1.49 1.49 0 0 0-1.173.44L9.323 23.94a1.5 1.5 0 0 0 .945 2.556c.455.036.874-.141 1.173-.44zm21.557-7.456a1.45 1.45 0 0 0 .269-1.885l-.003-.005l-3.467-6.521a1.49 1.49 0 0 0-1.794-.6c-1.992.771-4.174 1.657-6.292.937l-1.098-.377c-1.948-.675-4.066-1.466-6-.294c-.695.409-1.738 1.133-2.411 1.58a6.9 6.9 0 0 1-2.762 1.076a1.5 1.5 0 0 0-1.235 1.737c.613 2.512 5.3.908 7.838-.369a.97.97 0 0 1 1.002.081l11.584 8.416z"></path></svg>
      }, {
        t: t('about.mission.quality.title'), 
        d: t('about.mission.quality.description'), 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 512 512"><path fill="#ffb636" d="m252.5 381l-128 49c-5.9 2.2-12.1-2.3-11.8-8.6l7-136.9c.1-2.1-.6-4.2-1.9-5.9L31.6 172c-4-4.9-1.6-12.2 4.5-13.9l132.4-35.6c2.1-.6 3.9-1.9 5-3.7L248.3 4c3.4-5.3 11.2-5.3 14.6 0l74.8 114.9c1.2 1.8 3 3.1 5 3.7l132.4 35.6c6.1 1.6 8.5 9 4.5 13.9l-86.1 106.6c-1.3 1.7-2 3.8-1.9 5.9l7 136.9c.3 6.3-5.9 10.8-11.8 8.6l-128-49c-2.1-.8-4.3-.8-6.3-.1"></path><path fill="#ffd469" d="m456.1 51.7l-41-41c-1.2-1.2-2.8-1.7-4.4-1.5s-3.1 1.2-3.9 2.6l-42.3 83.3c-1.2 2.1-.8 4.6.9 6.3c1 1 2.4 1.5 3.7 1.5c.9 0 1.8-.2 2.6-.7L454.9 60c1.4-.8 2.4-2.2 2.6-3.9c.3-1.6-.3-3.2-1.4-4.4m-307 43.5l-42.3-83.3c-.8-1.4-2.2-2.4-3.9-2.6c-1.6-.2-3.3.3-4.4 1.5l-41 41c-1.2 1.2-1.7 2.8-1.5 4.4s1.2 3.1 2.6 3.9l83.3 42.3c.8.5 1.7.7 2.6.7c1.4 0 2.7-.5 3.7-1.5c1.7-1.8 2-4.4.9-6.4m140.7 410l-29-88.8c-.2-.9-.7-1.7-1.3-2.3c-1-1-2.3-1.5-3.7-1.5c-2.4 0-4.4 1.6-5.1 3.9l-29 88.8c-.4 1.6-.1 3.3.9 4.6s2.5 2.1 4.2 2.1h57.9c1.6 0 3.2-.8 4.2-2.1c1.1-1.4 1.4-3.1.9-4.7"></path></svg>
      }, {
        t: t('about.mission.collaboration.title'), 
        d: t('about.mission.collaboration.description'), 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 48 48"><g fill="none" strokeLinecap="round" strokeWidth={4}><path stroke="#000" strokeLinejoin="round" d="M33 38H22V30H36V22H44V38H39L36 41L33 38Z"></path><path fill="#2f88ff" stroke="#000" strokeLinejoin="round" d="M4 6H36V30H17L13 34L9 30H4V6Z"></path><path stroke="#fff" d="M19 18H20"></path><path stroke="#fff" d="M26 18H27"></path><path stroke="#fff" d="M12 18H13"></path></g></svg>
      }].map((item, index) => (
        <ScrollAnimation 
          key={item.t} 
          animation="slide-up" 
          stagger={`scroll-stagger-${index + 2}`}
        >
          <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-green-500">
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.t}</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.d}</p>
          </div>
        </ScrollAnimation>
      ))}
    </div>
  </div>
</section>


      {/* 3) Health & Wellness Platform Process */}
      <section
        id="wellnessProcess"
        className={`py-20 transition-colors duration-500 ${
          isDark ? 'bg-gray-800' : 'bg-gray-50'
        }`}
      >  
    <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-16 items-center">
    
    {/* Left Content */}
    <div className={`order-2 md:order-1 group ${isDark ? "text-white" : "text-gray-900"}`}>
      <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.wellnessProcess.title')}</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
            {t('about.wellnessProcess.subtitle')}
          </p>
        </div>
      </ScrollAnimation>

      {/* Wellness Images */}
      <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
        <div className="flex gap-4">
          <div className="relative group">
            <img
              src="/images/healthcare.jpg"
              alt="Mindful Wellness Practice"
              className="w-32 h-24 md:w-40 md:h-32 rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          <div className="relative group">
            <img
              src="/images/platform.jpg"
              alt="Wellness Community"
              className="w-32 h-24 md:w-40 md:h-32 rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </ScrollAnimation>
    </div>

    {/* Right Content - Process Steps */}
    <div className="order-1 md:order-2">
      <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-green-500">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.wellnessProcess.steps.step1.title')}</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('about.wellnessProcess.steps.step1.description')}
            </p>
          </div>
          
          <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-green-500">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.wellnessProcess.steps.step2.title')}</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('about.wellnessProcess.steps.step2.description')}
            </p>
          </div>
          
          <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-green-500">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.wellnessProcess.steps.step3.title')}</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('about.wellnessProcess.steps.step3.description')}
            </p>
          </div>
        </div>
      </ScrollAnimation>
    </div>
    </div>
</section>

      {/* 4) Meet Your Wellness Expert */}
      <section 
        id="wellnessExpert" 
        className={`py-20 transition-colors duration-500 ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.wellnessExpert.title')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
                {t('about.wellnessExpert.subtitle')}
              </p>
            </div>
          </ScrollAnimation>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
                <div className={`rounded-2xl p-8 shadow-lg border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {t('about.wellnessExpert.expertName')}
                      </h3>
                      <p className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {t('about.wellnessExpert.expertTagline')}
                      </p>
                    </div>
                    
                    <div className={`space-y-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <p>
                        {t('about.wellnessExpert.expertDescription1')}
                      </p>
                      <p>
                        {t('about.wellnessExpert.expertDescription2')}
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <button className="btn-animate-strong inline-flex items-center rounded-lg px-6 py-3 font-semibold transition-all whitespace-nowrap text-white shadow-lg bg-green-500 hover:bg-green-600">
                        {t('about.wellnessExpert.ctaButton')}
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Right Content - Expert Image */}
            <div className="relative">
              <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="/images/63A4.jpg"
                      alt="Dr. Sarah Johnson - Wellness Expert"
                      className="w-full h-[600px] md:h-[700px] object-cover"
                    />
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>





      {/* 5) Certified Health Professionals */}
      <section
        id="healthProfessionals"
        className="relative overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/63A1.jpg"
            alt="Health and Wellness Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24">
          {/* Main Content Area */}
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('about.healthProfessionals.title')}
              </h2>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                {t('about.healthProfessionals.mainDescription')}
              </p>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
              <button className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl bg-green-500 hover:bg-green-600">
                {t('about.healthProfessionals.purchaseButton')}
              </button>
            </ScrollAnimation>
          </div>

          {/* Separator Line */}
          <div className="border-t border-white/20 mb-16"></div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: t('about.healthProfessionals.categories.balanceBodyMind.title'),
                description: t('about.healthProfessionals.categories.balanceBodyMind.description')
              },
              {
                title: t('about.healthProfessionals.categories.healthyDailyLife.title'),
                description: t('about.healthProfessionals.categories.healthyDailyLife.description')
              },
              {
                title: t('about.healthProfessionals.categories.nutritionStrategies.title'),
                description: t('about.healthProfessionals.categories.nutritionStrategies.description')
              },
              {
                title: t('about.healthProfessionals.categories.workoutRoutines.title'),
                description: t('about.healthProfessionals.categories.workoutRoutines.description')
              }
            ].map((category, index) => (
              <ScrollAnimation 
                key={index} 
                animation="slide-up" 
                stagger={`scroll-stagger-${index + 4}`}
              >
                <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-green-500">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {category.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>


      {/* 6) Our Team */}
      <section
        id="ourTeam"
        className={`py-20 transition-colors duration-500 ${
          isDark ? 'bg-gray-800' : 'bg-gray-50'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4">
          {/* Header */}
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('about.ourTeam.title')}
              </h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
                {t("about.ourTeam.subtitle")}
              </p>
            </div>
          </ScrollAnimation>
          
          {/* Team Members Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {t("about.ourTeam.teamMembers", { returnObjects: true }).map((member, index) => (
              <ScrollAnimation 
                key={index} 
                animation="slide-up" 
                stagger={`scroll-stagger-${index + 2}`}
              >
                <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
                  isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  {/* Team Member Image */}
                  <div className="relative mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Team Member Info */}
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={`mb-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.role}
                  </p>
                  <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {member.description}
                  </p>
                  
                  {/* Social Media Icons */}
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.socialLinks.twitter}
                      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a
                      href={member.socialLinks.facebook}
                      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href={member.socialLinks.pinterest}
                      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </a>
                    <a
                      href={member.socialLinks.vimeo}
                      className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* 7) Call-to-Action Section */}
      <section
        id="cta"
        className="relative overflow-hidden text-white"
      >
        {/* Background Image with Black Overlay */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/63A2.jpg)'
            }}
          ></div>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24">
          <div className="text-center">

             <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
               <h2 className="text-4xl font-extrabold mb-4 leading-tight text-white">
                 {t('about.cta.title')} <span className="text-green-300 italic">{t('about.cta.titleAccent')}</span>
               </h2>
             </ScrollAnimation>

             <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
               <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
                 {t('about.cta.description')}
               </p>
             </ScrollAnimation>

             <ScrollAnimation animation="slide-up" stagger="scroll-stagger-4">
               <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                 {/* Primary CTA Button */}
                 <a
                   href="/contact"
                   className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
                   style={{ backgroundColor: '#4CAF50' }}
                 >
                   {t('about.cta.primaryButton')}
                 </a>

                 {/* Secondary CTA Button */}
                 <a
                   href="/services"
                   className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105"
                 >
                   {t('about.cta.secondaryButton')}
                 </a>
               </div>
             </ScrollAnimation>

             {/* Trust Indicators */}
             <ScrollAnimation animation="slide-up" stagger="scroll-stagger-5">
               <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                 <div className={`rounded-2xl p-6 shadow-lg border ${
                   isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                 }`}>
                   <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                     </svg>
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">{t('about.cta.trustIndicators.certifiedProfessionals.title')}</h3>
                   <p className="text-white/80 text-sm">{t('about.cta.trustIndicators.certifiedProfessionals.description')}</p>
                 </div>

                 <div className={`rounded-2xl p-6 shadow-lg border ${
                   isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                 }`}>
                   <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                     </svg>
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">{t('about.cta.trustIndicators.provenResults.title')}</h3>
                   <p className="text-white/80 text-sm">{t('about.cta.trustIndicators.provenResults.description')}</p>
                 </div>

                 <div className={`rounded-2xl p-6 shadow-lg border ${
                   isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                 }`}>
                   <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                     </svg>
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">{t('about.cta.trustIndicators.personalizedCare.title')}</h3>
                   <p className="text-white/80 text-sm">{t('about.cta.trustIndicators.personalizedCare.description')}</p>
                 </div>
               </div>
             </ScrollAnimation>

             {/* Additional CTA */}
             <ScrollAnimation animation="slide-up" stagger="scroll-stagger-6">
               <div className="mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                 <h3 className="text-2xl font-bold text-white mb-4">
                   {t('about.cta.limitedOffer.title')}
                 </h3>
                 <p className="text-white/90 mb-6">
                   {t('about.cta.limitedOffer.description')}
                 </p>
                 <a
                   href="/contact"
                   className="btn-animate-strong inline-flex items-center rounded-lg px-6 py-3 font-bold text-white shadow-lg hover:shadow-xl bg-green-500 hover:bg-green-600"
                 >
                   {t('about.cta.limitedOffer.button')}
                 </a>
               </div>
             </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


