import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import ClassesTimetable from '../components/ClassesTimetable'
import WellnessProgress from '../components/WellnessProgress'
import PricingPlans from '../components/PricingPlans'
import WellnessServicesGrid from '../components/WellnessServicesGrid'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function Services() {
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

  // Smooth scroll to section if hash is present
  useEffect(() => {
    const { hash } = window.location
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 0)
      }
    }
  }, [])

  const user = getCurrentUser()
  const capabilities = [
    { key: 'UI/UX', title: t('services.capabilities.uiux.title'), points: t('services.capabilities.uiux.points', { returnObjects: true }) },
    { key: 'Frontend', title: t('services.capabilities.frontend.title'), points: t('services.capabilities.frontend.points', { returnObjects: true }) },
    { key: 'Integration', title: t('services.capabilities.integration.title'), points: t('services.capabilities.integration.points', { returnObjects: true }) },
    { key: 'Performance', title: t('services.capabilities.performance.title'), points: t('services.capabilities.performance.points', { returnObjects: true }) },
    { key: 'Testing', title: t('services.capabilities.testing.title'), points: t('services.capabilities.testing.points', { returnObjects: true }) },
    { key: 'DX', title: t('services.capabilities.dx.title'), points: t('services.capabilities.dx.points', { returnObjects: true }) }
  ]
  const [activeCapability, setActiveCapability] = useState(capabilities[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isWheelHovered, setIsWheelHovered] = useState(false)
  const servicesSectionRef = useRef(null)

  // Auto-cycle active capability when not hovered
  useEffect(() => {
    if (isWheelHovered) return
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % capabilities.length)
    }, 2200)
    return () => clearInterval(id)
  }, [isWheelHovered, capabilities.length])

  // Sync capability text with active index
  useEffect(() => {
    setActiveCapability(capabilities[activeIndex])
  }, [activeIndex])


  function handleLogout() {
    logoutUser()
    navigate('/login', { replace: true })
  }
  const benefits = [
    t('services.cta.benefits.verifiedProfessionals'),
    t('services.cta.benefits.onTimeDelivery'),
    t('services.cta.benefits.affordablePricing'),
    t('services.cta.benefits.flexibleCollaboration')
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
          <source src="/63S.mp4" type="video/mp4" />
          {t('services.video.notSupported')}
        </video>

        {/* Overlay (darken video for readability) */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight text-white">
            {t('services.showcase.title')}
          </h1>
          <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
            {t('services.showcase.subtitle')}
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            {/* Primary Button */}
            <a
              href="/services"
              className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#4CAF50' }}
            >
              {t('services.showcase.exploreButton')}
            </a>

            {/* Secondary Button */}
            <a
              href="/contact"
              className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#4CAF50' }}
            >
              {t('services.showcase.reachOutButton')}
            </a>
          </div>
        </div>
      </section>

      {/* 2) Flipbox Grid: Six wellness services with 3D flip cards */}
<section
      ref={servicesSectionRef}
      id="offerings"
      className={`py-20 transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >        <div className="mx-auto max-w-6xl px-4">
          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        {t('services.offerings.title')}
      </h2>
      <p className={`${isDark ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto`}>
        {t('services.offerings.subtitle')}
      </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                t: t('services.offerings.cards.websiteDevelopment.title'),
                d: t('services.offerings.cards.websiteDevelopment.description'),
                path: '/services/sports-training',
                icon: (
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                    <path fill="#b7d5e5" d="M106 24.79H22.15c-1.92 0-3.48 1.56-3.48 3.48v57.59c0 1.92 1.56 3.48 3.48 3.48H106c1.92 0 3.48-1.56 3.48-3.48V28.27c0-1.92-1.55-3.48-3.48-3.48"></path>
                    <radialGradient id="SVG8yic8bdE" cx={48.408} cy={13.024} r={75.465} gradientTransform="matrix(1 0 0 1.0843 0 -10.19)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#2f7889"></stop>
                      <stop offset={1} stopColor="#424242"></stop>
                    </radialGradient>
                    <path fill="url(#SVG8yic8bdE)" d="M104.75 83.2H23.4l.96-52.27h79.43z"></path>
                    <path fill="#2f7889" d="M121.09 123.82H7.59q-.645 0-1.2-.09c-2.88-.44-4.21-4.18-2.5-6.74l.39-.59h119.59l.4.6c1.86 2.78.12 6.76-3.04 6.81c-.04.01-.09.01-.14.01"></path>
                    <path fill="#eee" d="M106.84 90.41H20.6c-1.27 0-2.54.77-3.25 1.99l-14 25.48c-.59.88-.01 2.12.99 2.12H123.8c1 0 1.58-1.24.99-2.12l-14.71-25.63c-.7-1.08-1.97-1.84-3.24-1.84"></path>
                    <path fill="#b7d5e5" d="M86.36 115.52H41.8l2.85-7.98h39.07z"></path>
                    <path fill="#69a1ba" d="m72.69 94.84l-.27-2.2h-3.44l.13 2.2zm-5.55 0l-.14-2.2h-3.45v2.2zm26.47 0l-.81-2.2h-3.26l.68 2.2zm-5.25 0l-.68-2.2h-3.32l.54 2.2zm-5.18 0l-.54-2.2h-3.37l.41 2.2zm18.93 0l-.95-2.2h-6.71l.82 2.2zm-24.5 0l-.41-2.2h-3.41l.28 2.2zm-43.85 0l.68-2.2h-3.26l-.81 2.2zm16.75 0l.27-2.2h-3.41l-.4 2.2zm-11.16 0l.54-2.2h-3.32l-.67 2.2zm-11.18 0l.81-2.2H25.8l-.95 2.2zm16.76 0l.41-2.2h-3.37l-.54 2.2zm11.15 0l.14-2.2h-3.44l-.27 2.2zm5.57 0v-2.2H58.2l-.14 2.2zm22.13 8.89H44.36l-.75 2.2h41.08zm18.37 2.2l-1.21-2.2h6.54l.95 2.2zm-15.4 0l-.83-2.2h6.29l.96 2.2zm8.64 0l-.96-2.2h4.31l1.1 2.2zm-69.72 0l1.21-2.2h-6.54l-.95 2.2zm15.4 0l.83-2.2h-6.29l-.96 2.2zm-8.65 0l.97-2.2h-4.31l-1.11 2.2zm-2.71-7.42l.82-2.19h-6.67l-.95 2.19zm68.24 0l-.81-2.19h6.66l.95 2.19zm-1.7 0l-.96-2.19h-3.85l.82 2.19zm-10.02 0l-.65-2.19h3.85l.78 2.19zm-6.04 0l-.47-2.19h3.85l.6 2.19zm-6.04 0l-.28-2.19h3.84l.43 2.19zm-6.03 0l-.11-2.19h3.85l.24 2.19zm-6.04 0l.07-2.19H66l.06 2.19zm-6.04 0l.25-2.19h3.85l-.11 2.19zm-6.03 0l.42-2.19h3.85l-.29 2.19zm-6.04 0l.6-2.19h3.85l-.47 2.19zm-6.04 0l.78-2.19h3.85l-.64 2.19zm-6.03 0l.95-2.19h3.85l-.82 2.19zm-2.2 3.71l.81-2.2h-8.75l-.95 2.2zm66.17 0l-.77-2.2h-4.17l.64 2.2zm-10.94 0l-.48-2.2h4.16l.62 2.2zm-6.65 0l-.32-2.2h4.17l.45 2.2zm-6.64 0l-.17-2.2h4.17l.3 2.2zm-6.64 0l-.01-2.2h4.16l.15 2.2zm-6.64 0l.14-2.2h4.17l-.01 2.2zm-6.65 0l.3-2.2h4.17l-.17 2.2zm-6.64 0l.46-2.2h4.16l-.32 2.2zm-6.64 0l.61-2.2h4.17l-.48 2.2zm-6.65 0l.77-2.2h4.17l-.63 2.2zm65.69 0l-.82-2.2h8.75l.95 2.2z" opacity={0.57}></path>
                    <path fill="#b7d5e5" d="M124.73 117.88L110.39 92.4c-.71-1.07-1.98-1.84-3.25-1.84c0 0 1.22 1.1 1.59 1.63l12.59 23.59c.56 1.02-.18 2.26-1.34 2.26H7.96c-1.15 0-1.89-1.23-1.35-2.24l11.95-23.18c.35-.6 1.88-1.99 1.88-1.99h-.45c-1.27 0-2.54.77-3.25 1.99L3.28 117.88c-.59.88-.01 2.12.99 2.12h119.46c1.01 0 1.59-1.24 1-2.12"></path>
                    <path fill="none" stroke="#eee" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={2.936} d="M25.97 28.02h13.21"></path>
                    <path fill="#75a7bc" d="M109.37 30.11c0-1.04-1.01-1.12-1.01.11v55.8c0 1.34-1.09 2.43-2.43 2.43H22.08c-1.34 0-2.43-1.09-2.43-2.43v-55.8c0-1.23-1.01-1.15-1.01-.11l-.95 55.91c0 2.42 1.24 4.39 4.39 4.39h83.85c2.73 0 4.39-1.97 4.39-4.39z"></path>
                  </svg>
                )
              },
              {
                t: t('wellnessServices.nutritionPlans.title'),
                d: t('wellnessServices.nutritionPlans.description'),
                path: '/services/nutrition-plans',
                icon: (
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                    <path d="M12 2C9 5 9 9 12 12c3-3 3-7 0-10z"/>
                    <path d="M5 22c2-6 7-6 9 0"/>
                    <circle cx="19" cy="5" r="2"/>
                  </svg>
                )
              },
              { 
                t: t('services.offerings.cards.spaTherapies.title'), 
                d: t('services.offerings.cards.spaTherapies.description'), 
                path: '/services/spa-therapies',
                icon: (
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                    <circle cx={117.33} cy={9.69} r={5.69} fill="#f44336"></circle>
                    <path fill="none" stroke="#84b0c1" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={4.913} d="M80.09 78.38s9.51 12.8 9.51 17.85s-4.1 9.15-9.15 9.15c-4.31 0-58.2-.11-64.15-.11s-9.32 3.49-9.32 3.49"></path>
                    <path fill="none" stroke="#84b0c1" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={4.913} d="M58.83 77.13s10.6 14.05 10.6 19.11s-4.64 9.12-9.69 9.12"></path>
                    <path fill="#2f7889" d="M82.77 86.73c-2.01-3.44-3.64-5.44-6.26-9.02c0 0 .69.15 2.55.15s3.2-.59 3.2-.59c2.64 3.73 3.43 4.68 4.84 7.18c0 0-.05 1.63-1.35 2.49s-2.98-.21-2.98-.21m-20.21.17c-2.79-4.26-5.02-7.51-5.02-7.51l6 .14s2.69 3.61 4.23 6.47c0 0 .23 1.3-1.49 1.98c-1.72.66-3.72-1.08-3.72-1.08"></path>
                    <path fill="none" stroke="#84b0c1" strokeMiterlimit={10} strokeWidth={4.913} d="m80.11 78.64l-69.94-4.66c-.23-.02-.4-.2-.4-.43V34.5c0-.37.29-.68.66-.7l88.63-5.64c.86-.06 1.48.8 1.17 1.6L81.41 77.82c-.21.53-.73.86-1.3.82z"></path>
                    <path fill="none" stroke="#84b0c1" strokeMiterlimit={10} strokeWidth={2.948} d="M23.67 33.06L21.83 74.5m17.71-42.52l-5.75 43.41M55.42 30.9l-9.67 45.38M71.3 29.82L57.71 77.17m29.46-48.43l-17.5 49.32M8.29 48.48l85.56-2.94M9.08 62.11h79.4"></path>
                    <circle cx={80.41} cy={116.46} r={7.54} fill="#424242"></circle>
                    <path fill="#84b0c1" d="M75.55 106.08h9.73l-2.32 10.09c-.22 1.57-1.29 2.71-2.54 2.71s-2.33-1.14-2.54-2.71z"></path>
                    <path fill="#a8e3f0" d="M81.97 116.53c-.18.66-.51 1.41-1.18 1.58c-2.42.62-2.76-5.33-1.54-6.35c.74-.62 2.28-.73 2.93.04c.83.98.1 3.64-.21 4.73"></path>
                    <path fill="#2f7889" d="M80.53 109.65c-1.61 0-2.75-.95-3.31-1.54a.283.283 0 0 1 .19-.48c1.04-.05 2.08-.04 3.11-.07c1.04.03 2.08.02 3.11.07c.24.01.36.31.19.48c-.53.59-1.68 1.54-3.29 1.54"></path>
                    <path fill="#757575" d="M78.04 119.02c.65.75 1.69 1.1 2.68.98c.98-.12 1.88-.7 2.47-1.5c.34-.47.58-1.01.97-1.44s1.01-.73 1.55-.51c.76.3.86 1.36.6 2.13a6.08 6.08 0 0 1-3.09 3.56c-.99.49-2.37.69-3.47.58c-2.11-.22-4.38-2.13-5.12-4.09c-.4-1.05-.75-3.16 1.34-2.68c.97.23 1.29 2.07 2.07 2.97"></path>
                    <path fill="none" stroke="#84b0c1" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={4.913} d="m99.82 30.71l4.61-11.27c1.88-4.6 3.27-5.63 6.06-6.88l6.53-2.65"></path>
                    <circle cx={19.6} cy={116.46} r={7.54} fill="#424242"></circle>
                    <path fill="#84b0c1" d="M14.73 106.08h9.73l-2.32 10.09c-.22 1.57-1.29 2.71-2.54 2.71s-2.33-1.14-2.54-2.71z"></path>
                    <path fill="#a8e3f0" d="M21.16 116.53c-.18.66-.51 1.41-1.18 1.58c-2.42.62-2.76-5.33-1.54-6.35c.74-.62 2.28-.73 2.93.04c.83.98.09 3.64-.21 4.73"></path>
                    <path fill="#2f7889" d="M19.72 109.65c-1.61 0-2.75-.95-3.31-1.54a.283.283 0 0 1 .19-.48c1.04-.05 2.08-.04 3.11-.07c1.04.03 2.08.02 3.11.07c.24.01.36.31.19.48c-.54.59-1.69 1.54-3.29 1.54"></path>
                    <path fill="#757575" d="M17.22 119.02c.65.75 1.69 1.1 2.68.98c.98-.12 1.88-.7 2.47-1.5c.34-.47.58-1.01.97-1.44s1.01-.73 1.55-.51c.76.3.86 1.36.6 2.13a6.08 6.08 0 0 1-3.09 3.56c-.99.49-2.37.69-3.47.58c-2.11-.22-4.38-2.13-5.12-4.09c-.4-1.05-.75-3.16 1.34-2.68c.97.23 1.29 2.07 2.07 2.97"></path>
                  </svg>
                )
              },
              { 
                t: t('services.offerings.cards.holisticHealing.title'), 
                d: t('services.offerings.cards.holisticHealing.description'), 
                path: '/services/holistic-healing',
                icon: (
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#9C27B0" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                )
              },
              { 
                t: t('services.offerings.cards.digitalMarketing.title'), 
                d: t('services.offerings.cards.digitalMarketing.description'), 
                path: '/services/mindful-living',
                icon: (
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <g fill="none" strokeWidth={3}>
                      <path fill="#fff" d="M42.377 11.323c.664-3.235.657-6.087.601-7.43a.9.9 0 0 0-.869-.87a31.7 31.7 0 0 0-7.43.601c-.753.154-1.002 1.075-.46 1.618l6.54 6.54c.544.543 1.464.293 1.618-.459"></path>
                      <path fill="#8fbffa" d="M5.267 44.96c-1.128-.037-1.992-.719-2.106-1.841C3.07 42.239 3 40.932 3 39s.072-3.24.16-4.119c.115-1.122.979-1.804 2.107-1.842C5.934 33.017 6.827 33 8 33s2.066.017 2.733.04c1.128.037 1.992.719 2.106 1.841c.09.88.161 2.187.161 4.119s-.072 3.24-.16 4.119c-.115 1.122-.979 1.804-2.107 1.842c-.668.022-1.56.039-2.733.039s-2.066-.017-2.733-.04m32.29-.026c-1.3-.08-2.203-1.018-2.297-2.317C35.132 40.856 35 37.667 35 32s.132-8.856.26-10.617c.094-1.299.997-2.238 2.297-2.317C38.187 19.027 38.99 19 40 19s1.813.027 2.443.066c1.3.08 2.203 1.018 2.297 2.317c.128 1.761.26 4.95.26 10.617s-.132 8.856-.26 10.617c-.094 1.299-.997 2.238-2.297 2.317c-.63.039-1.432.066-2.443.066c-1.01 0-1.813-.027-2.443-.066m-16.057.018c-1.264-.055-2.187-.9-2.293-2.16C19.098 41.494 19 39.386 19 36s.098-5.494.207-6.792c.106-1.26 1.029-2.105 2.292-2.16A57 57 0 0 1 24 27c1.042 0 1.862.02 2.5.048c1.264.055 2.187.9 2.293 2.16c.109 1.298.207 3.406.207 6.792s-.098 5.494-.207 6.792c-.106 1.26-1.029 2.105-2.292 2.16c-.639.028-1.459.048-2.501.048a58 58 0 0 1-2.5-.048"></path>
                      <path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M5 26c5.86-6.959 11.184-10.966 13.613-12.612c.794-.539 1.841-.363 2.444.383a95 95 0 0 1 3.31 4.377c.808 1.132 2.513 1.168 3.408.104C31.911 13.34 37.501 8.5 37.501 8.5"></path>
                      <path stroke="#2859c5" strokeLinecap="round" strokeLinejoin="round" d="M42.376 11.323c.664-3.235.657-6.087.601-7.43a.9.9 0 0 0-.869-.87a31.7 31.7 0 0 0-7.43.601c-.753.154-1.002 1.075-.46 1.618l6.54 6.54c.544.543 1.464.293 1.618-.459M5.267 44.96c-1.128-.037-1.992-.719-2.106-1.841C3.07 42.239 3 40.932 3 39s.072-3.24.16-4.119c.115-1.122.979-1.804 2.107-1.842C5.934 33.017 6.827 33 8 33s2.066.017 2.733.04c1.128.037 1.992.719 2.106 1.841c.09.88.161 2.187.161 4.119s-.072 3.24-.16 4.119c-.115 1.122-.979 1.804-2.107 1.842c-.668.022-1.56.039-2.733.039s-2.066-.017-2.733-.04m32.29-.026c-1.3-.08-2.203-1.018-2.297-2.317C35.132 40.856 35 37.667 35 32s.132-8.856.26-10.617c.094-1.299.997-2.238 2.297-2.317C38.187 19.027 38.99 19 40 19s1.813.027 2.443.066c1.3.08 2.203 1.018 2.297 2.317c.128 1.761.26 4.95.26 10.617s-.132 8.856-.26 10.617c-.094 1.299-.997 2.238-2.297 2.317c-.63.039-1.432.066-2.443.066c-1.01 0-1.813-.027-2.443-.066m-16.057.018c-1.264-.055-2.187-.9-2.293-2.16C19.098 41.494 19 39.386 19 36s.098-5.494.207-6.792c.106-1.26 1.029-2.105 2.292-2.16A57 57 0 0 1 24 27c1.042 0 1.862.02 2.5.048c1.264.055 2.187.9 2.293 2.16c.109 1.298.207 3.406.207 6.792s-.098 5.494-.207 6.792c-.106 1.26-1.029 2.105-2.292 2.16c-.639.028-1.459.048-2.501.048a58 58 0 0 1-2.5-.048"></path>
                    </g>
                  </svg>
                )
              },
              { 
                t: t('services.offerings.cards.ongoingSupport.title'), 
                d: t('services.offerings.cards.ongoingSupport.description'), 
                path: '/services/wellness-events',
                icon: (
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="none">
                      <path d="M0 0h24v24H0z"></path>
                      <path fill="#42a5f5" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.49.49 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.6.6 0 0 0-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1q.09.03.18.03c.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64zm-1.98-1.71c.04.31.05.52.05.73s-.02.43-.05.73l-.14 1.13l.89.7l1.08.84l-.7 1.21l-1.27-.51l-1.04-.42l-.9.68c-.43.32-.84.56-1.25.73l-1.06.43l-.16 1.13l-.2 1.35h-1.4l-.19-1.35l-.16-1.13l-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7l-1.06.43l-1.27.51l-.7-1.21l1.08-.84l.89-.7l-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13l-.89-.7l-1.08-.84l.7-1.21l1.27.51l1.04.42l.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43l.16-1.13l.2-1.35h1.39l.19 1.35l.16 1.13l1.06.43c.43.18.83.41 1.23.71l.91.7l1.06-.43l1.27-.51l.7 1.21l-1.07.85l-.89.7zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"></path>
                    </g>
                  </svg>
                )
              },
            ].map((card, idx) => (
              <article
                key={card.t}
                className="[perspective:1000px] animate-slide-up"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="group relative h-56 w-full rounded-2xl border border-black/10 [transform-style:preserve-3d] transition-transform duration-500 hover:[transform:rotateY(180deg)]">
                  {/* front */}
                  <div className="absolute inset-0 rounded-2xl bg-white p-6 [backface-visibility:hidden]">
                    <div className="h-20 w-20 rounded-lg border-2 grid place-items-center transition-all duration-500 hover:scale-110 hover:rotate-6" style={{ borderColor: '#4CAF50' }} onMouseEnter={(e) => e.target.style.borderColor = '#45a049'} onMouseLeave={(e) => e.target.style.borderColor = '#4CAF50'}>
                      {card.icon}
                    </div>
                    <h3 className={`mt-4 text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{card.t}</h3>
                    <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} line-clamp-3`} dangerouslySetInnerHTML={{ __html: card.d }}></p>
                  </div>
                  {/* back */}
                  <div className="absolute inset-0 rounded-2xl bg-black text-white p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <h3 className="text-lg font-semibold mb-2">{card.t}</h3>
                    <p className="mt-2 text-white/80 text-sm">
                      {t('services.offerings.cards.backDescription')}
                    </p>
                    <button
                      onClick={() => navigate(card.path)}
                      className="btn-animate-strong mt-4 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl"
                      style={{ backgroundColor: '#4CAF50' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
                    >
                      {t('services.offerings.cards.learnMoreButton')}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          </ScrollAnimation>
        </div>
      </section>
      {/* Wellness services grid (third section) */}
      <WellnessServicesGrid />

      {/* Pricing section with fixed background image */}
      <PricingPlans />

      {/* Wellness progress section (before timetable) */}
      <WellnessProgress />

      {/* Classes Timetable */}
      <ClassesTimetable />

      {/* 6) CTA - Health & Wellness consultation */}
      <section id="cta" className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('services.cta.title')}
            </h2>
            <p className={`mt-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('services.cta.subtitle')}
            </p>
                <a
                  href="/contact"
              className="btn-animate-strong inline-flex items-center justify-center rounded-lg px-8 py-4 font-semibold text-lg text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#4CAF50' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              {t('services.cta.button')}
                </a>
              </div>
          <div className="relative">
            <img
              src="/images/63S9.jpg"
              alt={t('services.cta.consultationImage')}
              className="w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute left-4 top-8">
              <div className="mb-3 rounded-full bg-white/90 text-gray-900 px-5 py-3 text-sm font-semibold shadow">{t('services.cta.badges.personalizedSupport')}</div>
              <div className="mb-3 rounded-full bg-white/90 text-gray-900 px-5 py-3 text-sm font-semibold shadow">{t('services.cta.badges.growthFocusedTools')}</div>
              <div className="rounded-full bg-white/90 text-gray-900 px-5 py-3 text-sm font-semibold shadow">{t('services.cta.badges.safeConfidential')}</div>
                </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


