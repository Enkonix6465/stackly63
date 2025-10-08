import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import { ThemeDebug } from '../components/theme-debug'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import BmiCalculator from '../components/BmiCalculator'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  const user = getCurrentUser()

  function handleLogout() {
    logoutUser()
    navigate('/login', { replace: true })
  }
  const [isDark, setIsDark] = useState(false)
  const [servicesSectionVisible, setServicesSectionVisible] = useState(false)
  const servicesSectionRef = useRef(null)
  const [openService, setOpenService] = useState('body-balance')

  const toggleService = (serviceId) => {
    setOpenService(openService === serviceId ? null : serviceId)
  }

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Intersection Observer for Services section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setServicesSectionVisible(true)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before section is fully visible
      }
    )

    if (servicesSectionRef.current) {
      observer.observe(servicesSectionRef.current)
    }

    return () => {
      if (servicesSectionRef.current) {
        observer.unobserve(servicesSectionRef.current)
      }
    }
  }, [])

  const blogPosts = [
    {
      title: t('home.blog.posts.gettingStarted.title'),
      excerpt: t('home.blog.posts.gettingStarted.excerpt'),
      image: "/images/healthcare.jpg",
    },
    {
      title: t('home.blog.posts.highPayingClients.title'),
      excerpt: t('home.blog.posts.highPayingClients.excerpt'),
      image: "/images/healthcare.jpg",
    },
    {
      title: t('home.blog.posts.multipleProjects.title'),
      excerpt: t('home.blog.posts.multipleProjects.excerpt'),
      image: "/images/healthcare.jpg",
    },
  ]

  const displayedBlogs = blogPosts

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <Navbar user={user} />
      <ThemeDebug />


