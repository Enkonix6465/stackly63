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
        icon: <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><g fill="none"><path fill="#ffc83d" d="M11.406 6.156c-5.275-.65-7.156 2-8.062 3.219c-2.469 3.64-.985 7.64.812 9.563c0 0 10.094 9.828 10.375 10.093s.946 1.172 2.547.914c1.398-.225 1.797-1.914 1.797-1.914s1.032.842 2.516 0c1.156-.656 1.109-1.968 1.109-1.968s1.238.62 2.563-.5c1.192-1.01.453-2.782.453-2.782s1.07.176 1.828-.656c1.025-1.125.672-2.547 0-3.187L19.625 10.5l-.594-3.125z"></path><path fill="#d67d00" d="m26.707 22.593l-2.226-2.257a.5.5 0 1 0-.712.703l1.764 1.788l-.017-.046s.582.096 1.191-.188m-2.729 3.557l-2.31-2.563a.5.5 0 0 0-.743.67l1.66 1.841c.199.076.73.232 1.393.053m-3.402 2.2l-1.806-1.913a.5.5 0 1 0-.727.687l.904.957c.199.13.795.45 1.629.269m-2.173.703c-.759.202-2.167.265-3.137-.773l-.776.71l.041.04q.044.042.1.1c.328.34 1.01 1.046 2.447.814c.622-.1 1.046-.49 1.325-.892"></path><path fill="#f59f00" d="M6.375 6.813c-1.687 2.166-4.287 7.775.313 11.625L5.24 19.993l-1.084-1.055C2.36 17.016.875 13.016 3.344 9.375l.04-.055c.525-.706 1.366-1.839 2.95-2.567z"></path><path fill="#d67d00" d="M17.25 23.688c1.203 1.39-.3 3.162-1 3.906L5.669 16.584c1.974-2.002 3.278-2.203 4.16-1.334c.88.869.468 1.484.468 1.484s1.194-.678 2.453.563c1.26 1.241.39 2.187.39 2.187s1.3-.234 2.22.797c1.03 1.157.374 2.5.374 2.5s.79.068 1.516.907"></path><path fill="#ffc83d" d="M12.438 8c3.234-1.297 8.14-1.953 10.39-1.984c1.531 0 3.481.37 5.547 2.797c3.3 3.874.828 8.296-1.125 10.093V17.5s-7.506-6.536-7.75-6.766c-.45-.425-2.302-.296-2.5-.234c-.604.188-1.65.5-3 1c-1.098.407-1.969.078-2.328-.766c-.36-.843-.842-2.09.765-2.734"></path><path fill="#d67d00" d="M28.31 17.71a8.4 8.4 0 0 1-1.06 1.196c-2.76-2.406-8.378-7.325-8.828-7.75s-.974-.406-1.172-.344A79 79 0 0 0 13.75 12c-1.098.407-2.203-.422-2.562-1.266c-.33-.771-.356-1.879.87-2.556l.632-.277l.05-.019c-1.953 1.468-.228 3.262 1.385 3.056c.567-.073 1.5-.266 2.406-.5c.36-.094.713-.259 1.046-.414c.625-.293 1.18-.552 1.58-.243c1.5 1.165 5.976 4.968 9.154 7.929"></path><path fill="#ffc83d" d="M8.82 16.879a2.203 2.203 0 0 0-3.09-.398L3.812 18.1c-.883.735-1.112 2.11-.467 3.002c.584.808 1.48 1.142 2.303.908c-.365.835-.334 1.903.367 2.49c.655.547 1.464.922 2.275.669c-.078.535.08 1.121.63 1.705c.52 .551 1.276.826 2.087.643c-.107.572.074 1.208.743 1.853c.819.79 2.08.858 3.265-.23l.772-.9c.62-.78 1.478-2.136.196-3.288c-.443-.398-.952-.619-1.481-.62c.287-.7.282-1.558-.55-2.38c-.52-.513-1.157-.736-1.86-.568c.38-.808.371-1.633-.39-2.385c-.691-.683-1.543-1.007-2.643-.39c.194-.596.148-1.228-.24-1.731"></path><path fill="#d67d00" d="M9.034 17.242L4.31 21.907c.418 .186.873.229 1.31.112l3.469-3.426l-.029.016c.15-.459.156-.94-.026-1.367m3.212 2.584L6.96 25.085c.425.171.878.226 1.332.085l3.807-3.786l-.005.001c.245-.52.328-1.048.153-1.559m2.326 3.071l-4.918 4.498c.404.177.865.231 1.345.125l3.513-3.213c.17-.427.23-.912.06-1.41"></path></g></svg>
      }, {
        t: t('about.mission.quality.title'), 
        d: t('about.mission.quality.description'), 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width={72} height={72} viewBox="0 0 72 72"><path fill="#fcea2b" d="M35.993 10.736L27.791 27.37L9.439 30.044l13.285 12.94l-3.128 18.28l16.412-8.636l16.419 8.624l-3.142-18.278l13.276-12.95l-18.354-2.66z"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={2} d="M35.993 10.736L27.791 27.37L9.439 30.044l13.285 12.94l-3.128 18.28l16.412-8.636l16.419 8.624l-3.142-18.278l13.276-12.95l-18.354-2.66z"></path></svg>
      }, {
        t: t('about.mission.collaboration.title'), 
        d: t('about.mission.collaboration.description'), 
        icon: <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48"><g fill="none" strokeLinecap="round" strokeWidth={4}><path fill="#2f88ff" stroke="#000" strokeLinejoin="round" d="M4 6H44V36H29L24 41L19 36H4V6Z"></path><path stroke="#fff" d="M23 21H25.0025"></path><path stroke="#fff" d="M33.001 21H34.9999"></path><path stroke="#fff" d="M13.001 21H14.9999"></path></g></svg>
      }].map((item, index) => (
        <ScrollAnimation 
          key={item.t} 
          animation="slide-up" 
          stagger={`scroll-stagger-${index + 2}`}
        >
          <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              {item.icon}
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
              src="/images/63S1.jpg"
              alt="Yoga and Meditation Practice"
              className="w-32 h-24 md:w-40 md:h-32 rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative group">
            <img
              src="/images/63S2.jpg"
              alt="Health and Wellness Lifestyle"
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
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#2f88ff" stroke="#000" d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"></path><path stroke="#fff" strokeLinecap="round" d="M16 24L22 30L34 18"></path></g></svg>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.wellnessProcess.steps.step1.title')}</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('about.wellnessProcess.steps.step1.description')}
            </p>
          </div>
          
          <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 128 128"><path fill="#fdd835" d="m68.05 7.23l13.46 30.7a7.05 7.05 0 0 0 5.82 4.19l32.79 2.94c3.71.54 5.19 5.09 2.5 7.71l-24.7 20.75c-2 1.68-2.91 4.32-2.36 6.87l7.18 33.61c.63 3.69-3.24 6.51-6.56 4.76L67.56 102a7.03 7.03 0 0 0-7.12 0l-28.62 16.75c-3.31 1.74-7.19-1.07-6.56-4.76l7.18-33.61c.54-2.55-.36-5.19-2.36-6.87L5.37 52.78c-2.68-2.61-1.2-7.17 2.5-7.71l32.79-2.94a7.05 7.05 0 0 0 5.82-4.19l13.46-30.7c1.67-3.36 6.45-3.36 8.11-.01"></path><path fill="#ffff8d" d="m67.07 39.77l-2.28-22.62c-.09-1.26-.35-3.42 1.67-3.42c1.6 0 2.47 3.33 2.47 3.33l6.84 18.16c2.58 6.91 1.52 9.28-.97 10.68c-2.86 1.6-7.08.35-7.73-6.13"></path><path fill="#f4b400" d="M95.28 71.51L114.9 56.2c.97-.81 2.72-2.1 1.32-3.57c-1.11-1.16-4.11.51-4.11.51l-17.17 6.71c-5.12 1.77-8.52 4.39-8.82 7.69c-.39 4.4 3.56 7.79 9.16 3.97"></path></svg>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.wellnessProcess.steps.step2.title')}</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('about.wellnessProcess.steps.step2.description')}
            </p>
          </div>
          
          <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 128 128"><path fill="#84b0c1" d="M23.91 104.02c-6.5-6.63-6.5-17.21 0-23.84l18.74-18.74c2.04-2.04 4.72-3.57 7.52-4.33s5.74-.76 8.41-.13c2.8.76 5.48 2.17 7.65 4.21l.25.25c6.63 6.63 6.63 17.21 0 23.84l-18.74 18.74c-6.62 6.63-17.33 6.63-23.83 0m53.03-53.03c-12.36-12.36-32.63-12.36-45 0L13.33 69.73c-12.36 12.36-12.36 32.63 0 45s32.63 12.36 45 0l18.74-18.74c12.23-12.37 12.23-32.63-.13-45"></path><path fill="#2f7889" d="M66.86 48.48c3.36-1.69 6.57-.51 6.57-.51c-6.94-5.13-14.51-6.59-21.03-6.18c-.04.05-.07.1-.11.16c-2.86 4.39-3.5 10.19-1.72 15.07c2.68-.66 5.46-.64 8-.03c1.04.28 1.83.55 3.39 1.28c.01-.01-.54-7.05 4.9-9.79m-20.1 9.98c.13-.97.19-1.95.25-2.93c.28-4.22 1-8.42 2.14-12.49c.08-.29.16-.6.24-.91c-3.09.49-6.12 1.43-8.97 2.83c-4.44 5.73-2.98 13.15 2.23 16.49c1.19-1.19 2.59-2.2 4.11-2.99"></path><path fill="#84b0c1" d="M104.09 23.98c6.5 6.63 6.5 17.21 0 23.84L85.35 66.56c-2.04 2.04-4.72 3.57-7.52 4.33s-5.74.76-8.41.13c-2.8-.76-5.48-2.17-7.65-4.21l-.25-.25c-6.63-6.63-6.63-17.21 0-23.84l18.74-18.74c6.62-6.63 17.33-6.63 23.83 0M51.06 77.01c12.36 12.36 32.63 12.36 45 0l18.61-18.74c12.36-12.36 12.36-32.63 0-45s-32.63-12.36-45 0L50.94 32.01c-12.24 12.37-12.24 32.63.12 45"></path><path fill="#a8e3f0" d="M50.45 39.42c.04-.03.08-.07.12-.1c.53-.46 1.12-.9 1.81-1.02s1.5.19 1.74.85c.18.49.02 1.03-.15 1.52c-2.63 7.95-4.74 18.04-2.18 26.27c.25.8.49 1.83-.18 2.33c-.39.3-.97.25-1.4.02c-4.7-2.54-5.52-9.42-5.74-14.14c-.26-5.96 1.39-11.7 5.98-15.73"></path><path fill="#2f7889" d="M71.32 71.34c-.64-.08-1.32-.21-1.32-.21s-.1 4.27-3.51 7.81c-3.78 3.92-7.55 3.82-7.55 3.82c1.99 1.15 5.96 2.34 7.4 2.68l.15-.15c3.83-3.84 5.43-9 4.83-13.95m19.44-10.19l-5.33 5.33c1.33 5.94.97 12.18-1.09 17.94c2.59-.92 5.08-2.19 7.4-3.8c3.83-6.56 2.99-14.31-.98-19.47"></path><path fill="#a8e3f0" d="M79.89 70.01c-.63-1.59-1.86-3.2-3.4-3.05c-.96.09-2.45.99-2.35 3.74c.07 2.13.88 4.21-.28 7c-1.7 4.08-1.31 5.18-.9 5.83c.45.71 1.28 1.03 2.05 1.02c2.03-.01 3.71-1.87 4.63-3.91c1.49-3.26 1.58-7.29.25-10.63m-30.64 38.17c.64-.53 2.3-2.3 3.07-1.18c-.28 3.08-2.65 5.59-5.25 7.27c-3.2 2.07-6.99 3.29-10.8 3.18c-3.16-.09-8.4-1.37-10.24-4.3c-1.5-2.38 1.67-2.79 3.43-2.13c6.27 2.39 13.36 2.44 19.79-2.84"></path></svg>
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
        dir="ltr"
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
          
          <div className="grid md:grid-cols-2 gap-16 items-stretch">
            
            {/* Left Content */}
            <div className="space-y-8 h-full">
              <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
                <div className={`rounded-2xl p-8 shadow-lg border h-full flex flex-col justify-between ${
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
                      <ul className={`mt-4 list-disc pl-5 space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>{t('about.wellnessExpert.highlights.personalizedPlans', 'Personalized plans tailored to your lifestyle')}</li>
                        <li>{t('about.wellnessExpert.highlights.dataDriven', 'Data‑driven progress tracking and insights')}</li>
                        <li>{t('about.wellnessExpert.highlights.coaching', 'Weekly coaching and accountability')}</li>
                      </ul>

                      

                      {/* Certifications */}
                      <div className="mt-6">
                        <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.wellnessExpert.certifications.title', 'Certifications')}</h4>
                        <ul className="space-y-1">
                          {[t('about.wellnessExpert.certifications.item1', 'NASM-CPT – Certified Personal Trainer'),
                            t('about.wellnessExpert.certifications.item2', 'Precision Nutrition L1 Coach'),
                            t('about.wellnessExpert.certifications.item3', 'Mindfulness-Based Stress Reduction (MBSR)')
                          ].map((c, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className={`inline-block w-1.5 h-1.5 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`}></span>
                              <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quote */}
                      <div className={`mt-6 p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                        <p className={`text-sm italic ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {t('about.wellnessExpert.quote', '“Small, consistent actions compound into life‑changing results.”')}
                        </p>
                      </div>
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
            <div className="h-full">
              <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
                <div className={`overflow-hidden rounded-2xl shadow-lg border h-full ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <img
                      src="/images/63A4.jpg"
                      alt="Dr. Sarah Johnson - Wellness Expert"
                    className="w-full h-full object-cover"
                    />
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
                <div className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border bg-white/10 border-white/30 text-white">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    {index === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path fill="#ffdda1" d="M15.636 11.255L13.479 8.48l1.33-1.087a.5.5 0 0 1 .312-.112h3.76a1.49 1.49 0 0 0 0-2.98H15.12c-.803 0-1.581.278-2.202.787L8.23 9.036a1 1 0 0 1-.64.233h-5.1a1.49 1.49 0 1 0 0 2.98h5.002a3.97 3.97 0 0 0 2.566-.94l1.113-.941l2.246 2.889z"></path><path fill="#66e1ff" d="m22.79 9.57l-.834-2.292a1.635 1.635 0 0 0-1.888-.34a1.604 1.604 0 0 0-.74 1.831l.66 1.82a.496.496 0 0 1-.466.667h-3.887l-2.217 2.002v7.435a1.49 1.49 0 1 0 2.98 0v-6.458h2.999a3.66 3.66 0 0 0 1.974-.528a3.48 3.48 0 0 0 1.418-4.137"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.96 6.784a2.484 2.484 0 1 0 0-4.967a2.484 2.484 0 0 0 0 4.967" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m19.327 8.77l.662 1.818a.497.497 0 0 1-.467.668h-3.885L13.479 8.48l1.33-1.087a.5.5 0 0 1 .312-.112h3.76a1.49 1.49 0 0 0 0-2.98H15.12c-.803 0-1.581.278-2.202.787L8.23 9.036a1 1 0 0 1-.64.233h-5.1a1.49 1.49 0 1 0 0 2.98h5.002a3.97 3.97 0 0 0 2.566-.94l1.113-.941l2.246 2.889v7.436a1.49 1.49 0 0 0 2.98 0v-6.458h2.999a3.66 3.66 0 0 0 1.974-.528a3.48 3.48 0 0 0 1.42-4.137l-.834-2.292m-8.539 5.979l2.218-2.002" strokeWidth={1}></path></g></svg>
                    )}
                    {index === 1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 128 128"><path fill="#fdd835" d="m68.05 7.23l13.46 30.7a7.05 7.05 0 0 0 5.82 4.19l32.79 2.94c3.71.54 5.19 5.09 2.5 7.71l-24.7 20.75c-2 1.68-2.91 4.32-2.36 6.87l7.18 33.61c.63 3.69-3.24 6.51-6.56 4.76L67.56 102a7.03 7.03 0 0 0-7.12 0l-28.62 16.75c-3.31 1.74-7.19-1.07-6.56-4.76l7.18-33.61c.54-2.55-.36-5.19-2.36-6.87L5.37 52.78c-2.68-2.61-1.2-7.17 2.5-7.71l32.79-2.94a7.05 7.05 0 0 0 5.82-4.19l13.46-30.7c1.67-3.36 6.45-3.36 8.11-.01"></path><path fill="#ffff8d" d="m67.07 39.77l-2.28-22.62c-.09-1.26-.35-3.42 1.67-3.42c1.6 0 2.47 3.33 2.47 3.33l6.84 18.16c2.58 6.91 1.52 9.28-.97 10.68c-2.86 1.6-7.08.35-7.73-6.13"></path><path fill="#f4b400" d="M95.28 71.51L114.9 56.2c.97-.81 2.72-2.1 1.32-3.57c-1.11-1.16-4.11.51-4.11.51l-17.17 6.71c-5.12 1.77-8.52 4.39-8.82 7.69c-.39 4.4 3.56 7.79 9.16 3.97"></path></svg>
                    )}
                    {index === 2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><g fill="none"><path fill="#f8312f" d="M6 6c4.665-2.332 8.5.5 10 2.5c1.5-2 5.335-4.832 10-2.5c6 3 4.5 10.5 0 15c-2.196 2.196-6.063 6.063-8.891 8.214a1.764 1.764 0 0 1-2.186-.041C12.33 27.08 8.165 23.165 6 21C1.5 16.5 0 9 6 6"></path><path fill="#ca0b4a" d="M16 8.5v3.05c1.27-2.685 4.425-6.27 9.658-5.713c-4.51-2.03-8.195.712-9.658 2.663m-4.054-2.963C10.26 4.95 8.225 4.887 6 6C0 9 1.5 16.5 6 21c2.165 2.165 6.33 6.08 8.923 8.173a1.764 1.764 0 0 0 2.186.04q.381-.29.785-.618c-2.854-2.143-6.86-5.519-9.035-7.462c-4.957-4.431-6.61-11.815 0-14.769a9.7 9.7 0 0 1 3.087-.827"></path><ellipse cx={23.477} cy={12.594} fill="#f37366" rx={2.836} ry={4.781} transform="rotate(30 23.477 12.594)"></ellipse></g></svg>
                    )}
                    {index === 3 && (
                      <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40"><g fill="none"><g clipPath="url(#SVGw9scfcdR)"><path fill="#00034a" d="M14.527 7.172a18.2 18.2 0 0 1 2.815-4.28c.632-.66 2.7-1.666 3.916-.565a29.5 29.5 0 0 1 2.57 3.02a30 30 0 0 1 2.295 3.222a29.3 29.3 0 0 1 3.074 5.746a2.87 2.87 0 0 1-1.34 3.034a2.81 2.81 0 0 1-3.315 0a20 20 0 0 1-2.314-2.665q-.232-.275-.452-.56a1.9 1.9 0 0 1-.183.947c-.574 1.13-2.958 2.671-3.38 2.94a15.7 15.7 0 0 1-3.61 1.742c-.38.085-.778.036-1.127-.138c-.564-.282-1.408-1.38-1.66-1.938a16.2 16.2 0 0 1-.727-3.946c-.259-3.638.383-4.471.383-4.471a1.57 1.57 0 0 1 1.724-.881q.353.044.688.163c.11-.214.22-.456.33-.7c.103-.227.206-.458.313-.67m7.647 26.178a3.045 3.045 0 0 1 1.316-4.44a20.5 20.5 0 0 1 3.499-.476a2.1 2.1 0 0 1-.41-.541c-.43-.816-.188-3.49-.188-4.643c.009-1.326.183-2.644.517-3.927a1.704 1.704 0 0 1 1.915-1.1c1.29.359 2.532.877 3.696 1.541c1.341.757 3.797 2.188 4.405 3.877c.374.61.292 1.396-.201 1.915a4 4 0 0 1-.517.498l.067.105c.247.388.499.783.718 1.179a17.8 17.8 0 0 1 2.059 4.691c.2.833-.048 3.14-1.753 3.562a29.4 29.4 0 0 1-6.463.555a29.5 29.5 0 0 1-6.472-.555c-.906-.402-1.654-1.42-2.187-2.242zM10.773 19.946a2.81 2.81 0 0 0-3.304.172a29 29 0 0 0-3.715 5.324a29.4 29.4 0 0 0-2.777 5.89c-.488 1.603 1.647 3.987 3.103 4.414a17.8 17.8 0 0 0 5.084.574h.998c.303.462.848 1.23 1.27 1.536c.284.206.628.313.978.302c0 0 1.026.191 4.157-1.676a15.6 15.6 0 0 0 3.179-2.441a1.67 1.67 0 0 0 .411-1.096c0-.831-.766-1.625-1.283-2.216a15.7 15.7 0 0 0-3.141-2.48c-.373-.224-2.261-1.328-3.592-1.617a20 20 0 0 0 1.007-2.607a2.8 2.8 0 0 0-.265-1.727c-.405-.795-1.316-1.953-2.11-2.35z"></path><path stroke="#00034a" strokeMiterlimit={10} d="M14.527 7.172a18.2 18.2 0 0 1 2.815-4.28c.632-.66 2.7-1.666 3.916-.565a29.5 29.5 0 0 1 2.57 3.02a30 30 0 0 1 2.295 3.222a29.3 29.3 0 0 1 3.074 5.746a2.87 2.87 0 0 1-1.34 3.034a2.81 2.81 0 0 1-3.315 0a20 20 0 0 1-2.314-2.665q-.232-.275-.452-.56a1.9 1.9 0 0 1-.183.947c-.574 1.13-2.958 2.671-3.38 2.94a15.7 15.7 0 0 1-3.61 1.742c-.38.085-.778.036-1.127-.138c-.564-.282-1.408-1.38-1.66-1.938a16.2 16.2 0 0 1-.727-3.946c-.259-3.638.383-4.471.383-4.471a1.57 1.57 0 0 1 1.724-.881q.353.044.688.163c.11-.214.22-.456.33-.7c.103-.227.206-.458.313-.67Zm7.647 26.178a3.045 3.045 0 0 1 1.316-4.44a20.5 20.5 0 0 1 3.499-.476a2.1 2.1 0 0 1-.41-.541c-.43-.816-.188-3.49-.188-4.643c.009-1.326.183-2.644.517-3.927a1.704 1.704 0 0 1 1.915-1.1c1.29.359 2.532.877 3.696 1.541c1.341.757 3.797 2.188 4.405 3.877c.374.61.292 1.396-.201 1.915a4 4 0 0 1-.517.498l.067.105c.247.388.499.783.718 1.179a17.8 17.8 0 0 1 2.059 4.691c.2.833-.048 3.14-1.753 3.562a29.4 29.4 0 0 1-6.463.555a29.5 29.5 0 0 1-6.472-.555c-.906-.402-1.654-1.42-2.187-2.242zM10.773 19.946a2.81 2.81 0 0 0-3.304.172a29 29 0 0 0-3.715 5.324a29.4 29.4 0 0 0-2.777 5.89c-.488 1.603 1.647 3.987 3.103 4.414a17.8 17.8 0 0 0 5.084.574h.998c.303.462.848 1.23 1.27 1.536c.284.206.628.313.978.302c0 0 1.026.191 4.157-1.676a15.6 15.6 0 0 0 3.179-2.441a1.67 1.67 0 0 0 .411-1.096c0-.831-.766-1.625-1.283-2.216a15.7 15.7 0 0 0-3.141-2.48c-.373-.224-2.261-1.328-3.592-1.617a20 20 0 0 0 1.007-2.607a2.8 2.8 0 0 0-.265-1.727c-.405-.795-1.316-1.953-2.11-2.35z" strokeWidth={1}></path><path fill="#9bff00" stroke="#00034a" strokeMiterlimit={10} d="M38.178 30.91a17.8 17.8 0 0 0-2.058-4.692c-.24-.431-.518-.861-.786-1.283q.282-.225.517-.498a1.58 1.58 0 0 0 .201-1.916c-.374-.61-.344-.956-3.533-2.756a16.3 16.3 0 0 0-3.696-1.542a1.705 1.705 0 0 0-1.915 1.1a16 16 0 0 0-.517 3.927c0 .507 0 3.341.623 4.442c.185.312.457.562.784.72c-1.45.012-2.894.18-4.308.497c-2.141.953-2.448 3.867-.552 5.245q.26.188.552.318a29.5 29.5 0 0 0 6.472.556a29.4 29.4 0 0 0 6.463-.556c1.705-.421 1.955-2.728 1.753-3.562Z" strokeWidth={1}></path><path stroke="#00034a" strokeLinecap="round" strokeMiterlimit={10} d="M27.014 27.664a1.59 1.59 0 0 0 1.78.805a5 5 0 0 0 .68-.202c.23.45.48.9.718 1.322" strokeWidth={1}></path><path fill="#9bff00" stroke="#00034a" strokeMiterlimit={10} d="M17.342 2.891a18.2 18.2 0 0 0-2.815 4.282c-.221.44-.431.957-.642 1.369a3.3 3.3 0 0 0-.69-.163a1.57 1.57 0 0 0-1.724.88c-.303.655-.641.834-.383 4.472c.079 1.34.323 2.666.73 3.946a1.695 1.695 0 0 0 1.914.957a15.7 15.7 0 0 0 3.61-1.742c.422-.268 2.806-1.81 3.38-2.94c.156-.328.216-.693.172-1.054a20 20 0 0 0 2.777 3.333a2.81 2.81 0 0 0 3.313 0a2.87 2.87 0 0 0 1.34-3.035a29.3 29.3 0 0 0-3.073-5.746a29.5 29.5 0 0 0-3.993-5.123c-1.216-1.101-3.284-.096-3.916.564Z" strokeWidth={1}></path><path stroke="#00034a" strokeLinecap="round" strokeMiterlimit={10} d="M20.76 13.99a1.6 1.6 0 0 0-.296-1.916a5 5 0 0 0-.546-.46c.248-.44.498-.889.718-1.32" strokeWidth={1}></path><path fill="#9bff00" stroke="#00034a" strokeMiterlimit={10} d="M3.209 34.625c1.657.436 3.37.629 5.084.575h1.513q.05.356.163.699a1.59 1.59 0 0 0 1.57 1.14c.721-.021 1.024.19 4.156-1.676a15.6 15.6 0 0 0 3.179-2.442a1.666 1.666 0 0 0 0-2.193a15.7 15.7 0 0 0-3.141-2.48c-.43-.258-2.873-1.685-4.156-1.685a1.9 1.9 0 0 0-1.015.316a19.8 19.8 0 0 0 1.714-3.975a2.8 2.8 0 0 0-1.503-2.958a2.805 2.805 0 0 0-3.304.172a29 29 0 0 0-3.715 5.324a29.4 29.4 0 0 0-2.777 5.89c-.507 1.667 1.35 3.036 2.23 3.294z" strokeWidth={1}></path><path stroke="#00034a" strokeLinecap="round" strokeMiterlimit={10} d="M11.558 26.563a1.59 1.59 0 0 0-1.57 1.14a4.4 4.4 0 0 0-.163.698c-.507 0-1.015-.048-1.512-.048" strokeWidth={1}></path></g><defs><clipPath id="SVGw9scfcdR"><path fill="#fff" d="M0 0h40v40H0z"></path></clipPath></defs></g></svg>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {category.title}
                  </h3>
                  <p className="text-white/80">
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
                      href="https://x.com/"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#1DA1F2' }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#1877F2' }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#0A66C2' }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.5 8h4V24h-4V8zm7.5 0h3.837v2.186h.054c.534-1.012 1.84-2.08 3.787-2.08C19.74 8.106 22 9.87 22 13.584V24h-4v-8.648c0-2.062-.737-3.469-2.583-3.469c-1.409 0-2.247.949-2.615 1.865c-.135.33-.169.79-.169 1.252V24h-4V8z"/>
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
                {t('about.cta.title')} {t('about.cta.titleAccent')}
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 128 128"><path fill="#fdd835" d="m68.05 7.23l13.46 30.7a7.05 7.05 0 0 0 5.82 4.19l32.79 2.94c3.71.54 5.19 5.09 2.5 7.71l-24.7 20.75c-2 1.68-2.91 4.32-2.36 6.87l7.18 33.61c.63 3.69-3.24 6.51-6.56 4.76L67.56 102a7.03 7.03 0 0 0-7.12 0l-28.62 16.75c-3.31 1.74-7.19-1.07-6.56-4.76l7.18-33.61c.54-2.55-.36-5.19-2.36-6.87L5.37 52.78c-2.68-2.61-1.2-7.17 2.5-7.71l32.79-2.94a7.05 7.05 0 0 0 5.82-4.19l13.46-30.7c1.67-3.36 6.45-3.36 8.11-.01"></path><path fill="#ffff8d" d="m67.07 39.77l-2.28-22.62c-.09-1.26-.35-3.42 1.67-3.42c1.6 0 2.47 3.33 2.47 3.33l6.84 18.16c2.58 6.91 1.52 9.28-.97 10.68c-2.86 1.6-7.08.35-7.73-6.13"></path><path fill="#f4b400" d="M95.28 71.51L114.9 56.2c.97-.81 2.72-2.1 1.32-3.57c-1.11-1.16-4.11.51-4.11.51l-17.17 6.71c-5.12 1.77-8.52 4.39-8.82 7.69c-.39 4.4 3.56 7.79 9.16 3.97"></path></svg>
                   </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.cta.trustIndicators.certifiedProfessionals.title')}</h3>
                  <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-sm`}>{t('about.cta.trustIndicators.certifiedProfessionals.description')}</p>
                 </div>

                 <div className={`rounded-2xl p-6 shadow-lg border ${
                   isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                 }`}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#2f88ff" stroke="#000" d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"></path><path stroke="#fff" strokeLinecap="round" d="M16 24L22 30L34 18"></path></g></svg>
                   </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.cta.trustIndicators.provenResults.title')}</h3>
                  <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-sm`}>{t('about.cta.trustIndicators.provenResults.description')}</p>
                 </div>

                 <div className={`rounded-2xl p-6 shadow-lg border ${
                   isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                 }`}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 128 128"><path fill="#b0bec5" d="M16.77 19.75c-1 0-1.7.8-1.7 1.8v.1c-1.5 25.91 3.03 59.27 24.01 83.52c12.1 14.7 23.91 18.53 24.51 18.73c0 0 .28.09.54.09s.57-.1.57-.1c.5-.2 12.48-4.02 24.49-18.72c19.91-24.21 24.01-58.82 24.01-83.52v-.1c0-1-.8-1.8-1.7-1.8c-.3 0-29.11-1-46.01-15.3c-.7-.6-1.7-.6-2.4 0c-17.11 14.2-46.02 15.2-46.32 15.3"></path><path fill="#84b0c1" d="M111.49 19.75c-.3 0-29.11-1-46.01-15.3c-.4-.35-.83-.45-1.24-.45h-.11v120c.27-.01.62-.11.62-.12c.6-.25 12.44-4 24.44-18.7c19.91-24.21 24.01-58.82 24.01-83.52v-.1c0-1.01-.8-1.81-1.71-1.81"></path><path fill="#2f7889" d="M26.33 28.31c-.82 0-1.02 1.02-1.02 1.74v.1c0 19.72 3.06 47.4 19 66.71c9.6 11.75 19 14.81 19.41 14.91l.41.1l.41-.1c.41-.1 9.81-3.17 19.41-14.91c15.94-19.31 19-46.89 19-66.71v-.1c0-.82-.41-1.43-1.23-1.43h.1c-.2 0-23.19-.82-36.67-12.16c-1.19-.98-1.94-.2-1.94-.2C49.63 27.6 26.64 28.31 26.33 28.31"></path><path fill="#c9e3e6" d="M29.18 30.07c-.76 0-.94.96-.94 1.64v.1c0 18.57 2.83 44.65 17.57 62.84c8.88 11.07 17.57 13.95 17.95 14.05l.38.1l.38-.1c.38-.1 9.07-2.98 17.95-14.05c14.73-18.19 17.57-44.17 17.57-62.84v-.1c0-.77-.38-1.35-1.13-1.35H99c-.19 0-21.44-.77-33.91-11.45c-.94-.95-1.79-.19-1.79-.19C50.72 29.4 29.47 30.07 29.18 30.07"></path><path fill="#b0bec5" d="M98.89 30.36h.09c-.19 0-21.44-.77-33.91-11.45c-.34-.34-.66-.46-.94-.47v90.35l.38-.1c.38-.1 9.07-2.98 17.95-14.05c14.73-18.19 17.57-44.17 17.57-62.84v-.1c-.01-.76-.38-1.34-1.14-1.34"></path><circle cx={70.63} cy={14.44} r={1.93} fill="#37474f"></circle><circle cx={82.21} cy={19.67} r={1.93} fill="#37474f"></circle><circle cx={95.01} cy={23.21} r={1.93} fill="#37474f"></circle><circle cx={108.15} cy={25.14} r={1.93} fill="#37474f"></circle><circle cx={108.57} cy={36.94} r={1.93} fill="#37474f"></circle><circle cx={107.02} cy={50.76} r={1.93} fill="#37474f"></circle><circle cx={64.08} cy={118.11} r={1.93} fill="#37474f"></circle><circle cx={75.4} cy={112.71} r={1.93} fill="#37474f"></circle><circle cx={85.74} cy={102.71} r={1.93} fill="#37474f"></circle><circle cx={93.81} cy={91.27} r={1.93} fill="#37474f"></circle><circle cx={99.67} cy={79} r={1.93} fill="#37474f"></circle><circle cx={104.27} cy={64.65} r={1.93} fill="#37474f"></circle><circle cx={70.15} cy={13.8} r={1.93} fill="#b9e4ea"></circle><circle cx={81.73} cy={19.03} r={1.93} fill="#b9e4ea"></circle><circle cx={94.53} cy={22.57} r={1.93} fill="#b9e4ea"></circle><circle cx={107.66} cy={24.5} r={1.93} fill="#b9e4ea"></circle><circle cx={108.09} cy={36.3} r={1.93} fill="#b9e4ea"></circle><circle cx={106.53} cy={50.12} r={1.93} fill="#b9e4ea"></circle><circle cx={63.6} cy={117.47} r={1.93} fill="#eee"></circle><circle cx={74.92} cy={112.07} r={1.93} fill="#b9e4ea"></circle><circle cx={85.26} cy={102.07} r={1.93} fill="#b9e4ea"></circle><circle cx={93.33} cy={90.63} r={1.93} fill="#b9e4ea"></circle><circle cx={99.19} cy={78.36} r={1.93} fill="#b9e4ea"></circle><circle cx={103.79} cy={64.01} r={1.93} fill="#b9e4ea"></circle><circle cx={57.97} cy={14.44} r={1.93} fill="#2f7889"></circle><circle cx={46.39} cy={19.67} r={1.93} fill="#2f7889"></circle><circle cx={33.59} cy={23.21} r={1.93} fill="#2f7889"></circle><circle cx={20.45} cy={25.14} r={1.93} fill="#2f7889"></circle><circle cx={20.02} cy={36.94} r={1.93} fill="#2f7889"></circle><circle cx={21.58} cy={50.76} r={1.93} fill="#2f7889"></circle><circle cx={53.19} cy={112.71} r={1.93} fill="#2f7889"></circle><circle cx={42.86} cy={102.71} r={1.93} fill="#2f7889"></circle><circle cx={34.79} cy={91.27} r={1.93} fill="#2f7889"></circle><circle cx={28.92} cy={79} r={1.93} fill="#2f7889"></circle><circle cx={24.33} cy={64.65} r={1.93} fill="#2f7889"></circle><circle cx={57.54} cy={13.8} r={1.93} fill="#eee"></circle><circle cx={45.95} cy={19.03} r={1.93} fill="#eee"></circle><circle cx={33.16} cy={22.57} r={1.93} fill="#eee"></circle><circle cx={20.02} cy={24.5} r={1.93} fill="#eee"></circle><circle cx={19.59} cy={36.3} r={1.93} fill="#eee"></circle><circle cx={21.15} cy={50.12} r={1.93} fill="#eee"></circle><circle cx={52.76} cy={112.07} r={1.93} fill="#eee"></circle><circle cx={42.42} cy={102.07} r={1.93} fill="#eee"></circle><circle cx={34.36} cy={90.63} r={1.93} fill="#eee"></circle><circle cx={28.49} cy={78.36} r={1.93} fill="#eee"></circle><circle cx={23.89} cy={64.01} r={1.93} fill="#eee"></circle></svg>
                   </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.cta.trustIndicators.personalizedCare.title')}</h3>
                  <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-sm`}>{t('about.cta.trustIndicators.personalizedCare.description')}</p>
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


