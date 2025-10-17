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
      <h1 className="text-4xl font-extrabold leading-tight text-white whitespace-nowrap">
        {t('home.showcase.title')}
      </h1>
    </ScrollAnimation>
    
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
      <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto whitespace-nowrap">
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
          className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl"
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
              <h2 className={`text-4xl font-extrabold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {t('home.welcome.title')}
              </h2>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p className={`text-gray-700 max-w-2xl mx-auto whitespace-nowrap ${
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 16 16"><g fill="none"><path fill="url(#SVGQMsqbeLV)" d="M10.99 7.714a1.5 1.5 0 0 0-1.838 1.061l-.388 1.449a3 3 0 1 0 5.796 1.553l.388-1.45a1.5 1.5 0 0 0-1.06-1.836z"></path><path fill="url(#SVGswmSBcsj)" d="M5.01 7.714a1.5 1.5 0 0 1 1.837 1.061l.388 1.449a3 3 0 1 1-5.795 1.553l-.389-1.45a1.5 1.5 0 0 1 1.061-1.836z"></path><path fill="url(#SVG4tHA7cJC)" d="M6.5 7A1.5 1.5 0 0 0 5 8.5V11a3 3 0 1 0 6 0V8.5A1.5 1.5 0 0 0 9.5 7z"></path><path fill="url(#SVGT456idhF)" d="M8 1a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5"></path><path fill="url(#SVGK07hbcHv)" d="M3 3a2 2 0 1 0 0 4a2 2 0 0 0 0-4"></path><path fill="url(#SVGe1BkJcGN)" d="M13 3a2 2 0 1 0 0 4a2 2 0 0 0 0-4"></path><defs><radialGradient id="SVGQMsqbeLV" cx={0} cy={0} r={1} gradientTransform="rotate(78.837 -.336 11.297)scale(4.64914)" gradientUnits="userSpaceOnUse"><stop stopColor="#0078d4"></stop><stop offset={1} stopColor="#004695"></stop></radialGradient><radialGradient id="SVGswmSBcsj" cx={0} cy={0} r={1} gradientTransform="matrix(3.34115 6.04144 -4.34865 2.40497 2.553 7.96)" gradientUnits="userSpaceOnUse"><stop stopColor="#008ce2"></stop><stop offset={1} stopColor="#0068c6"></stop></radialGradient><radialGradient id="SVG4tHA7cJC" cx={0} cy={0} r={1} gradientTransform="rotate(63.608 -3.915 10.713)scale(4.22417 3.87907)" gradientUnits="userSpaceOnUse"><stop offset={0.339} stopColor="#3dcbff"></stop><stop offset={1} stopColor="#14b1ff"></stop></radialGradient><radialGradient id="SVGT456idhF" cx={0} cy={0} r={1} gradientTransform="rotate(59.931 1.37 7.898)scale(3.12306)" gradientUnits="userSpaceOnUse"><stop offset={0.339} stopColor="#3dcbff"></stop><stop offset={1} stopColor="#14b1ff"></stop></radialGradient><radialGradient id="SVGK07hbcHv" cx={0} cy={0} r={1} gradientTransform="rotate(47.573 -3.7 4.554)scale(3.27979)" gradientUnits="userSpaceOnUse"><stop stopColor="#008ce2"></stop><stop offset={1} stopColor="#0068c6"></stop></radialGradient><radialGradient id="SVGe1BkJcGN" cx={0} cy={0} r={1} gradientTransform="rotate(78.837 3.672 9.578)scale(2.93403)" gradientUnits="userSpaceOnUse"><stop stopColor="#0078d4"></stop><stop offset={1} stopColor="#004695"></stop></radialGradient></defs></g></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 48 48"><g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#2f88ff" stroke="#000" d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"></path><path stroke="#fff" strokeLinecap="round" d="M16 24L22 30L34 18"></path></g></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24"><g fill="none"><path fill="#66e1ff" d="m4.355 14.38l-3.122 5.39a.492.492 0 0 0 .508.733l2.757-.467l.96 2.638a.492.492 0 0 0 .887.084l2.681-4.537"></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m4.355 14.38l-3.122 5.39a.492.492 0 0 0 .508.733l2.757-.467l.96 2.638a.492.492 0 0 0 .887.084l2.681-4.537" strokeWidth={1}></path><path fill="#66e1ff" d="m19.645 14.38l3.122 5.391a.493.493 0 0 1-.508.733l-2.757-.467l-.96 2.638a.492.492 0 0 1-.887.084l-2.681-4.537"></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m19.645 14.38l3.122 5.391a.493.493 0 0 1-.508.733l-2.757-.467l-.96 2.638a.492.492 0 0 1-.887.084l-2.681-4.537" strokeWidth={1}></path><path fill="#ffef5e" d="M11.984 18.726a8.863 8.863 0 1 0 0-17.726a8.863 8.863 0 0 0 0 17.726"></path><path fill="#fff9bf" d="M5.717 16.13A8.863 8.863 0 1 1 18.252 3.596z"></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M11.984 18.726a8.863 8.863 0 1 0 0-17.726a8.863 8.863 0 0 0 0 17.726" strokeWidth={1}></path><path fill="#fff" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="m12.562 5.293l1.263 2.604h2.461a.604.604 0 0 1 .421 1.05l-2.133 2.103l1.182 2.719a.643.643 0 0 1-.917.806l-2.856-1.61l-2.856 1.61a.644.644 0 0 1-.917-.806l1.182-2.72l-2.133-2.102a.603.603 0 0 1 .422-1.052h2.462l1.265-2.602a.652.652 0 0 1 1.154 0" strokeWidth={1}></path></g></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><g fill="none"><path fill="#f8312f" d="M6 6c4.665-2.332 8.5.5 10 2.5c1.5-2 5.335-4.832 10-2.5c6 3 4.5 10.5 0 15c-2.196 2.196-6.063 6.063-8.891 8.214a1.764 1.764 0 0 1-2.186-.041C12.33 27.08 8.165 23.165 6 21C1.5 16.5 0 9 6 6"></path><path fill="#ca0b4a" d="M16 8.5v3.05c1.27-2.685 4.425-6.27 9.658-5.713c-4.51-2.03-8.195.712-9.658 2.663m-4.054-2.963C10.26 4.95 8.225 4.887 6 6C0 9 1.5 16.5 6 21c2.165 2.165 6.33 6.08 8.923 8.173a1.764 1.764 0 0 0 2.186.04q.381-.29.785-.618c-2.854-2.143-6.86-5.519-9.035-7.462c-4.957-4.431-6.61-11.815 0-14.769a9.7 9.7 0 0 1 3.087-.827"></path><ellipse cx={23.477} cy={12.594} fill="#f37366" rx={2.836} ry={4.781} transform="rotate(30 23.477 12.594)"></ellipse></g></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 128 128"><path fill="#fdd835" d="m121.59 60.83l-13.93-4.49c-8.91-2.94-14.13-10.15-16.58-19.21L84.95 7.27c-.16-.59-.55-1.38-1.75-1.38c-1.01 0-1.59.79-1.75 1.38l-6.13 29.87c-2.46 9.06-7.67 16.27-16.58 19.21l-13.93 4.49c-1.97.64-2 3.42-.04 4.09l14.03 4.83c8.88 2.95 14.06 10.15 16.52 19.17l6.14 29.53c.16.59.49 1.65 1.75 1.65c1.33 0 1.59-1.06 1.75-1.65l6.14-29.53c2.46-9.03 7.64-16.23 16.52-19.17l14.03-4.83c1.94-.68 1.91-3.46-.06-4.1"></path><path fill="#ffee58" d="M122.91 62.08c-.22-.55-.65-1.03-1.32-1.25l-13.93-4.49c-8.91-2.94-14.13-10.15-16.58-19.21L84.95 7.27c-.09-.34-.41-.96-.78-1.14l1.98 29.97c1.47 13.68 2.73 20.12 13.65 22c9.38 1.62 20.23 3.48 23.11 3.98"></path><path fill="#f4b400" d="m122.94 63.64l-24.16 5.54c-8.51 2.16-13.2 7.09-13.2 19.99l-2.37 30.94c.81-.08 1.47-.52 1.75-1.65l6.14-29.53c2.46-9.03 7.64-16.23 16.52-19.17l14.03-4.83c.66-.24 1.08-.73 1.29-1.29"></path><path fill="#fdd835" d="M41.81 86.81c-8.33-2.75-9.09-5.85-10.49-11.08l-3.49-12.24c-.21-.79-2.27-.79-2.49 0L22.97 74.8c-1.41 5.21-4.41 9.35-9.53 11.04l-8.16 3.54c-1.13.37-1.15 1.97-.02 2.35l8.22 2.91c5.1 1.69 8.08 5.83 9.5 11.02l2.37 10.82c.22.79 2.27.79 2.48 0l2.78-10.77c1.41-5.22 3.57-9.37 10.5-11.07l7.72-2.91c1.13-.39 1.12-1.99-.02-2.36z"></path><path fill="#ffee58" d="M28.49 75.55c.85 7.86 1.28 10.04 7.65 11.67l13.27 2.59c-.14-.19-.34-.35-.61-.43l-7-2.57c-7.31-2.5-9.33-5.68-10.7-12.04s-2.83-10.51-2.83-10.51c-.51-1.37-1.24-1.3-1.24-1.3z"></path><path fill="#f4b400" d="M28.73 102.99c0-7.41 4.05-11.08 10.49-11.08l10.02-.41s-.58.77-1.59 1.01l-6.54 2.13c-5.55 2.23-8.08 3.35-9.8 10.94c0 0-2.22 8.83-2.64 9.76c-.58 1.3-1.27 1.57-1.27 1.57z"></path><path fill="#f4b400" stroke="#f4b400" strokeMiterlimit={10} d="M59.74 28.14c.56-.19.54-.99-.03-1.15l-7.72-2.08a4.77 4.77 0 0 1-3.34-3.3L45.61 9.06c-.15-.61-1.02-.61-1.17.01l-2.86 12.5a4.73 4.73 0 0 1-3.4 3.37l-7.67 1.99c-.57.15-.61.95-.05 1.15l8.09 2.8c1.45.5 2.57 1.68 3.01 3.15l2.89 11.59c.15.6 1.01.61 1.16 0l2.99-11.63a4.77 4.77 0 0 1 3.04-3.13z" strokeWidth={1}></path></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 128 128"><ellipse cx={64} cy={116.87} fill="#424242" rx={12.09} ry={7.13}></ellipse><path fill="#ffd600" d="M64 4C42.92 4 25.82 19.67 25.82 38.99c0 5.04 1.52 10.43 3.75 15.18c3.13 6.68 6.54 11.62 7.54 13.44c2.78 5.06 2.38 10.39 3.15 13.73c1.45 6.24 5.79 8.5 23.73 8.5s21.8-2.15 23.41-7.9c1.1-3.91.03-8.18 2.8-13.23c1-1.82 5.07-7.85 8.21-14.54c2.23-4.75 3.75-10.14 3.75-15.18C102.18 19.67 85.08 4 64 4"></path><ellipse cx={64} cy={86.13} fill="#b26500" rx={21.94} ry={4.46}></ellipse><ellipse cx={64} cy={86.13} fill="#b26500" rx={21.94} ry={4.46}></ellipse><ellipse cx={64} cy={86.13} fill="#ffa000" rx={15.99} ry={2.06}></ellipse><g fill="none" strokeMiterlimit={10} strokeWidth={2}><path stroke="#b26500" d="M53.3 56.77c-.62 1.56-2.23 4.77-1.39 6.21c1.95 3.35 6.6 4.55 6.6 7.63c0 4.7-3.42 19.93-3.42 19.93m18.94-34.33s2.24 4.8 1.29 6.95c-.71 1.6-4.98 4.18-5.53 4.61c-2.55 2 .84 22.78.84 22.78"></path><path stroke="#fff" d="M53.3 56.77c3.44-6.8 5.21-22.32.84-21.53c-7.37 1.33 1.71 26.83 6.18 23.9s10.01-23.85 3.21-23.93s.46 26.66 5.08 23.69c3.65-2.35 12.56-23.66 5.24-23.66c-6.23 0 .19 20.97.19 20.97"></path></g><path fill="#82aec0" d="M85.89 87.06S80.13 89.84 64 89.84s-21.89-2.78-21.89-2.78s-.36 5.14.83 7.47c1.43 2.8 2.53 3.77 2.53 3.77l.6 2.85l-.24.75c-.31.98-.09 2.06.6 2.83l.52.58l.58 2.74l-.2.55c-.38 1.05-.12 2.22.66 3.02l.38.39l.47 2.24s2.38 5.08 15.16 5.08s15.16-5.08 15.16-5.08l.04-.19l.26-.26c.52-.51.69-1.27.44-1.95l-.15-.39l.62-2.96l1.09-1.15c.54-.57.66-1.41.31-2.11l-.5-.99l.63-2.97l.4-.31c.59-.65.6-1.63.34-2.3c-.2-.53-.04-1.13.37-1.52c.63-.6 1.44-1.51 2.04-2.64c1.23-2.29.84-7.45.84-7.45"></path><path fill="#2f7889" d="m45.47 98.3l.54 2.87c5.82-.03 13.59.26 28.5-2.11c2.69-.61 5.92-1.82 2.35-1.32c0-.01-13.69 1.3-31.39.56m2 9.77c6.44-.11 19.6-.75 33.74-3.82l.63-2.97c-14.79 3.36-28.7 3.96-34.95 4.04zm32.84.42c-13.09 2.84-25.34 3.57-31.97 3.73l.43 2.04s.21 6.33 15.16 6.33s15.16-6.33 15.16-6.33s-6.38 1.82-14.23.93a.63.63 0 0 1-.01-1.26c4.69-.62 10.29-1.54 14.84-2.48z"></path><path fill="none" stroke="#82aec0" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={3.997} d="M42.18 87.06s6.46 2.78 21.76 2.78s21.88-2.78 21.88-2.78"></path><path fill="#ffff8d" d="M49.88 10.32c3.91-.96 8-.48 10.8 2.92c.79.96 1.4 2.1 1.54 3.34c.28 2.39-1.2 4.65-2.96 6.31c-5.02 4.74-12.15 7.04-15.39 13.58c-.76 1.53-1.36 3.18-2.52 4.43s-3.09 2.01-4.6 1.21c-.8-.42-1.35-1.21-1.8-2c-2.84-5.06-2.63-11.51-.13-16.75c2.75-5.74 8.78-11.5 15.06-13.04"></path><path fill="#ffd600" d="M46.45 91.93c-.88-.4-.53-1.72.43-1.65c3.22.25 8.7.56 15.95.56c7.64 0 14.36-.57 18.28-.99c.97-.1 1.34 1.23.45 1.64c-3.02 1.42-8.55 3.04-18.03 3.04c-9.25 0-14.35-1.37-17.08-2.6"></path><path fill="#94d1e0" d="M51.94 102.03c-.67.24-1.36.57-1.7 1.19c-.12.23-.19.49-.14.75c.08.38.43.65.78.82c.7.34 1.49.43 2.26.44c1.59.02 3.17-.28 4.74-.58c.47-.09.95-.18 1.37-.41s.78-.62.85-1.09c.1-.63-.35-1.24-.9-1.54c-1.9-1.05-5.34-.27-7.26.42m1.49 6.59c-.67.24-1.36.57-1.7 1.19c-.12.23-.19.49-.14.75c.08.38.43.65.78.82c.7.34 1.49.43 2.26.44c1.59.02 3.17-.28 4.74-.58c.47-.09.95-.18 1.37-.41s.78-.62.85-1.09c.1-.63-.35-1.24-.9-1.54c-1.9-1.04-5.35-.26-7.26.42"></path><path fill="#ffff8d" d="M50.01 84.2c.91.09 1.87.01 2.64-.48s1.26-1.49.95-2.35c-.16-.45-.51-.81-.85-1.15c-.75-.74-1.5-1.48-2.24-2.22c-.83-.83-1.66-1.65-2.56-2.4c-1.39-1.16-3.26-2.25-5.09-1.4c-1.56.72-1.93 2.14-1.24 3.63c1.47 3.13 4.89 6.01 8.39 6.37"></path></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 128 128"><path fill="#d5d5d5" d="M63.87 43.71S5.32 49.66 5.56 55.41c.19 4.6-1.1 20.34 12.08 36.44c8.64 10.55 23.78 20.72 48.53 20.72c24.34 0 37.71-11.24 46.04-23.4c10.7-15.64 10.17-30.31 10.17-33.95c-.01-7.29-45.66-14.38-58.51-11.51"></path><path fill="#307d31" d="M66.9 30.59s-3.95-2.59-7.56-2.26c-3.61.34-5.3 2.48-5.3 2.48L42.73 58.95l12.03 13.42l7.85 5.44l15.19-.38l6.71-46.71z"></path><path fill="#58a12f" d="M67.66 37.46s-2.75-4.63-3.08-8.59s2.77-6.24 4.42-6.24c4.04 0 4.5 2.5 6.92 2.28s3.2-2.36 3.85-5.62c.66-3.32 3.51-5.19 6.1-3.54c2.49 1.59 1.61 6.29 1.61 6.29s1.98-2.42 4.19-.66c1.96 1.57 1.32 6.39 1.32 6.39s4.3-4.96 7.93-2.53s.88 10.79.88 10.79l-1.21 7.49l-20.7-7.93s-1.21-2.86-5.62-2.53c-4.4.33-6.61 4.4-6.61 4.4M45.53 57.29s3.7-7.51 11.75-5c8.44 2.63 6.91 10.76 6.91 10.76s2.16-1.58 4.69-1.8s5.62.22 5.62.22l-.4-4.36s-5.37.71-8.63-3.13c-4.38-5.17-1.43-11.12-1.43-11.12l.77-3.74l-7.71-4.96l-5.29-6.83s-1.76-3.85-6.5-4.07s-6.97 3.12-6.97 3.12s-10.15-2.93-15.33 1.47c-3.5 2.98-2.59 7.86-2.59 7.86s-2.46 1.46-6.71-2.11c-1.89-1.59-5.59-.38-6.14 2.6c-.55 2.97.63 6.68.63 6.68l-3.41 2.09l11.56 11.89z"></path><path fill="#86c82c" d="M71.19 54.64s-4.69.27-8.26-8.04c-2.14-4.98-.64-14.64 4.41-13.66c3.96.77 3.41 7.49 6.17 8.04c1.37.27 4.41-6.94 10.9-7.38c5.28-.36 12.22 6.61 12.22 6.61s3.08-2.2 3.41-2.97s.88-3.74 4.3-3.52c3.79.24 3.3 4.41 3.3 4.41s4.52-1.76 7.82-.11c3.55 1.78 3.3 5.18 3.3 5.18s3.19-3.41 5.73-1.65s-4.62 15.81-11.45 22.86s-15.67 6.58-15.67 6.58z"></path><path fill="#d2608c" d="m27.92 32.02l-.83-1.61s2.53-3.27 8.17-2.37c6.19.99 6.81 5.3 6.81 5.3s-3.19 1.21-3.29 1.06s-3.09-3.29-3.09-3.29l-5.92.2z"></path><path fill="#fff" d="M28.51 33.24s2.88-1.36 5.71-.75s3.49 2.88 3.49 2.88l2.63-1.06s-1.66-3.56-5.57-4.25c-4.29-.76-6.93 1.83-6.93 1.83z"></path><path fill="#fe2a19" d="M27.58 37.38s9.2-2.61 12.72-4.35c5.64-2.79 10.54-5.3 11.97-6.26c.76-.51 1.29-1.09 2.31-.88s10.19 18.45-4.76 25.09c-6.05 2.69-12.55 3.6-12.55 3.6l-9.34-7.89z"></path><path fill="#cb1c35" d="M30.77 40.03c-.22.65 4.7 10.02 15.03 6.19c9.72-3.6 6.53-15.1 5.92-15.51c-.4-.26-5.01 2.29-9.99 4.51c-5.2 2.31-10.78 4.29-10.96 4.81"></path><path fill="#ff5f5d" d="M38.15 41.86c1.7.67 3.95-.03 6.22-1.01c2.09-.9 4.67-2.3 4.74-3.81c.07-1.5-3.6-3.18-4.56-3.15c-.95.04-5.23 1.92-5.8 2.83c-.57.92-1.84 4.65-.6 5.14"></path><path fill="#f7ca76" d="M37 41.82c-.96-.25-1.84.7-2.08 1.81c-.31 1.45 1.09 1.76 1.73 1.23c.99-.82 1.26-2.81.35-3.04m5.16.78c-.95.03-1.31 1.55-.98 2.64c.42 1.43 1.85 1.05 2.1.26c.46-1.4-.18-2.93-1.12-2.9m5.13-2.53c-.69.61-.02 1.97.9 2.58c1.2.8 2.03-.36 1.73-1.11c-.53-1.33-1.95-2.07-2.63-1.47m1.84-4.36c.05.89 1.46 1.25 2.45.96c1.3-.38.91-1.73.18-1.98c-1.3-.45-2.68.14-2.63 1.02"></path><path fill="#e9fcae" d="M47.76 59.21c.91-2.46 5.68-6.4 10.72-2.77c4.91 3.54 2.66 9.36.56 11.27c-2.28 2.08-6.82 2.69-9.37-.13s-3.13-5.08-1.91-8.37"></path><path fill="#307d31" d="M18.32 62.6c.26-.32.91-1.14.51-2.58c-.67-2.41-2.37-5.38-5.62-9.21c-5.67-6.68-8.48-8.42-10.28-6.52c-1.91 2.02.79 6.74 4.38 11.07s9.38 9.26 11.01 7.24"></path><path fill="#e9fcae" d="M16.41 58.5c-.55.45-3.54-1.63-6.63-5.28S4.42 46.5 5.4 45.75c1.24-.95 5.73 3.76 6.91 5.39s5.33 6.35 4.1 7.36"></path><path fill="#fff" d="m81.34 39.45l1.69-1.63s5.47 7.27 9.77 4.04c5.17-3.88.06-10.17.06-10.17l2.25-1.12l2.98 4.61l.22 6.52l-5.11 4.44s-5.62 0-6.07-.67c-.45-.68-5.79-6.02-5.79-6.02"></path><path fill="#d2608c" d="m79.6 40.97l2.23-1.98s6.31 8.95 12.61 4.3c6.04-4.47.49-12.62.49-12.62l2.23-1.31s4.42 4.99 2.67 11.52c-1.41 5.24-6.64 7.69-10.91 6.79c-6.7-1.42-9.32-6.7-9.32-6.7"></path><path fill="#2c7b2e" d="M88.92 52.48s.18-4.16 6-8.8s10.71-3.37 12.34-1.98c1.64 1.4 3.59 6.54-.84 12.12c-2.12 2.66-3.76 3.04-6.07 2.83c-2.7-.25-7.39-2.59-7.39-2.59z"></path><path fill="#e0feac" d="M105.05 43.55c-2.43-1.61-7.44.94-10.02 3.35c-2.75 2.58-3.51 5.5-3.51 5.5l6.01 2.12s3.38-.08 5.64-2.66c3.37-3.84 3.7-7.1 1.88-8.31"></path><path fill="#fe2a19" d="M72.43 45.73c-.84.42-3.98 4.1-3.05 11.42c.97 7.57 6.38 12.55 15.34 13.2c11.47.82 17.92-7.58 18.8-9.1s2.64-4.86 1.41-5.97s-8.9-1.58-17.74-4.33c-9.93-3.1-12.89-6.16-14.76-5.22"></path><path fill="#cb1c35" d="M76.4 49.99c-1.25.62-2.48 11.73 7.33 14.98c8.45 2.8 14.73-6.5 14.09-7.74s-4.45-.82-10.74-3.05c-6.3-2.24-9.7-4.67-10.68-4.19"></path><path fill="#fe6261" d="M80.68 55.89c.29 1.47 1.66 3.26 4.77 4.59c2.47 1.06 5.12.59 6.24.12s.69-4.93.18-5.06c-1.59-.41-6.41-2.06-7.88-2.65c-.95-.38-3.62 1.42-3.31 3"></path><path fill="#f7ca76" d="M80.12 56c-.05-.92-1.54-1.23-2.58-.89c-1.37.44-.97 1.81-.2 2.04c1.37.42 2.83-.24 2.78-1.15m3.01 3.84c-.72-.57-1.94.34-2.37 1.35c-.57 1.32.72 1.93 1.4 1.5c1.22-.76 1.68-2.29.97-2.85"></path><path fill="#86c82c" d="M68.86 76.25s.27-1.81-1.05-4.43c-.57-1.13-2.82-3.38-1.13-5.32c1.69-1.93 7.41-.72 9.26-.32s4.83.32 5.96-.81s1.93-5.8 6.04-6.93c4.24-1.16 6.24 2.58 7.97 4.11c1.37 1.21 3.38 1.69 6.2.72s2.01 2.74 2.01 2.74l-3.3 7.33zm-50.97-10.3s-2.98-5.72-4.91-14.5s-1.78-11.66.24-12.32c3.46-1.13 5.8 3.06 7.01 2.82s1.45-5.32 4.99-6.12c3.54-.81 4.91 2.42 6.68 5.32s5.07 10.63 5.07 10.63s3.14-1.45 5.88 0s5.4 5.8 6.52 8.86c1.13 3.06 2.23 5.75 2.23 5.75s3.87.73 7.43 2.87c4.03 2.42 5.96 7.17 5.96 7.17l-19.8 1.27s-24-8.62-24.24-9.02c-.25-.4-3.31-3.06-3.06-2.73"></path><path fill="#2d792a" d="M21.03 69.09s-1.21-2.9-.81-6.6s2.13-6.06 5.03-6.06c2.26 0 6.16 1.47 9.95 6.78s4.27 10.15 4.27 10.15l-16.03-2.09z"></path><path fill="#e7fcae" d="M22.07 68.04s-1.57-6.39.4-7.89c1.37-1.05 3.46-.72 7.25 3.46c4.32 4.78 5.23 8.94 5.23 8.94z"></path><path fill="#fff" d="m41.51 74.12l1.85.16s1.05-4.91 5.15-6.93c3.95-1.93 8.13-.32 8.13-.32l.64-2.34l-4.35-1.77l-5.88 1.21s-5.32 4.83-5.32 5.07s-.22 4.68-.22 4.92"></path><path fill="#d2608c" d="M38.3 74.83c0-.24.49-7 6.2-10.79c7.25-4.81 13.25-.72 13.25-.72L57 65.63s-6.24-2.73-11.05 1.39c-3.95 3.38-4.83 8.46-4.83 8.46z"></path><path fill="#f6f6f6" d="M67.45 108.67c34.77-.11 46.57-28.2 49.38-38.6c1.84-6.81 2.5-13 2.5-13l-12.2 13.74s-38.26 7.34-39.54 7.34s-22.42-1.7-22.42-1.7l-21.72-5.19L8.56 56.84s.28 8.97 2.69 15.78c1.86 5.25 12.63 36.19 56.2 36.05"></path><path fill="#fff" d="M64.04 80.43c16.6.21 40.86-4.11 49.95-13.2c5.82-5.82 5.39-11.07 5.39-11.07s-10.5 19.83-55.49 19.16C25.73 74.75 8.53 56.79 8.53 56.79s1.02 6.18 5.7 10.02C25.3 75.86 41.9 80.14 64.04 80.43m-43.58-1.61c-1.95 1.83.16 6.48 4.92 10.67s9.52 7.55 11.9 5.17c2.47-2.47-3.36-8.37-6.65-11.24s-7.63-6.98-10.17-4.6"></path></svg>
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
                className={`text-4xl font-extrabold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {t('home.services.title')}
              </h2>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p
                className={`text-gray-700 max-w-2xl mx-auto ${
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
                  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300"><g fill="none"><path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path><path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path><path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path></g></svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 32 32" className="group-hover:scale-110 transition-transform duration-300"><g fill="none"><path fill="#f8312f" d="M6 6c4.665-2.332 8.5.5 10 2.5c1.5-2 5.335-4.832 10-2.5c6 3 4.5 10.5 0 15c-2.196 2.196-6.063 6.063-8.891 8.214a1.764 1.764 0 0 1-2.186-.041C12.33 27.08 8.165 23.165 6 21C1.5 16.5 0 9 6 6"></path><path fill="#ca0b4a" d="M16 8.5v3.05c1.27-2.685 4.425-6.27 9.658-5.713c-4.51-2.03-8.195.712-9.658 2.663m-4.054-2.963C10.26 4.95 8.225 4.887 6 6C0 9 1.5 16.5 6 21c2.165 2.165 6.33 6.08 8.923 8.173a1.764 1.764 0 0 0 2.186.04q.381-.29.785-.618c-2.854-2.143-6.86-5.519-9.035-7.462c-4.957-4.431-6.61-11.815 0-14.769a9.7 9.7 0 0 1 3.087-.827"></path><ellipse cx={23.477} cy={12.594} fill="#f37366" rx={2.836} ry={4.781} transform="rotate(30 23.477 12.594)"></ellipse></g></svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64" className="group-hover:scale-110 transition-transform duration-300"><g fill="#f4ae7f"><path d="M52.11 58.32c0 3.056-2.289 5.531-5.116 5.531H14.379c-2.824 0-5.114-2.476-5.114-5.531V8.447c0-3.059 2.291-5.534 5.114-5.534h32.615c2.827 0 5.116 2.475 5.116 5.534z"></path><path d="M30.899 10.509c0 .581-1.158 1.051-2.58 1.051H11.848c-1.426 0-2.582-.47-2.582-1.051v-9.46C9.266.47 10.421 0 11.848 0h16.471c1.422 0 2.58.47 2.58 1.049z"></path></g><path fill="#d0d2d3" d="M54.662 56c0 2.593-2.312 4.69-5.167 4.69H16.536c-2.851 0-5.167-2.098-5.167-4.69V13.73c0-2.591 2.316-4.69 5.167-4.69h32.959c2.855 0 5.167 2.1 5.167 4.69z"></path><path fill="#fff" d="M54.662 52.694c0 2.593-2.312 4.69-5.167 4.69H16.536c-2.851 0-5.167-2.098-5.167-4.69v-42.27c0-2.591 2.316-4.688 5.167-4.688h32.959c2.855 0 5.167 2.098 5.167 4.688z"></path><path fill="#d0d2d3" d="M43.1 8.28c0 .312-1.538.566-3.43.566h-21.9c-1.896 0-3.434-.254-3.434-.566V3.185c0-.315 1.538-.566 3.434-.566h21.9c1.892 0 3.43.251 3.43.566z"></path><path fill="#35494d" d="M20.07 18.03h28.562c1.922 0 1.922-2.7 0-2.7H20.07c-1.915 0-1.915 2.7 0 2.7m0 5.485h28.562c1.922 0 1.922-2.698 0-2.698H20.07c-1.915 0-1.915 2.698 0 2.698m0 5.605h28.562c1.922 0 1.922-2.7 0-2.7H20.07c-1.915 0-1.915 2.7 0 2.7m0 5.48h28.562c1.922 0 1.922-2.698 0-2.698H20.07c-1.915 0-1.915 2.698 0 2.698m0 10.58h13.148c1.916 0 1.916-2.699 0-2.699H20.07c-1.915-.001-1.915 2.699 0 2.699"></path></svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform duration-300"><g fill="none"><path fill="#ffdda1" d="M6.26 13.658a2.391 2.391 0 1 0 0-4.783a2.391 2.391 0 0 0 0 4.783"></path><path fill="#ffdda1" d="m20.372 17.802l-6.109-9.163a.48.48 0 0 0-.39-.212a.45.45 0 0 0-.397.2l-6.523 9.21a1.44 1.44 0 0 1-1.17.605H2.435a1.435 1.435 0 1 1 0-2.87h2.359a.48.48 0 0 0 .39-.201l5.955-8.401a3.44 3.44 0 0 1 2.774-1.413a3.35 3.35 0 0 1 2.738 1.49l6.108 9.164a1.436 1.436 0 1 1-2.391 1.592z"></path><path fill="#66e1ff" d="m6.696 13.234l2.29 1.732l3.692-5.21l-2.29-1.733z"></path><path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M4.363 12.721a2.391 2.391 0 0 1 2.823-3.66m13.186 8.741l-6.109-9.163a.48.48 0 0 0-.39-.212a.45.45 0 0 0-.397.2l-6.523 9.21a1.44 1.44 0 0 1-1.17.605H2.435a1.435 1.435 0 1 1 0-2.87h2.359a.48.48 0 0 0 .39-.201l5.955-8.401a3.44 3.44 0 0 1 2.774-1.413a3.35 3.35 0 0 1 2.738 1.49l6.108 9.164a1.436 1.436 0 1 1-2.391 1.592zm-7.694-8.047l-2.29-1.732m-1.403 6.943l-2.289-1.732" strokeWidth={1}></path></g></svg>
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
                <h2 className={`text-4xl font-extrabold mb-4 ${
                  isDark ? "text-gray-900" : "text-gray-900"
                }`}>
                  {t('home.about.clientsPartners.title')}
                </h2>
                <p className={`text-gray-700 mb-8 ${
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
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right Side - What We Offer */}
          <ScrollAnimation animation="slide-in-right" stagger="scroll-stagger-1">
            <div className="space-y-6">
              <div>
                <h2 className={`text-4xl font-extrabold mb-4 ${
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
             <h2 className={`text-4xl font-extrabold mb-4 ${
               isDark ? "text-white" : "text-gray-900"
             }`}>
               {t('home.testimonials.title')}
             </h2>
           </ScrollAnimation>
           
           <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
             <p
               className={`text-gray-700 max-w-2xl mx-auto ${
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
                <img 
                  src="/images/63HT1.jpg" 
                  alt={t('home.testimonials.testimonial1.author')}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
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
                <img 
                  src="/images/63HT2.jpg" 
                  alt={t('home.testimonials.testimonial2.author')}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
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
                <img 
                  src="/images/63HT3.jpg" 
                  alt={t('home.testimonials.testimonial3.author')}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
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
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                {t('home.cta.title')}
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
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
                  className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#4CAF50' }}
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