{/* 1 Showcase */}
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
    <source src="/63Home1.mp4" type="video/mp4" />
{t('common.videoNotSupported')}
  </video>

  {/* Overlay (darken video for readability) */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
      <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-white whitespace-nowrap">
        {t('home.showcase.title')}
      </h1>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
      <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
        {t('home.showcase.subtitle')}
      </p>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
      <div className="mt-8 flex gap-4 justify-center">
        {/* Primary Button */}
        <a
          href="/services"
          className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
          style={{ backgroundColor: '#4CAF50' }}
        >
          {t('home.showcase.exploreButton')}
        </a>

        {/* Secondary Button */}
        <a
          href="/contact"
          className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 shadow-lg hover:shadow-xl"
        >
          {t('home.showcase.reachOutButton')}
        </a>
      </div>
    </ScrollAnimation>
  </div>
</section>

      {/* Welcome Section - Health & Wellness Data */}
      <section
        id="welcome"
        className={`relative overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white"
            : "bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 text-gray-900"
        } border-t transition-colors duration-300`}
      >

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className={`text-4xl font-extrabold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {t('home.welcome.title')}
              </h2>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                {t('home.welcome.subtitle')}
              </p>
            </ScrollAnimation>
            
          </div>

          {/* Health & Wellness Statistics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Stat 1 - Active Members */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}>
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isDark ? "bg-green-500/20" : "bg-green-100"
                  }`}>
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  15,000+
                </h3>
                <p className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.welcome.stats.activeMembers')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Stat 2 - Success Rate */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}>
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isDark ? "bg-green-500/20" : "bg-green-100"
                  }`}>
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  94%
                </h3>
                <p className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.welcome.stats.successRate')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Stat 3 - Years Experience */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}>
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isDark ? "bg-green-500/20" : "bg-green-100"
                  }`}>
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  12+
                </h3>
                <p className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.welcome.stats.yearsExperience')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Stat 4 - Wellness Programs */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-7">
              <div className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}>
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isDark ? "bg-green-500/20" : "bg-green-100"
                  }`}>
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  50+
                </h3>
                <p className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.welcome.stats.wellnessPrograms')}
                </p>
              </div>
            </ScrollAnimation>
          </div>

          {/* Health Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Physical Health */}
            <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-8">
              <div className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isDark ? "bg-green-500/20" : "bg-green-100"
                  }`}>
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {t('home.welcome.benefits.physicalHealth.title')}
                  </h3>
                </div>
                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.welcome.benefits.physicalHealth.description')}
                </p>
                <ul className={`mt-4 space-y-2 text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">•</span>
                    {t('home.welcome.benefits.physicalHealth.benefits.increasedEnergy')}
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">•</span>
                    {t('home.welcome.benefits.physicalHealth.benefits.cardiovascularHealth')}
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">•</span>
                    {t('home.welcome.benefits.physicalHealth.benefits.muscleStrength')}
                  </li>
                </ul>
              </div>
            </ScrollAnimation>

            {/* Mental Wellness */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-9">
              <div className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isDark ? "bg-green-500/20" : "bg-green-100"
                  }`}>
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {t('home.welcome.benefits.mentalWellness.title')}
                  </h3>
                </div>
                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.welcome.benefits.mentalWellness.description')}
                </p>
                <ul className={`mt-4 space-y-2 text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">•</span>
                    {t('home.welcome.benefits.mentalWellness.benefits.stressReduction')}
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">•</span>
                    {t('home.welcome.benefits.mentalWellness.benefits.improvedFocus')}
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">•</span>
                    {t('home.welcome.benefits.mentalWellness.benefits.betterSleep')}
                  </li>
                </ul>
              </div>
            </ScrollAnimation>

            {/* Nutritional Balance */}
            <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-10">
              <div className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                isDark 
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isDark ? "bg-green-500/20" : "bg-green-100"
                  }`}>
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    {t('home.welcome.benefits.nutritionalBalance.title')}
                  </h3>
                </div>
                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.welcome.benefits.nutritionalBalance.description')}
                </p>
                <ul className={`mt-4 space-y-2 text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">•</span>
                    {t('home.welcome.benefits.nutritionalBalance.benefits.mealPlans')}
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">•</span>
                    {t('home.welcome.benefits.nutritionalBalance.benefits.eatingHabits')}
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">•</span>
                    {t('home.welcome.benefits.nutritionalBalance.benefits.improvedMetabolism')}
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>

        </div>
      </section>

      {/* Our Services - Health & Wellness */}
      <section
        id="services"
        className={`${
          isDark
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-white text-black border-black/10"
        } border-t transition-colors duration-300`}
      >
        <div className="mx-auto max-w-6xl px-4 py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2
                className={`text-4xl font-extrabold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {t('home.services.title')}
              </h2>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p
                className={`mt-4 text-xl max-w-2xl mx-auto ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t('home.services.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Balance Body & Mind */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div className={`text-center group ${
                isDark ? "text-white" : "text-black"
              }`}>
                {/* Lotus Icon */}
                <div className="flex justify-center mb-6">
                  <svg 
                    className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.07 4.93a10 10 0 110 14.14M4.93 19.07a10 10 0 110-14.14M12 20v-8M12 4v8M8 8h8M8 16h8" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {t('home.services.balanceBodyMind.title')}
                </h3>
                
                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.services.balanceBodyMind.description')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Healthy Daily Life */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div className={`text-center group ${
                isDark ? "text-white" : "text-black"
              }`}>
                {/* Heart with ECG Icon */}
                <div className="flex justify-center mb-6">
                  <svg 
                    className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h4l2-8 2 8h4l-2 4 6-6" />
                  </svg>
                </div>
                
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {t('home.services.healthyDailyLife.title')}
                </h3>
                
                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.services.healthyDailyLife.description')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Nutrition Strategies */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div className={`text-center group ${
                isDark ? "text-white" : "text-black"
              }`}>
                {/* Body Shape Icon */}
                <div className="flex justify-center mb-6">
                  <svg 
                    className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <ellipse cx="12" cy="8" rx="4" ry="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10v8c0 .5.5 1 1 1h6c.5 0 1-.5 1-1v-8" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v6M10 7l2-2 2 2" />
                  </svg>
                </div>
                
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {t('home.services.nutritionStrategies.title')}
                </h3>
                
                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.services.nutritionStrategies.description')}
                </p>
              </div>
            </ScrollAnimation>

            {/* Workout Routines */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-7">
              <div className={`text-center group ${
                isDark ? "text-white" : "text-black"
              }`}>
                {/* Dumbbell Icon */}
                <div className="flex justify-center mb-6">
                  <svg 
                    className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h4v12H6V6zM14 6h4v12h-4V6zM6 6l4-2v4L6 6zM18 6l-4-2v4l4-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 10h12M6 14h12" />
                  </svg>
                </div>
                
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {t('home.services.workoutRoutines.title')}
                </h3>
                
                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {t('home.services.workoutRoutines.description')}
                </p>
              </div>
            </ScrollAnimation>
          </div>
          
          {/* Call to Action */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-8">
            <div className="text-center mt-16">
              <a
                href="/contact"
                className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#4CAF50' }}
              >
                {t('home.services.ctaButton')}
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>



      {/* About Us - Clients & What We Offer */}
<section
      id="about"
      className={`relative overflow-hidden ${
        isDark ? "bg-white text-black" : "bg-white text-black"
      } transition-colors duration-300`}
    >

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Side - Clients / Partners */}
          <ScrollAnimation animation="slide-in-left" stagger="scroll-stagger-1">
            <div className="space-y-8">
              <div>
                <h2 className={`text-4xl font-extrabold mb-6 ${
                  isDark ? "text-gray-900" : "text-gray-900"
                }`}>
                  {t('home.about.clientsPartners.title')}
                </h2>
                <p className={`text-lg leading-relaxed mb-8 ${
                  isDark ? "text-gray-600" : "text-gray-600"
                }`}>
                  {t('home.about.clientsPartners.description')}
                </p>
              </div>

              {/* Client Logos Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {/* Row 1 */}
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
                  <div className="text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">VITAMINS</p>
                  </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
                  <div className="text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 font-semibold">HEALTHY EATING</p>
                  </div>
          </ScrollAnimation>

                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
                  <div className="text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
        </div>
                    <p className="text-xs text-gray-600 font-semibold">Family</p>
                    <p className="text-xs text-gray-400">HEALTH CENTER</p>
                  </div>
                </ScrollAnimation>

                {/* Row 2 */}
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
                  <div className="text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
              </div>
                    <p className="text-xs text-gray-500">*** WELLNESS ***</p>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
                  <div className="text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-xs text-green-600 font-semibold">HEALTHY</p>
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-7">
                  <div className="text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500">vitamins</p>
                  </div>
                </ScrollAnimation>

                {/* Row 3 */}
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-8">
                  <div className="text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
              </div>
                    <p className="text-xs text-gray-600 font-semibold">HEALTHY</p>
            </div>
          </ScrollAnimation>

                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-9">
                  <div className="text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 font-semibold">YOGA</p>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-10">
                  <div className="text-center p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 bg-pink-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 font-semibold">BODY CARE</p>
                    <p className="text-xs text-gray-400">... health center ...</p>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right Side - What We Offer */}
          <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-1">
            <div className="space-y-6">
              <div>
                <h2 className={`text-4xl font-extrabold mb-6 ${
                  isDark ? "text-gray-900" : "text-gray-900"
                }`}>
                  {t('home.about.whatWeOffer.title')}
                </h2>
              </div>

              {/* Services Accordion */}
              <div className="space-y-3 md:space-y-4">
                {/* Body Balance */}
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
                  <div className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                    openService === 'body-balance'
                      ? "bg-emerald-50 border-emerald-200" 
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  } cursor-pointer`} onClick={() => toggleService('body-balance')}>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                        openService === 'body-balance' ? 'text-emerald-600' : 'text-gray-700'
                      }`}>{t('home.about.whatWeOffer.bodyBalance.title')}</h3>
                      <div className="w-6 h-6 flex items-center justify-center">
                        {openService === 'body-balance' ? (
                          <div className="w-4 h-0.5 bg-gray-400"></div>
                        ) : (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        )}
                      </div>
                      </div>
                    {openService === 'body-balance' && (
                      <div className="animate-fadeIn">
                        <div className="flex items-center mb-2 md:mb-3">
                          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 font-medium">{t('home.about.whatWeOffer.bodyBalance.duration')}</span>
                    </div>
                        <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                          {t('home.about.whatWeOffer.bodyBalance.description')}
                        </p>
                        <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                          {t('home.about.whatWeOffer.readMore')}
                        </a>
                      </div>
                    )}
                  </div>
                </ScrollAnimation>

                {/* Zumba */}
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
                  <div className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                    openService === 'zumba'
                      ? "bg-emerald-50 border-emerald-200" 
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  } cursor-pointer`} onClick={() => toggleService('zumba')}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                        openService === 'zumba' ? 'text-emerald-600' : 'text-gray-700'
                      }`}>{t('home.about.whatWeOffer.zumba.title')}</h3>
                      <div className="w-6 h-6 flex items-center justify-center">
                        {openService === 'zumba' ? (
                          <div className="w-4 h-0.5 bg-gray-400"></div>
                        ) : (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        )}
                      </div>
                      </div>
                    {openService === 'zumba' && (
                      <div className="animate-fadeIn mt-3 md:mt-4">
                        <div className="flex items-center mb-2 md:mb-3">
                          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 font-medium">{t('home.about.whatWeOffer.zumba.duration')}</span>
                    </div>
                        <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                          {t('home.about.whatWeOffer.zumba.description')}
                        </p>
                        <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                          {t('home.about.whatWeOffer.readMore')}
                        </a>
                      </div>
                    )}
                  </div>
                </ScrollAnimation>

                {/* Basic Pilates */}
                <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
                  <div className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                    openService === 'pilates'
                      ? "bg-emerald-50 border-emerald-200" 
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  } cursor-pointer`} onClick={() => toggleService('pilates')}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                        openService === 'pilates' ? 'text-emerald-600' : 'text-gray-700'
                      }`}>{t('home.about.whatWeOffer.basicPilates.title')}</h3>
                      <div className="w-6 h-6 flex items-center justify-center">
                        {openService === 'pilates' ? (
                          <div className="w-4 h-0.5 bg-gray-400"></div>
                        ) : (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        )}
                      </div>
                      </div>
                    {openService === 'pilates' && (
                      <div className="animate-fadeIn mt-3 md:mt-4">
                        <div className="flex items-center mb-2 md:mb-3">
                          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 font-medium">{t('home.about.whatWeOffer.basicPilates.duration')}</span>
                    </div>
                        <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                          {t('home.about.whatWeOffer.basicPilates.description')}
                        </p>
                        <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                          {t('home.about.whatWeOffer.readMore')}
                        </a>
                  </div>
                    )}
              </div>
                </ScrollAnimation>

                {/* Yoga Zen */}
              <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
                  <div className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                    openService === 'yoga-zen'
                      ? "bg-emerald-50 border-emerald-200" 
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  } cursor-pointer`} onClick={() => toggleService('yoga-zen')}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                        openService === 'yoga-zen' ? 'text-emerald-600' : 'text-gray-700'
                      }`}>{t('home.about.whatWeOffer.yogaZen.title')}</h3>
                      <div className="w-6 h-6 flex items-center justify-center">
                        {openService === 'yoga-zen' ? (
                          <div className="w-4 h-0.5 bg-gray-400"></div>
                        ) : (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                        )}
                      </div>
                    </div>
                    {openService === 'yoga-zen' && (
                      <div className="animate-fadeIn mt-3 md:mt-4">
                        <div className="flex items-center mb-2 md:mb-3">
                          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600 font-medium">{t('home.about.whatWeOffer.yogaZen.duration')}</span>
                        </div>
                        <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                          {t('home.about.whatWeOffer.yogaZen.description')}
                        </p>
                        <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                          {t('home.about.whatWeOffer.readMore')}
                        </a>
                      </div>
                    )}
                </div>
              </ScrollAnimation>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
</section>





      {/* BMI Calculator */}
      <section
        id="bmi-calculator"
        className={`${isDark ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-black/10"} border-t transition-colors duration-300`}
      >
        <BmiCalculator />
      </section>

       {/* Testimonials */}
 <section
       id="testimonials"
       className={`relative overflow-hidden border-t transition-colors duration-300 ${
         isDark
           ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white border-gray-700"
           : "bg-indigo-50 text-black border-black/10"
       }`}
     >
       {/* Background decorative elements */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className={`absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-5 animate-float ${
           isDark ? "bg-indigo-500" : "bg-indigo-200"
         }`}></div>
         <div className={`absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full opacity-5 animate-pulse-slow ${
           isDark ? "bg-purple-500" : "bg-purple-200"
         }`}></div>
       </div>

       <div className="relative z-10 mx-auto max-w-6xl px-4 py-24">
         {/* Header with enhanced styling */}
         <div className="text-center mb-16">
           <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
             <h2 className={`text-4xl font-extrabold ${
               isDark ? "text-white" : "text-gray-900"
             }`}>
               {t('home.testimonials.title')}
             </h2>
           </ScrollAnimation>
           
           <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
             <p
               className={`mt-4 text-xl max-w-2xl mx-auto ${
                 isDark ? "text-gray-300" : "text-gray-700"
               }`}
             >
               {t('home.testimonials.subtitle')}
             </p>
           </ScrollAnimation>
         </div>

         {/* Testimonials Grid */}
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Testimonial 1 */}
           <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
             <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
               isDark 
                 ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                 : "bg-white border-gray-200 hover:bg-gray-50"
             }`}>
               <div className={`text-sm font-medium mb-3 ${
                 isDark ? "text-indigo-300" : "text-gray-500"
               }`}>
                 15.03.2024
               </div>
               
               <h3 className={`text-xl font-bold mb-4 ${
                 isDark ? "text-white" : "text-gray-900"
               }`}>
                 {t('home.testimonials.testimonial1.title')}
               </h3>
               
               <p className={`text-sm leading-relaxed mb-6 ${
                 isDark ? "text-gray-300" : "text-gray-600"
               }`}>
                 {t('home.testimonials.testimonial1.content')}
               </p>
               
               <div className="border-t border-gray-200 pt-4 flex items-center">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm mr-3">
                   TB
                 </div>
                 <span className={`font-semibold ${
                   isDark ? "text-white" : "text-gray-900"
                 }`}>
                   {t('home.testimonials.testimonial1.author')}
                 </span>
               </div>
             </div>
           </ScrollAnimation>

           {/* Testimonial 2 */}
           <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
             <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
               isDark 
                 ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                 : "bg-white border-gray-200 hover:bg-gray-50"
             }`}>
               <div className={`text-sm font-medium mb-3 ${
                 isDark ? "text-indigo-300" : "text-gray-500"
               }`}>
                 22.02.2024
               </div>
               
               <h3 className={`text-xl font-bold mb-4 ${
                 isDark ? "text-white" : "text-gray-900"
               }`}>
                 {t('home.testimonials.testimonial2.title')}
               </h3>
               
               <p className={`text-sm leading-relaxed mb-6 ${
                 isDark ? "text-gray-300" : "text-gray-600"
               }`}>
                 {t('home.testimonials.testimonial2.content')}
               </p>
               
               <div className="border-t border-gray-200 pt-4 flex items-center">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm mr-3">
                   SM
                 </div>
                 <span className={`font-semibold ${
                   isDark ? "text-white" : "text-gray-900"
                 }`}>
                   {t('home.testimonials.testimonial2.author')}
                 </span>
               </div>
             </div>
           </ScrollAnimation>

           {/* Testimonial 3 */}
           <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
             <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
               isDark 
                 ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                 : "bg-white border-gray-200 hover:bg-gray-50"
             }`}>
               <div className={`text-sm font-medium mb-3 ${
                 isDark ? "text-indigo-300" : "text-gray-500"
               }`}>
                 08.01.2024
               </div>
               
               <h3 className={`text-xl font-bold mb-4 ${
                 isDark ? "text-white" : "text-gray-900"
               }`}>
                 {t('home.testimonials.testimonial3.title')}
               </h3>
               
               <p className={`text-sm leading-relaxed mb-6 ${
                 isDark ? "text-gray-300" : "text-gray-600"
               }`}>
                 {t('home.testimonials.testimonial3.content')}
               </p>
               
               <div className="border-t border-gray-200 pt-4 flex items-center">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm mr-3">
                   MJ
                 </div>
                 <span className={`font-semibold ${
                   isDark ? "text-white" : "text-gray-900"
                 }`}>
                   {t('home.testimonials.testimonial3.author')}
                 </span>
               </div>
             </div>
           </ScrollAnimation>
         </div>
       </div>
 </section>







      {/* CTA Section - Grid Card Template */}
      <section
        id="cta"
        className={`relative overflow-hidden ${
          isDark
            ? "bg-gray-50 text-gray-900"
            : "bg-gray-50 text-gray-900"
        } transition-colors duration-300`}
      >
        <div className="mx-auto max-w-6xl px-4 py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 block">
                {t('home.cta.programsLabel')}
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                {t('home.cta.title')}
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                {t('home.cta.subtitle')}
              </p>
            </ScrollAnimation>
          </div>

          {/* Grid Cards */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            {/* Left Side - 4 Images Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Image 1 */}
              <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
                <div className="relative group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src="/images/63A10.jpg"
                      alt="Wellness journey path"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollAnimation>

              {/* Image 2 */}
              <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
                <div className="relative group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src="/images/63A11.jpg"
                      alt="Wellness center"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollAnimation>

              {/* Image 3 */}
              <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
                <div className="relative group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src="/images/63A12.jpg"
                      alt="Nutrition and wellness"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollAnimation>

              {/* Image 4 */}
              <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
                <div className="relative group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src="/images/63A13.jpg"
                      alt="Fitness and training"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Right Side - Content Box */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-center">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 block">
                  {t('home.cta.contentBox.programsLabel')}
                </span>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                  {t('home.cta.contentBox.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-8 text-xl">
                  {t('home.cta.contentBox.description')}
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{t('home.cta.contentBox.features.personalizedPlans')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{t('home.cta.contentBox.features.expertGuidance')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{t('home.cta.contentBox.features.provenResults')}</span>
                  </div>
                </div>
                <a
                  href="/services"
                  className="inline-block border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 uppercase tracking-wider text-center"
                >
                  {t('home.cta.contentBox.exploreButton')}
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