import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function Home2() {
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

  function handleLogout() {
    logoutUser()
    navigate('/login', { replace: true })
  }
  

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Navbar user={user} />

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
          <source src="/63Home2.mp4" type="video/mp4" />
          {t('common.videoNotSupported')}
        </video>

        {/* Overlay (darken video for readability) */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-4xl">
          <motion.h1 
            className="text-4xl font-extrabold leading-tight text-white whitespace-nowrap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('home2.showcase.title')}
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('home2.showcase.subtitle')}
          </motion.p>
          <motion.div 
            className="mt-8 flex gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Primary Button */}
            <a
              href="/services"
              className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#4CAF50' }}
            >
              {t('home2.showcase.exploreButton')}
            </a>

            {/* Secondary Button */}
            <a
              href="/contact"
              className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 bg-white text-green-600 border-2 border-green-500 hover:bg-green-500 hover:text-white shadow-lg hover:shadow-xl"
            >
              {t('home2.showcase.reachOutButton')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Choosing Health Coach Section */}
      <section
        id="why-choose-health-coach"
        className="py-24 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {t('home2.whyChooseHealthCoach.title')}
            </h2>
            
            <p className="text-gray-700 max-w-2xl mx-auto">
              {t('home2.whyChooseHealthCoach.subtitle')}
            </p>
          </div>

          {/* Three Column Services */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: '/images/63H1.jpg',
                title: t('home2.whyChooseHealthCoach.services.nutritionStrategies.title')
              },
              {
                image: '/images/63H2.jpg',
                title: t('home2.whyChooseHealthCoach.services.workoutRoutines.title')
              },
              {
                image: '/images/63H3.jpg',
                title: t('home2.whyChooseHealthCoach.services.supportMotivation.title')
              }
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden rounded-xl"
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark Overlay at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/60 flex items-center px-6">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h3 className="text-white text-lg font-semibold">
                          {service.title}
                        </h3>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Programs Section */}
      <section
        id="wellness-programs"
        className="py-24 bg-white relative"
      >
        {/* Dark Green Left Border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600"></div>
        
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {t('home2.wellnessPrograms.title')}
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              {t('home2.wellnessPrograms.subtitle')}
            </p>
          </div>

          {/* Six Programs Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('home2.wellnessPrograms.programs.balanceBodyMind.title'),
                subtitle: t('home2.wellnessPrograms.programs.balanceBodyMind.subtitle'),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="w-8 h-8">
                    <g fill="none">
                      <path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path>
                      <path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path>
                      <path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path>
                      <path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path>
                    </g>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.physicalActivity.title'),
                subtitle: t('home2.wellnessPrograms.programs.physicalActivity.subtitle'),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width={512} height={512} viewBox="0 0 512 512" className="w-8 h-8 text-white">
                    <path fill="currentColor" d="M326.7 60.61c-3.4 0-6.9.76-10.7 2.4c-7.4 3.25-15 9.88-20.3 19.2c-5.2 9.33-6.9 19.29-5.8 27.39c1.1 8 4.7 13.8 10.3 17c5.5 3.1 12.4 3.2 19.8-.1c7.5-3.2 15.1-9.9 20.3-19.2c5.3-9.31 7-19.28 5.9-27.33c-1.1-8.08-4.8-13.81-10.3-16.95c-2.8-1.56-5.9-2.38-9.2-2.4zM271.6 102c-31 17.2-67.1 32.6-117.2 43.6c-13.8 3-22.3 35-11.9 46.4h-14.9v18H157c4.3 5.6 8.6 11.2 12.6 17l-26.1 52.2c-9.8-3.7-20.4-5.8-31.5-5.8c-49.05 0-89 40-89 89s39.95 89 89 89c46 0 84-35.2 88.5-80h15.8c-1.7-6.1-1.5-12.3 0-18h-15.8c-2.8-27.7-18.4-51.8-40.8-66.1l21.6-43.2c6.1 9.5 11.8 19.2 16.9 29c-4.2 4.4-8.9 8.8-14.3 13.3c5.8 8.6 11.6 17 20.8 22.5c2.2-2 4.4-4.2 6.7-6.5c4.9 12.8 8.7 25.7 11.2 39c6.1-7.3 15.2-12 25.4-12c9.3 0 17.8 4 23.8 10.3l80-91.5c1.8 12.2 4.4 23.8 7.5 35.1c-28.6 14.8-48.3 44.8-48.3 79.1c0 49 40 89 89 89s89-40 89-89s-40-89-89-89c-8.2 0-16.2 1.1-23.8 3.3c-4-14.9-6.9-30.2-8.3-46.8c4.7-5.7 8.4-12.9 10.6-20.4l.1-.2c8.3 1.2 19 6.4 21.1 13.6l17.4-4.4c-10.4-26-38.7-31-62.1-26.1c-32.4-6.6-56.2-14.4-59.1-48c-1.5-.6-3.1-1.3-4.6-2.2c-11-6.2-17.5-17.7-19.2-30.2c-.5-3.3-.6-6.6-.5-10m-1.3 61.8c25.3 46.3 54.8 48.2 84.7 51.8c-2.4 3.2-5.3 6.4-8.3 9.8h-75.9c2.6-4.5 4.3-8 4.8-10c1.1-5.2-10.6-13.4-24.2-21.6c-11.7 5.4-26.4 9.9-42.4 11.7c8.9 5.7 17.1 12.3 24.6 19.9h-14.9c-3.1-6.5-6.4-13.1-9.7-19.9c-2.5-5.1-5-10.3-7.5-15.7c19.8-2.7 47-8.2 68.8-26m-11 79.6h72.9l-76.1 86.9c-3.1-22-9-41.2-16.7-60c7.3-9.2 14.1-18.6 19.9-26.9m-147.3 48c8.2 0 16.1 1.4 23.4 4l-37.96 76h84.96c-4.4 35-34.2 62-70.4 62c-39.32 0-71-31.7-71-71s31.68-71 71-71m288 0c39.3 0 71 31.7 71 71s-31.7 71-71 71s-71-31.7-71-71c0-26.4 14.3-49.4 35.6-61.6c7.3 21.6 16.6 42.7 27.2 65.4l16.4-7.6c-10.7-23-19.9-43.7-26.8-64.7c5.9-1.6 12.1-2.5 18.6-2.5m-248.4 12c16.6 11.2 28.2 29.2 30.8 50h-55.8zm96.4 44c-8.4 0-15 6.6-15 15s6.6 15 15 15s15-6.6 15-15s-6.6-15-15-15"></path>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.fitnessPerformance.title'),
                subtitle: t('home2.wellnessPrograms.programs.fitnessPerformance.subtitle'),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 128 128" className="w-8 h-8">
                    <linearGradient id="SVGI5Fauepg" x1={77.018} x2={77.018} y1={71.379} y2={109.706} gradientTransform="translate(0 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.5} stopColor="#ffca28"></stop>
                    </linearGradient>
                    <path fill="url(#SVGI5Fauepg)" d="M87.45 86.8c-1.78-1.92-4.11-4.42-6.15-6.58c-3.96-4.17-8.8-7.29-8.8-7.29l-8.05 8.64s3.13 5.76 7.12 9.19c1.95 1.68 4.39 3.39 6.38 4.71c-.3.99-.6 2.28-.73 3.82c-.38 4.78.36 11.08.39 11.78c.12 3.66.16 6.37.16 6.37l6.34-.02L89.39 94c.58-2.57-.14-5.27-1.94-7.2"></path>
                    <linearGradient id="SVGkOr9feBJ" x1={50.982} x2={50.982} y1={71.379} y2={109.706} gradientTransform="translate(0 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.5} stopColor="#ffca28"></stop>
                    </linearGradient>
                    <path fill="url(#SVGkOr9feBJ)" d="M55.49 72.93s-4.84 3.12-8.79 7.3c-2.04 2.16-4.37 4.66-6.15 6.58a7.98 7.98 0 0 0-1.94 7.2l5.28 23.42l6.34.02s.04-2.71.16-6.37c.02-.7.77-7 .39-11.78c-.12-1.54-.43-2.83-.73-3.82c1.99-1.32 4.43-3.03 6.38-4.71c3.99-3.43 7.12-9.19 7.12-9.19z"></path>
                    <path fill="#e0e0e0" d="m42.29 111.07l1.61 6.35l6.34.02l.14-6.37z"></path>
                    <path fill="#4568ad" d="M52.42 119.94c-.01-1.92-1.66-4.1-1.66-4.1h-7.75l-5.98 2.11a4.04 4.04 0 0 0-2.56 3.75v1.28c0 .56.45 1.02 1.01 1.02l15.79-.05c.64 0 1.16-.52 1.16-1.17z"></path>
                    <path fill="#e0e0e0" d="m77.61 111.07l.17 6.37l6.33-.02l1.6-6.35z"></path>
                    <path fill="#4568ad" d="M90.97 117.95L85 115.84h-7.75s-1.66 2.18-1.66 4.11l-.01 2.84c0 .64.52 1.16 1.16 1.17l15.78.04c.56 0 1.01-.45 1.01-1.02v-1.28c0-1.66-1.02-3.14-2.56-3.75"></path>
                    <path fill="#543930" d="M74.86 41.11c-.39-.7.11-1.42.94-2.3c1.33-1.4 2.78-4.66 1.44-7.97c.01-.02-.26-.58-.26-.59l-.56-.03c-.18-.03-6.27-.04-12.36-.04s-12.18.01-12.36.04c0 0-.82.6-.81.62c-1.35 3.31.1 6.56 1.44 7.97c.84.88 1.33 1.6.94 2.3c-.37.68-1.49.78-1.49.78s.26.7.88 1.08c.57.35 1.28.43 1.76.44c0 0 1.9 2.63 6.87 2.63h5.54c4.97 0 6.87-2.63 6.87-2.63c.49-.01 1.19-.09 1.76-.44c.62-.38.88-1.08.88-1.08s-1.11-.09-1.48-.78"></path>
                    <radialGradient id="SVGQTYbtbhi" cx={109.646} cy={42.861} r={7.242} gradientTransform="matrix(1 0 0 -.4912 -41.072 62.879)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.728} stopColor="#6d4c41" stopOpacity={0}></stop>
                      <stop offset={1} stopColor="#6d4c41"></stop>
                    </radialGradient>
                    <path fill="url(#SVGQTYbtbhi)" d="M64.06 46.04v-2.92l8.84-.7l.8.99s-1.9 2.63-6.87 2.63z"></path>
                    <radialGradient id="SVG9e2tV90u" cx={103.996} cy={37.956} r={2.14} gradientTransform="matrix(-.9057 .4238 .3144 .6719 157.967 -28.83)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.663} stopColor="#6d4c41"></stop>
                      <stop offset={1} stopColor="#6d4c41" stopOpacity={0}></stop>
                    </radialGradient>
                    <path fill="url(#SVG9e2tV90u)" d="M73.68 42.14c-1.32-2.01 1.61-2.76 1.61-2.76c-.51.63-.74 1.19-.44 1.73c.37.68 1.49.78 1.49.78s-1.52 1.35-2.66.25"></path>
                    <radialGradient id="SVGQ11eCbyC" cx={110.132} cy={34.801} r={9.401} gradientTransform="matrix(-.0746 -.9972 -.8311 .0622 107.303 142.355)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.725} stopColor="#6d4c41" stopOpacity={0}></stop>
                      <stop offset={1} stopColor="#6d4c41"></stop>
                    </radialGradient>
                    <path fill="url(#SVGQ11eCbyC)" d="M77.24 30.85c1.31 3.2-.07 6.5-1.36 7.89c-.18.19-.93.93-1.1 1.52c0 0-2.95-4.12-3.83-6.53c-.18-.49-.34-.99-.36-1.51c-.02-.39.04-.85.27-1.18c.28-.41 6.24-.52 6.24-.52c-.01-.01.14.33.14.33"></path>
                    <radialGradient id="SVGvR3j3cqT" cx={59.899} cy={32.408} r={9.401} gradientTransform="matrix(.0746 -.9972 .8311 .0622 26.571 92.41)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.725} stopColor="#6d4c41" stopOpacity={0}></stop>
                      <stop offset={1} stopColor="#6d4c41"></stop>
                    </radialGradient>
                    <path fill="url(#SVGvR3j3cqT)" d="M50.89 30.85c-1.31 3.2.07 6.5 1.36 7.89c.18.19.93.93 1.1 1.52c0 0 2.95-4.12 3.83-6.53c.18-.49.34-.99.36-1.51c.02-.39-.04-.85-.27-1.18c-.28-.41-.6-.3-1.06-.3c-.89 0-4.79-.23-5.09-.23c.01 0-.23.34-.23.34"></path>
                    <radialGradient id="SVGFtTw9cNA" cx={61.562} cy={42.861} r={7.242} gradientTransform="matrix(-1 0 0 -.4912 121.124 62.879)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.728} stopColor="#6d4c41" stopOpacity={0}></stop>
                      <stop offset={1} stopColor="#6d4c41"></stop>
                    </radialGradient>
                    <path fill="url(#SVGFtTw9cNA)" d="M64.07 46.04v-2.92l-8.84-.7l-.8.99s1.9 2.63 6.87 2.63z"></path>
                    <radialGradient id="SVGqjooybRL" cx={52.1} cy={39.099} r={2.14} gradientTransform="matrix(.9057 .4238 -.3144 .6719 17.533 -7.604)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.663} stopColor="#6d4c41"></stop>
                      <stop offset={1} stopColor="#6d4c41" stopOpacity={0}></stop>
                    </radialGradient>
                    <path fill="url(#SVGqjooybRL)" d="M54.46 42.14c1.33-2.01-1.61-2.76-1.61-2.76c.51.63.74 1.19.44 1.73c-.37.68-1.49.78-1.49.78s1.51 1.35 2.66.25"></path>
                    <linearGradient id="SVG1Zn0jmrE" x1={80.671} x2={93.508} y1={41.656} y2={20.633} gradientTransform="translate(0 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.5} stopColor="#ffca28"></stop>
                    </linearGradient>
                    <path fill="url(#SVG1Zn0jmrE)" d="m96.26 23.12l-4.54-2.29c-3.63 3.56-5.35 6.61-6.97 11.92c-3.43 1.63-6.39 4.62-8.31 7.71c-2.04 2.81-3.32 4.37-4.79 7.16c-1.11 2.12-.31 4.48 1.7 5.95c.95.7 1.72 1 2.47 1c.84 0 1.64-.39 2.62-1.05c2.07-1.18 4.88-4.3 6.68-6.62l-.05-.03c2.29-2.85 4.6-6.87 5.75-10.67c3.22-3.36 5.44-7.77 5.44-13.08"></path>
                    <linearGradient id="SVGKrJ4lc7X" x1={47.197} x2={34.267} y1={41.477} y2={20.733} gradientTransform="translate(0 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.5} stopColor="#ffca28"></stop>
                    </linearGradient>
                    <path fill="url(#SVGKrJ4lc7X)" d="M56.35 47.63c-1.47-2.79-2.75-4.35-4.79-7.16c-1.92-3.09-4.88-6.08-8.31-7.71c-1.63-5.33-3.35-8.37-6.98-11.93l-4.53 2.3c0 5.31 2.22 9.71 5.44 13.08c1.15 3.79 3.45 7.82 5.75 10.67l-.05.03c1.8 2.32 4.61 5.44 6.68 6.62c.98.66 1.78 1.05 2.62 1.05c.75 0 1.52-.31 2.47-1c2-1.47 2.81-3.84 1.7-5.95"></path>
                    <linearGradient id="SVGFWYKXdCd" x1={64} x2={64} y1={44.123} y2={69.62} gradientTransform="translate(0 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#f78c1f"></stop>
                      <stop offset={0.494} stopColor="#f37f20"></stop>
                      <stop offset={1} stopColor="#ed6d23"></stop>
                    </linearGradient>
                    <path fill="url(#SVGFWYKXdCd)" d="M76.44 40.46c-1.79 2.46-2.99 3.97-4.25 6.18c-1.23-.32-2.62-.5-4.16-.5h-8.17c-1.51 0-2.86.18-4.06.49c-1.26-2.21-2.46-3.72-4.25-6.18l-8.67 6.45c1.8 2.32 5.68 6.62 5.68 6.62c.83 4.06 5.61 20.2 5.61 20.2h20.27l5.17-20.28s3.75-4.28 5.51-6.53z"></path>
                    <path fill="#e59600" d="M60.53 46.84c0 1.66 1.41 3.01 3.15 3.01h.63c1.74 0 3.15-1.35 3.15-3.01v-3.67h-6.93zm-4.99-8.24c-1.55 0-2.82-1.36-2.82-3.03s1.26-3.03 2.82-3.03h16.92c1.55 0 2.82 1.36 2.82 3.03s-1.26 3.03-2.82 3.03z"></path>
                    <path fill="#ffca28" d="M64 19.95c-5.36 0-10.32 5.73-10.32 13.97c0 8.2 5.11 12.25 10.32 12.25s10.32-4.05 10.32-12.25c0-8.24-4.96-13.97-10.32-13.97"></path>
                    <path fill="#e59600" d="m65.19 37.49l-.1-.03H62.9c-.03 0-.07.01-.1.03c-.2.08-.31.29-.21.51c.09.22.53.83 1.41.83s1.31-.61 1.41-.83a.38.38 0 0 0-.22-.51"></path>
                    <path fill="#795548" d="M66.6 39.97c-.99.59-4.22.59-5.2 0c-.57-.34-1.15.18-.91.69c.23.51 2 1.68 3.52 1.68s3.27-1.17 3.5-1.68s-.34-1.03-.91-.69"></path>
                    <g fill="#404040">
                      <ellipse cx={58.98} cy={34.62} rx={1.5} ry={1.56}></ellipse>
                      <ellipse cx={69.02} cy={34.62} rx={1.5} ry={1.56}></ellipse>
                    </g>
                    <path fill="#6d4c41" d="M61.21 31.82c-.29-.38-.95-.93-2.23-.93c-1.29 0-1.95.55-2.23.93c-.13.17-.09.36-.01.48c.08.11.32.21.59.12s.78-.36 1.65-.37c.87.01 1.39.27 1.65.37c.27.09.51-.01.59-.12a.39.39 0 0 0-.01-.48m10.04 0c-.29-.38-.95-.93-2.23-.93c-1.29 0-1.95.55-2.23.93c-.13.17-.09.36-.01.48c.08.11.32.21.59.12s.78-.36 1.65-.37c.87.01 1.39.27 1.65.37c.27.09.51-.01.59-.12a.39.39 0 0 0-.01-.48"></path>
                    <path fill="#543930" d="M76.46 24.19c-.75-1.14-2.45-2.67-3.96-2.77c-.24-1.46-1.81-2.7-3.32-3.17c-4.09-1.3-6.75.16-8.19.94c-.3.16-2.22 1.23-3.56.46c-.84-.48-.83-1.77-.83-1.77s-2.64 1-1.74 3.8c-.9.04-2.09.42-2.72 1.69c-.75 1.51-.48 2.78-.27 3.39c-.78.66-1.76 2.07-1.09 3.9c.51 1.38 2.53 2.01 2.53 2.01c-.14 2.48.32 4 .56 4.62c.04.11.2.1.22-.01c.31-1.23 1.35-5.5 1.25-6.25c0 0 3.51-.7 6.85-3.16c.68-.5 1.42-.93 2.2-1.24c4.2-1.67 5.08 1.18 5.08 1.18s2.91-.56 3.79 3.49c.33 1.52.56 3.94.74 5.64c.01.12.18.15.22.03c.29-.67.88-2.01 1.02-3.37c.05-.48 1.34-1.11 1.9-3.17c.78-2.78-.14-5.42-.68-6.24"></path>
                    <radialGradient id="SVGSjiQoevc" cx={69.378} cy={29.603} r={11.019} gradientTransform="matrix(.3076 .9515 -.706 .2282 69.195 -43.035)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.699} stopColor="#6d4c41" stopOpacity={0}></stop>
                      <stop offset={1} stopColor="#6d4c41"></stop>
                    </radialGradient>
                    <path fill="url(#SVGSjiQoevc)" d="M75.27 33.58c.05-.48 1.34-1.11 1.9-3.17c.06-.22.11-.44.15-.67c.45-2.5-.36-4.8-.86-5.56c-.7-1.06-2.2-2.44-3.62-2.73c-.12-.02-.24-.03-.36-.04c0 0 .1.66-.17 1.19c-.35.69-1.05.85-1.05.85c3.7 3.72 3.44 6.82 4.01 10.13"></path>
                    <radialGradient id="SVGEGxqocyB" cx={58.541} cy={16.376} r={2.889} gradientTransform="matrix(.8813 .4726 -.5603 1.045 16.48 -27.056)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.58} stopColor="#6d4c41"></stop>
                      <stop offset={1} stopColor="#6d4c41" stopOpacity={0}></stop>
                    </radialGradient>
                    <path fill="url(#SVGEGxqocyB)" d="M61.89 18.71c-.34.16-.64.33-.9.47c-.3.16-2.22 1.23-3.56.46c-.83-.47-.83-1.73-.83-1.77c-.38.49-1.53 3.95 1.83 4.18c1.45.1 2.35-1.17 2.88-2.24c.19-.38.5-.95.58-1.1"></path>
                    <radialGradient id="SVGmUQN0c2K" cx={164.404} cy={66.859} r={8.882} gradientTransform="matrix(-.9378 -.3944 .2182 -.5285 204.944 123.14)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.699} stopColor="#6d4c41" stopOpacity={0}></stop>
                      <stop offset={1} stopColor="#6d4c41"></stop>
                    </radialGradient>
                    <path fill="url(#SVGmUQN0c2K)" d="M68.75 18.11c2.26.61 3.37 1.76 3.74 3.3c.11.45.24 4.66-7.8-.12c-2.99-1.78-2.17-2.9-1.82-3.02c1.36-.49 3.35-.84 5.88-.16"></path>
                    <radialGradient id="SVG1ut1Beid" cx={57.734} cy={18.539} r={2.652} gradientTransform="matrix(1 0 0 1.2233 0 -2.322)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.702} stopColor="#6d4c41" stopOpacity={0}></stop>
                      <stop offset={1} stopColor="#6d4c41"></stop>
                    </radialGradient>
                    <path fill="url(#SVG1ut1Beid)" d="M56.59 17.87c-.01 0-.01 0-.02.01c-.29.12-2.55 1.17-1.71 3.79l2.41.39c-2.12-2.16-.67-4.2-.68-4.19c.01-.01.01 0 0 0"></path>
                    <radialGradient id="SVG20MDveGV" cx={59.595} cy={24.791} r={4.974} gradientTransform="matrix(-.9657 -.2598 .2432 -.9037 108.89 62.925)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.66} stopColor="#6d4c41" stopOpacity={0}></stop>
                      <stop offset={1} stopColor="#6d4c41"></stop>
                    </radialGradient>
                    <path fill="url(#SVG20MDveGV)" d="m56.36 21.91l-1.49-.24c-.06 0-.26.02-.36.03c-.84.12-1.82.55-2.36 1.66c-.57 1.19-.56 2.22-.4 2.9c.04.23.14.49.14.49s.74-.7 2.49-.74z"></path>
                    <radialGradient id="SVGVfJdaciL" cx={56.063} cy={28.232} r={5.222} gradientTransform="matrix(.9907 .1363 -.1915 1.3921 6.058 -17.103)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.598} stopColor="#6d4c41" stopOpacity={0}></stop>
                      <stop offset={1} stopColor="#6d4c41"></stop>
                    </radialGradient>
                    <path fill="url(#SVGVfJdaciL)" d="M51.81 26.81c-.73.65-1.72 2.1-.99 3.9c.55 1.36 2.5 1.95 2.5 1.95c0 .01.39.12.59.12l.46-6.78c-.94 0-1.84.28-2.42.68c.01.02-.14.12-.14.13"></path>
                    <radialGradient id="SVGOxz9U3tf" cx={35.39} cy={19.198} r={5.677} gradientTransform="translate(0 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.5} stopColor="#ffca28"></stop>
                    </radialGradient>
                    <path fill="url(#SVGOxz9U3tf)" d="M40.26 17.16c-.9-.53-5.17-1.2-8.12-1.2c-1.62 0-2.83.21-2.83.76l-.01 3.43c-.01 3.45 2.24 6.27 5.96 6.28h.01c6.74 0 7.27-7.94 4.99-9.27"></path>
                    <path fill="#eda600" d="M41.03 16.12c-.35.9-2.25.04-2.97-.33c-.11-.88-.22-1.46-.22-1.46v.01c.03.5-.47.86-.94.68c-.53-.21-1.14-.38-1.58-.36c-.17.01-.31.04-.44.08c-.12-.39-.19-.65-.19-.65v.11c-.02.34-.18.66-.46.85c-1.09.71-1.37 2.05-.08 3.48c-.44.3-1.13.28-1.52-.12c-.5-.5-.71-2.09-1-3.27c.09.84.34 2.34.22 2.92c-.15.7-.85 1.14-1.55.97c-.61-.15-1.33-.64-1.68-1.99l.13.85c.07.5.34.94.76 1.24c.32.24.71.37 1.11.37q.15 0 .3-.03c.19-.03.36-.09.52-.17c.01-.01.03-.01.04-.02s.03-.01.04-.02c.42-.23.63-.55.64-.57c.05.08.57.51 1.2.51c.87 0 1.21-.35 1.21-.35q.12.075.24.12c.06.02 2.4.81 2.31 1.7c-.01.11 0 .22.01.33v.05c.03.26.09.51.18.74l.01-.01c.24-.19.82-.03.87-.37c.19-1.29.14-2.83.02-4.15l2.52.42z"></path>
                    <linearGradient id="SVG8SvXebgw" x1={64} x2={64} y1={13.379} y2={19.437} gradientTransform="translate(0 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#bdbdbd"></stop>
                      <stop offset={1} stopColor="#757575"></stop>
                    </linearGradient>
                    <path fill="url(#SVG8SvXebgw)" d="M124 18.5c0 1.38-.73 2.5-1.64 2.5H5.64C4.74 21 4 19.88 4 18.5S4.74 16 5.64 16h116.71c.91 0 1.65 1.12 1.65 2.5"></path>
                    <radialGradient id="SVGHiKRgr2K" cx={-102.258} cy={115.861} r={24.348} gradientTransform="matrix(0 .9016 .507 0 -37.874 100.877)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.396} stopColor="#9e9e9e"></stop>
                      <stop offset={0.79} stopColor="#646464"></stop>
                    </radialGradient>
                    <path fill="url(#SVGHiKRgr2K)" d="M20.92 32.99c3.31 0 6-2.69 6-6V10.14c0-3.31-2.69-6-6-6s-6 2.69-6 6v16.85c0 3.31 2.68 6 6 6"></path>
                    <radialGradient id="SVG6GYPeeuv" cx={-1251.918} cy={123.75} r={24.348} gradientTransform="matrix(0 .9016 -.507 0 169.876 1137.497)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.396} stopColor="#9e9e9e"></stop>
                      <stop offset={0.79} stopColor="#646464"></stop>
                    </radialGradient>
                    <path fill="url(#SVG6GYPeeuv)" d="M107.08 32.99c-3.31 0-6-2.69-6-6V10.14c0-3.31 2.69-6 6-6s6 2.69 6 6v16.85c0 3.31-2.68 6-6 6"></path>
                    <radialGradient id="SVGxKJeHbOX" cx={-172.46} cy={114.075} r={3.543} gradientTransform="matrix(1.3333 0 0 -2.3062 240.163 275.933)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.441} stopColor="#9e9e9e"></stop>
                      <stop offset={0.985} stopColor="#646464"></stop>
                    </radialGradient>
                    <path fill="url(#SVGxKJeHbOX)" d="M10 27.22c2.21 0 4-1.79 4-4v-9.31c0-2.21-1.79-4-4-4s-4 1.79-4 4v9.31c0 2.21 1.79 4 4 4"></path>
                    <radialGradient id="SVGKyhKmcMd" cx={-1204.1} cy={114.075} r={3.543} gradientTransform="matrix(-1.3333 0 0 -2.3062 -1487.734 275.933)" gradientUnits="userSpaceOnUse">
                      <stop offset={0.441} stopColor="#9e9e9e"></stop>
                      <stop offset={0.985} stopColor="#646464"></stop>
                    </radialGradient>
                    <path fill="url(#SVGKyhKmcMd)" d="M118 27.22c-2.21 0-4-1.79-4-4v-9.31c0-2.21 1.79-4 4-4s4 1.79 4 4v9.31c0 2.21-1.79 4-4 4"></path>
                    <path fill="#646464" d="M38.61 21h-9.33l-.8-5h10.13z"></path>
                    <linearGradient id="SVGr5EqKdYo" x1={34.798} x2={34.903} y1={14.626} y2={11.312} gradientTransform="translate(0 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.5} stopColor="#ffca28"></stop>
                    </linearGradient>
                    <path fill="url(#SVGr5EqKdYo)" d="m41.22 15.04l-.29 1.55l-.06.34l-.14.75l-.08.44a1.88 1.88 0 0 1-2.18 1.5c-.46-.08-.85-.32-1.12-.68c-.33.3-.76.47-1.23.47c-.28 0-1.16-.39-1.31-.54a.7.7 0 0 1-.11-.13c-.04.03-.08.07-.12.1c-.02.01-.59.35-1.17.34c-.54-.01-1.08-.34-1.24-.5c-.16.23-.38.43-.64.57q-.27.165-.6.21q-.15.03-.3.03c-.4 0-.79-.13-1.11-.37c-.42-.3-.69-.74-.76-1.24l-.13-.85v-.01l-.17-1.09c-.08-.5.04-1 .34-1.41c.3-.42.74-.69 1.24-.76c.12-.02.24-.03.36-.02c.03 0 .07 0 .1.01c.32.02.64.13.92.33c.04.03.07.06.1.08c.06-.23.18-.45.33-.63c.04-.06.08-.11.13-.16c.06-.07.11-.1.13-.12c.01 0 .01-.01.01-.01c.3-.26.69-.42 1.12-.44c.14-.01.28 0 .41.02c.1.02.19.05.28.08q.39.12.69.39c.06-.08.13-.16.2-.23c.1-.1.21-.19.32-.26c.06-.04.13-.07.19-.11c.25-.12.53-.18.82-.17c.32 0 .63.08.91.24c.05.02.09.05.13.08c.1.07.19.15.28.24c.16.16.29.35.38.55c.12-.18.28-.35.47-.48c.04-.03.09-.06.14-.08c.2-.11.41-.19.63-.22c.21-.03.42-.03.63.01c.5.09.92.37 1.21.78c.28.42.38.91.29 1.4"></path>
                    <path fill="#7c7c7c" d="m75.45 74.12l-.7-1.96H53.78l-.38 2l-9 7.91L54.44 92.5s6.79-5.67 7.4-6.21c.67-.6 1.48-.67 1.97-.68c.49.01 1.3.08 1.97.68c.61.55 7.4 6.21 7.4 6.21L83.6 82.07z"></path>
                    <path fill="#eda600" d="M41.03 16.12c-.35.9-2.25.04-2.97-.33c-.11-.88-.22-1.46-.22-1.46v.01c.03.5-.47.86-.94.68c-.53-.21-1.14-.38-1.58-.36c-.17.01-.31.04-.44.08c-.12-.39-.19-.65-.19-.65v.11c-.02.34-.18.66-.46.85c-1.09.71-1.37 2.05-.08 3.48c-.44.3-1.13.28-1.52-.12c-.5-.5-.71-2.09-1-3.27c.09.84.34 2.34.22 2.92c-.15.7-.85 1.14-1.55.97c-.61-.15-1.33-.64-1.68-1.99l.13.85c.07.5.34.94.76 1.24c.32.24.71.37 1.11.37q.15 0 .3-.03c.19-.03.36-.09.52-.17c.01-.01.03-.01.04-.02s.03-.01.04-.02c.42-.23.63-.55.64-.57c.05.08.57.51 1.2.51c.87 0 1.21-.35 1.21-.35q.12.075.24.12c.06.02 2.4.81 2.31 1.7c-.01.11 0 .22.01.33v.05c.03.26.09.51.18.74l.01-.01c.24-.19.82-.03.87-.37c.19-1.29.14-2.83.02-4.15l2.52.42z"></path>
                    <linearGradient id="SVGjr1rHb5j" x1={35.008} x2={40.307} y1={18.332} y2={15.679} gradientTransform="translate(0 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.469} stopColor="#ffca28"></stop>
                    </linearGradient>
                    <path fill="url(#SVGjr1rHb5j)" d="M41.51 19.38c-.49-2.69-3.74-3.81-4.96-4.24c-.15-.05-2.38-.58-2.65 1.4c-.12.86.53 1.8 1.36 2.12c2.27.87 2.26 1.35 2.26 1.67c-.01.83.45 2.4 1.17 2.87c.15.1.32.16.48.16q.15 0 .3-.06c1.41-.59 2.32-2.35 2.04-3.92"></path>
                    <radialGradient id="SVGlTTC1dip" cx={39.39} cy={19.198} r={5.677} gradientTransform="matrix(-1 0 0 1 132.12 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.5} stopColor="#ffca28"></stop>
                    </radialGradient>
                    <path fill="url(#SVGlTTC1dip)" d="M87.86 17.16c.9-.53 5.17-1.2 8.12-1.2c1.62 0 2.83.21 2.83.76l.01 3.43c.01 3.45-2.24 6.27-5.96 6.28h-.01c-6.74 0-7.28-7.94-4.99-9.27"></path>
                    <path fill="#eda600" d="M88.1 20.82c.04.13.39.26.77.36h.01c.44.11.96.33 1.93.6c1.35.38 1.46 2.19 1.46 2.19c.25-.94-.39-2.59-1.28-2.97v-.01c-.42-.2-.89-.31-1.39-.39c-.08-.01-.28-.02-.53-.01h-.01c-.45.01-1.01.07-.96.23"></path>
                    <path fill="#646464" d="M89.51 16h10.13l-.8 5h-9.33z"></path>
                    <linearGradient id="SVGpFYCTJIt" x1={38.798} x2={38.903} y1={14.626} y2={11.312} gradientTransform="matrix(-1 0 0 1 132.12 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.5} stopColor="#ffca28"></stop>
                    </linearGradient>
                    <path fill="url(#SVGpFYCTJIt)" d="m86.9 15.04l.29 1.55l.06.34l.14.75l.08.44a1.88 1.88 0 0 0 2.18 1.5c.46-.08.85-.32 1.12-.68c.33.3.76.47 1.23.47c.28 0 1.16-.39 1.31-.54c.04-.04.08-.08.11-.13c.04.03.08.07.12.1c.02.01.59.35 1.17.34c.54-.01 1.07-.34 1.24-.5c.16.23.38.43.64.57q.27.165.6.21q.15.03.3.03c.4 0 .79-.13 1.11-.37c.42-.3.69-.74.76-1.24l.13-.85v-.01l.17-1.09c.08-.5-.04-1-.34-1.41c-.3-.42-.74-.69-1.24-.76c-.12-.02-.24-.03-.36-.02c-.03 0-.07 0-.1.01c-.32.02-.64.13-.92.33c-.04.03-.07.06-.1.08c-.06-.23-.18-.45-.33-.63a1 1 0 0 0-.13-.16c-.06-.07-.11-.1-.13-.12c-.01 0-.01-.01-.01-.01c-.3-.26-.69-.42-1.12-.44c-.14-.01-.28 0-.41.02c-.1.02-.19.05-.28.08q-.39.12-.69.39c-.06-.08-.13-.16-.2-.23c-.1-.1-.21-.19-.32-.26c-.06-.04-.13-.07-.19-.11c-.25-.12-.53-.18-.82-.17c-.32 0-.63.08-.91.24c-.05.02-.09.05-.13.08c-.1.07-.19.15-.28.24c-.16.16-.29.35-.38.55c-.12-.18-.28-.35-.47-.48a.6.6 0 0 0-.14-.08c-.2-.11-.41-.19-.63-.22c-.21-.03-.42-.03-.63.01c-.5.09-.92.37-1.21.78c-.28.42-.38.91-.29 1.4"></path>
                    <path fill="#eda600" d="M87.09 16.12c.35.9 2.25.04 2.97-.33c.11-.88.22-1.46.22-1.46v.01c-.03.5.47.86.94.68c.53-.21 1.14-.38 1.58-.36c.17.01.31.04.44.08c.12-.39.19-.65.19-.65v.11c.02.34.18.66.46.85c1.09.71 1.37 2.05.08 3.48c.44.3 1.13.28 1.52-.12c.5-.5.71-2.09 1-3.27c-.09.84-.34 2.34-.22 2.92c.14.7.85 1.14 1.55.97c.61-.15 1.33-.64 1.68-1.99l-.13.85c-.07.5-.34.94-.76 1.24c-.32.24-.71.37-1.11.37q-.15 0-.3-.03c-.19-.03-.36-.09-.52-.17c-.01-.01-.03-.01-.04-.02s-.03-.01-.04-.02a1.8 1.8 0 0 1-.64-.57c-.05.08-.57.51-1.2.51c-.87 0-1.21-.35-1.21-.35q-.12.075-.24.12c-.07.02-2.39.81-2.31 1.7c.01.11 0 .22-.01.33v.05c-.03.26-.09.51-.18.74l-.01-.01c-.24-.19-.82-.03-.87-.37c-.19-1.29-.14-2.83-.02-4.15l-2.52.42z"></path>
                    <linearGradient id="SVGlJ4MJbYO" x1={39.008} x2={44.307} y1={18.332} y2={15.679} gradientTransform="matrix(-1 0 0 1 132.12 2)" gradientUnits="userSpaceOnUse">
                      <stop offset={0} stopColor="#ffb300"></stop>
                      <stop offset={0.469} stopColor="#ffca28"></stop>
                    </linearGradient>
                    <path fill="url(#SVGlJ4MJbYO)" d="M86.61 19.38c.49-2.69 3.74-3.81 4.96-4.24c.15-.05 2.38-.58 2.65 1.4c.12.86-.53 1.8-1.36 2.12c-2.27.87-2.26 1.35-2.26 1.67c.01.83-.45 2.4-1.17 2.87c-.15.1-.32.16-.48.16q-.15 0-.3-.06c-1.41-.59-2.32-2.35-2.04-3.92"></path>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.exerciseProgram.title'),
                subtitle: t('home2.wellnessPrograms.programs.exerciseProgram.subtitle'),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="w-8 h-8 text-white">
                    <path fill="currentColor" d="M6 1h2v1H6zm10 0h2v1h-2zm6 4V4h-3V2h-1v5h-2V2h-1v2H9V2H8v5H6V2H5v2H2v1H1v17h1v1h20v-1h1V5zm-1 3v3h-3V8zm0 8h-3v-3h3zm0 5h-3v-3h3zM3 18h3v3H3zm0-5h3v3H3zm13 3h-3v-3h3zm-5 0H8v-3h3zm-3 2h3v3H8zm5 0h3v3h-3zm3-7h-3V8h3zm-5-3v3H8V8zm-5 3H3V8h3z"></path>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.healthyDailyLife.title'),
                subtitle: t('home2.wellnessPrograms.programs.healthyDailyLife.subtitle'),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 128 128" className="w-8 h-8">
                    <path fill="#d5d5d5" d="M63.87 43.71S5.32 49.66 5.56 55.41c.19 4.6-1.1 20.34 12.08 36.44c8.64 10.55 23.78 20.72 48.53 20.72c24.34 0 37.71-11.24 46.04-23.4c10.7-15.64 10.17-30.31 10.17-33.95c-.01-7.29-45.66-14.38-58.51-11.51"></path>
                    <path fill="#307d31" d="M66.9 30.59s-3.95-2.59-7.56-2.26c-3.61.34-5.3 2.48-5.3 2.48L42.73 58.95l12.03 13.42l7.85 5.44l15.19-.38l6.71-46.71z"></path>
                    <path fill="#58a12f" d="M67.66 37.46s-2.75-4.63-3.08-8.59s2.77-6.24 4.42-6.24c4.04 0 4.5 2.5 6.92 2.28s3.2-2.36 3.85-5.62c.66-3.32 3.51-5.19 6.1-3.54c2.49 1.59 1.61 6.29 1.61 6.29s1.98-2.42 4.19-.66c1.96 1.57 1.32 6.39 1.32 6.39s4.3-4.96 7.93-2.53s.88 10.79.88 10.79l-1.21 7.49l-20.7-7.93s-1.21-2.86-5.62-2.53c-4.4.33-6.61 4.4-6.61 4.4M45.53 57.29s3.7-7.51 11.75-5c8.44 2.63 6.91 10.76 6.91 10.76s2.16-1.58 4.69-1.8s5.62.22 5.62.22l-.4-4.36s-5.37.71-8.63-3.13c-4.38-5.17-1.43-11.12-1.43-11.12l.77-3.74l-7.71-4.96l-5.29-6.83s-1.76-3.85-6.5-4.07s-6.97 3.12-6.97 3.12s-10.15-2.93-15.33 1.47c-3.5 2.98-2.59 7.86-2.59 7.86s-2.46 1.46-6.71-2.11c-1.89-1.59-5.59-.38-6.14 2.6c-.55 2.97.63 6.68.63 6.68l-3.41 2.09l11.56 11.89z"></path>
                    <path fill="#86c82c" d="M71.19 54.64s-4.69.27-8.26-8.04c-2.14-4.98-.64-14.64 4.41-13.66c3.96.77 3.41 7.49 6.17 8.04c1.37.27 4.41-6.94 10.9-7.38c5.28-.36 12.22 6.61 12.22 6.61s3.08-2.2 3.41-2.97s.88-3.74 4.3-3.52c3.79.24 3.3 4.41 3.3 4.41s4.52-1.76 7.82-.11c3.55 1.78 3.3 5.18 3.3 5.18s3.19-3.41 5.73-1.65s-4.62 15.81-11.45 22.86s-15.67 6.58-15.67 6.58z"></path>
                    <path fill="#d2608c" d="m27.92 32.02l-.83-1.61s2.53-3.27 8.17-2.37c6.19.99 6.81 5.3 6.81 5.3s-3.19 1.21-3.29 1.06s-3.09-3.29-3.09-3.29l-5.92.2z"></path>
                    <path fill="#fff" d="M28.51 33.24s2.88-1.36 5.71-.75s3.49 2.88 3.49 2.88l2.63-1.06s-1.66-3.56-5.57-4.25c-4.29-.76-6.93 1.83-6.93 1.83z"></path>
                    <path fill="#fe2a19" d="M27.58 37.38s9.2-2.61 12.72-4.35c5.64-2.79 10.54-5.3 11.97-6.26c.76-.51 1.29-1.09 2.31-.88s10.19 18.45-4.76 25.09c-6.05 2.69-12.55 3.6-12.55 3.6l-9.34-7.89z"></path>
                    <path fill="#cb1c35" d="M30.77 40.03c-.22.65 4.7 10.02 15.03 6.19c9.72-3.6 6.53-15.1 5.92-15.51c-.4-.26-5.01 2.29-9.99 4.51c-5.2 2.31-10.78 4.29-10.96 4.81"></path>
                    <path fill="#ff5f5d" d="M38.15 41.86c1.7.67 3.95-.03 6.22-1.01c2.09-.9 4.67-2.3 4.74-3.81c.07-1.5-3.6-3.18-4.56-3.15c-.95.04-5.23 1.92-5.8 2.83c-.57.92-1.84 4.65-.6 5.14"></path>
                    <path fill="#f7ca76" d="M37 41.82c-.96-.25-1.84.7-2.08 1.81c-.31 1.45 1.09 1.76 1.73 1.23c.99-.82 1.26-2.81.35-3.04m5.16.78c-.95.03-1.31 1.55-.98 2.64c.42 1.43 1.85 1.05 2.1.26c.46-1.4-.18-2.93-1.12-2.9m5.13-2.53c-.69.61-.02 1.97.9 2.58c1.2.8 2.03-.36 1.73-1.11c-.53-1.33-1.95-2.07-2.63-1.47m1.84-4.36c.05.89 1.46 1.25 2.45.96c1.3-.38.91-1.73.18-1.98c-1.3-.45-2.68.14-2.63 1.02"></path>
                    <path fill="#e9fcae" d="M47.76 59.21c.91-2.46 5.68-6.4 10.72-2.77c4.91 3.54 2.66 9.36.56 11.27c-2.28 2.08-6.82 2.69-9.37-.13s-3.13-5.08-1.91-8.37"></path>
                    <path fill="#307d31" d="M18.32 62.6c.26-.32.91-1.14.51-2.58c-.67-2.41-2.37-5.38-5.62-9.21c-5.67-6.68-8.48-8.42-10.28-6.52c-1.91 2.02.79 6.74 4.38 11.07s9.38 9.26 11.01 7.24"></path>
                    <path fill="#e9fcae" d="M16.41 58.5c-.55.45-3.54-1.63-6.63-5.28S4.42 46.5 5.4 45.75c1.24-.95 5.73 3.76 6.91 5.39s5.33 6.35 4.1 7.36"></path>
                    <path fill="#fff" d="m81.34 39.45l1.69-1.63s5.47 7.27 9.77 4.04c5.17-3.88.06-10.17.06-10.17l2.25-1.12l2.98 4.61l.22 6.52l-5.11 4.44s-5.62 0-6.07-.67c-.45-.68-5.79-6.02-5.79-6.02"></path>
                    <path fill="#d2608c" d="m79.6 40.97l2.23-1.98s6.31 8.95 12.61 4.3c6.04-4.47.49-12.62.49-12.62l2.23-1.31s4.42 4.99 2.67 11.52c-1.41 5.24-6.64 7.69-10.91 6.79c-6.7-1.42-9.32-6.7-9.32-6.7"></path>
                    <path fill="#2c7b2e" d="M88.92 52.48s.18-4.16 6-8.8s10.71-3.37 12.34-1.98c1.64 1.4 3.59 6.54-.84 12.12c-2.12 2.66-3.76 3.04-6.07 2.83c-2.7-.25-7.39-2.59-7.39-2.59z"></path>
                    <path fill="#e0feac" d="M105.05 43.55c-2.43-1.61-7.44.94-10.02 3.35c-2.75 2.58-3.51 5.5-3.51 5.5l6.01 2.12s3.38-.08 5.64-2.66c3.37-3.84 3.7-7.1 1.88-8.31"></path>
                    <path fill="#fe2a19" d="M72.43 45.73c-.84.42-3.98 4.1-3.05 11.42c.97 7.57 6.38 12.55 15.34 13.2c11.47.82 17.92-7.58 18.8-9.1s2.64-4.86 1.41-5.97s-8.9-1.58-17.74-4.33c-9.93-3.1-12.89-6.16-14.76-5.22"></path>
                    <path fill="#cb1c35" d="M76.4 49.99c-1.25.62-2.48 11.73 7.33 14.98c8.45 2.8 14.73-6.5 14.09-7.74s-4.45-.82-10.74-3.05c-6.3-2.24-9.7-4.67-10.68-4.19"></path>
                    <path fill="#fe6261" d="M80.68 55.89c.29 1.47 1.66 3.26 4.77 4.59c2.47 1.06 5.12.59 6.24.12s.69-4.93.18-5.06c-1.59-.41-6.41-2.06-7.88-2.65c-.95-.38-3.62 1.42-3.31 3"></path>
                    <path fill="#f7ca76" d="M80.12 56c-.05-.92-1.54-1.23-2.58-.89c-1.37.44-.97 1.81-.2 2.04c1.37.42 2.83-.24 2.78-1.15m3.01 3.84c-.72-.57-1.94.34-2.37 1.35c-.57 1.32.72 1.93 1.4 1.5c1.22-.76 1.68-2.29.97-2.85"></path>
                    <path fill="#86c82c" d="M68.86 76.25s.27-1.81-1.05-4.43c-.57-1.13-2.82-3.38-1.13-5.32c1.69-1.93 7.41-.72 9.26-.32s4.83.32 5.96-.81s1.93-5.8 6.04-6.93c4.24-1.16 6.24 2.58 7.97 4.11c1.37 1.21 3.38 1.69 6.2.72s2.01 2.74 2.01 2.74l-3.3 7.33zm-50.97-10.3s-2.98-5.72-4.91-14.5s-1.78-11.66.24-12.32c3.46-1.13 5.8 3.06 7.01 2.82s1.45-5.32 4.99-6.12c3.54-.81 4.91 2.42 6.68 5.32s5.07 10.63 5.07 10.63s3.14-1.45 5.88 0s5.4 5.8 6.52 8.86c1.13 3.06 2.23 5.75 2.23 5.75s3.87.73 7.43 2.87c4.03 2.42 5.96 7.17 5.96 7.17l-19.8 1.27s-24-8.62-24.24-9.02c-.25-.4-3.31-3.06-3.06-2.73"></path>
                    <path fill="#2d792a" d="M21.03 69.09s-1.21-2.9-.81-6.6s2.13-6.06 5.03-6.06c2.26 0 6.16 1.47 9.95 6.78s4.27 10.15 4.27 10.15l-16.03-2.09z"></path>
                    <path fill="#e7fcae" d="M22.07 68.04s-1.57-6.39.4-7.89c1.37-1.05 3.46-.72 7.25 3.46c4.32 4.78 5.23 8.94 5.23 8.94z"></path>
                    <path fill="#fff" d="m41.51 74.12l1.85.16s1.05-4.91 5.15-6.93c3.95-1.93 8.13-.32 8.13-.32l.64-2.34l-4.35-1.77l-5.88 1.21s-5.32 4.83-5.32 5.07s-.22 4.68-.22 4.92"></path>
                    <path fill="#d2608c" d="M38.3 74.83c0-.24.49-7 6.2-10.79c7.25-4.81 13.25-.72 13.25-.72L57 65.63s-6.24-2.73-11.05 1.39c-3.95 3.38-4.83 8.46-4.83 8.46z"></path>
                    <path fill="#f6f6f6" d="M67.45 108.67c34.77-.11 46.57-28.2 49.38-38.6c1.84-6.81 2.5-13 2.5-13l-12.2 13.74s-38.26 7.34-39.54 7.34s-22.42-1.7-22.42-1.7l-21.72-5.19L8.56 56.84s.28 8.97 2.69 15.78c1.86 5.25 12.63 36.19 56.2 36.05"></path>
                    <path fill="#fff" d="M64.04 80.43c16.6.21 40.86-4.11 49.95-13.2c5.82-5.82 5.39-11.07 5.39-11.07s-10.5 19.83-55.49 19.16C25.73 74.75 8.53 56.79 8.53 56.79s1.02 6.18 5.7 10.02C25.3 75.86 41.9 80.14 64.04 80.43m-43.58-1.61c-1.95 1.83.16 6.48 4.92 10.67s9.52 7.55 11.9 5.17c2.47-2.47-3.36-8.37-6.65-11.24s-7.63-6.98-10.17-4.6"></path>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.improvingHealth.title'),
                subtitle: t('home2.wellnessPrograms.programs.improvingHealth.subtitle'),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 128 128" className="w-8 h-8">
                    <path fill="#7cb342" d="M93.96 8.97C72.05 8.97 64 31.35 64 31.35S56.06 8.97 33.99 8.97c-16.58 0-35.48 13.14-28.5 43.01s58.56 67.08 58.56 67.08s51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.47-43.01"></path>
                    <path fill="#689f38" d="M30.61 11.2c17.2 0 25.74 18.49 28.5 25.98c.39 1.07 1.88 1.1 2.33.06l2.52-5.88C60.41 20.01 50.65 8.97 33.99 8.97c-6.9 0-14.19 2.28-19.86 7.09c5.01-3.29 10.88-4.86 16.48-4.86m63.35-2.23c-5.29 0-9.77 1.54-13.53 3.85c2.64-1.02 5.56-1.62 8.8-1.62c16.21 0 30.72 12.29 24.17 40.7c-5.62 24.39-38.46 53.98-48.49 65.27c-.64.72-.86 1.88-.86 1.88s51.39-37.21 58.38-67.08c6.98-29.86-11.9-43-28.47-43"></path>
                    <path fill="#aed581" d="M17 24.82c3.75-4.68 10.45-8.55 16.13-4.09c3.07 2.41 1.73 7.35-1.02 9.43c-4 3.04-7.48 4.87-9.92 9.63c-1.46 2.86-2.34 5.99-2.79 9.18c-.18 1.26-1.83 1.57-2.45.46c-4.22-7.48-5.42-17.78.05-24.61m60.13 9.84c-1.76 0-3-1.7-2.36-3.34c1.19-3.02 2.73-5.94 4.58-8.54c2.74-3.84 7.95-6.08 11.25-3.75c3.38 2.38 2.94 7.14.57 9.44c-5.1 4.93-11.51 6.19-14.04 6.19"></path>
                  </svg>
                )
              }
            ].map((program, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                {/* Green Circle Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  {program.icon}
                  </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {program.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Statistics Section */}
      <section
        id="experience-stats"
        className="relative py-24 bg-green-800"
        style={{
          backgroundImage: "url('/images/63H4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                {t('home2.experienceStats.title')}
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {t('home2.experienceStats.subtitle')}
              </p>
              <button className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl bg-green-500 hover:bg-green-600">
                {t('home2.experienceStats.button')}
              </button>
            </div>

            {/* Right Side - Statistics */}
            <div className="lg:col-span-2 grid grid-cols-3 gap-8">
              {[
                {
                  number: t('home2.experienceStats.stats.workoutSessions.number'),
                  label: t('home2.experienceStats.stats.workoutSessions.label'),
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" className="w-8 h-8 text-green-300">
                      <g fill="none">
                        <path fill="#533566" d="M11 30v-2.5l-1.898.5s-.53.38-1.917 1.2c-.307.18-.14.8-.14.8zm10.01 0L21 27.5l1.892.5s.36.38 1.92 1.2c.312.16.142.8.142.8z"></path>
                        <path fill="#ffc83d" d="M14.5 14.878L12.323 16L7.86 7.013c-.254-.516-.058-.665.44-.924l.244-.06c-.489.25 2.313 1.51 1.552-.029zm3 0L19.677 16l4.462-8.987c.254-.516.058-.665-.44-.924l-.244-.06c.489.25-2.313 1.51-1.552-.029z"></path>
                        <path fill="#ff6723" d="M21.155 13.483a.253.253 0 0 0-.112-.324L18.5 11.8L18 14l.04.07a3.84 3.84 0 0 0-2.04-.6c-.74 0-1.43.22-2.02.59l.03-.06l-.46-2.2l-2.59 1.36a.253.253 0 0 0-.115.325c.293.67 1.155 2.744 1.155 3.865V22h8v-4.65c0-1.122.864-3.198 1.155-3.867"></path>
                        <path fill="#f1a11e" d="M13.4 13c.13.09.28.15.45.15l.05.72c.03.21.08.4.17.58c-.4-.16-.67-.55-.67-.99zm4.6 1.43c.08-.17.13-.36.16-.56l.05-.72c.15-.01.3-.06.42-.15v.46c0 .42-.25.8-.63.97"></path>
                        <path fill="#fdbb11" d="M14.5 12.82a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m4.5 0a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0"></path>
                        <path fill="#ffc83d" d="M16.53 9.28h-1.064c-1.189 0-2.088 1.02-1.952 2.286l.174 2.801c.125.95.918 1.663 1.856 1.663h.909c.938 0 1.73-.713 1.856-1.663l.174-2.8c.155-1.218-.764-2.287-1.953-2.287"></path>
                        <path fill="#990839" d="M15.993 14.68c-.24 0-.453-.06-.64-.17c-.062-.04-.134.04-.09.11c.16.27.428.45.739.45c.31 0 .578-.18.738-.45c.035-.07-.027-.15-.09-.11a1.35 1.35 0 0 1-.657.17"></path>
                        <path fill="#ed9200" d="m15.82 13.135l-.26.84c-.05.17.08.35.25.35h.38c.18 0 .31-.17.25-.35l-.26-.84c-.04-.18-.3-.18-.36 0"></path>
                        <path fill="#fff" d="M14.253 13.19a.644.644 0 0 1 .629-.49c.314 0 .582.222.628.517a.103.103 0 0 1-.102.13h-1.035a.128.128 0 0 1-.12-.157m3.507 0a.644.644 0 0 0-.628-.49a.63.63 0 0 0-.628.517c-.019.074.037.13.101.13h1.035a.128.128 0 0 0 .12-.157"></path>
                        <path fill="#7d4533" d="M14.567 13.236c0-.231.185-.416.416-.416c.222 0 .407.185.416.416c0 .037-.01.074-.018.11h-.795a.5.5 0 0 1-.019-.11m2.879 0a.414.414 0 0 0-.416-.416a.426.426 0 0 0-.416.416c0 .037.01.074.019.11h.795a.5.5 0 0 0 .018-.11"></path>
                        <path fill="#fff" d="M14.908 13.07a.073.073 0 1 1-.147-.001a.073.073 0 0 1 .147 0m2.075.001a.073.073 0 1 1-.147 0a.073.073 0 0 1 .147 0"></path>
                        <path fill="#000" d="M14.974 12.996c.139 0 .24.11.24.24q.002.056-.037.11h-.416a.24.24 0 0 1 .213-.351m2.066.001c-.139 0-.24.11-.24.24c0 .037.009.074.037.11h.415a.24.24 0 0 0-.213-.351"></path>
                        <path fill="#d37034" d="M14.322 12.03h.002l.01-.002l.044-.003q.061-.005.167.007a1.1 1.1 0 0 1 .506.194a.137.137 0 0 0 .158-.223a1.37 1.37 0 0 0-.923-.245h-.006l-.001.001h-.002a.137.137 0 0 0 .045.27m3.542-.085a.137.137 0 0 0-.105-.163l-.003-.001l-.005-.001l-.018-.003l-.061-.008a1.4 1.4 0 0 0-.855.21a.137.137 0 0 0 .146.233a1.12 1.12 0 0 1 .683-.17l.055.008a.137.137 0 0 0 .163-.105"></path>
                        <path fill="#9b9b9b" d="m23.05 20l-3.12 2h-7.81L9 20l.45 3.17l.55.93c2.26 1.35 3.39 1.9 6.02 1.9s3.72-.7 5.98-2.06l.5-.93z"></path>
                        <path fill="#ffc83d" d="m9.14 28l-.46-5.04h2.93L11 28zM21 28l-.53-5.04h2.77L22.86 28z"></path>
                        <path fill="#f1a11e" d="M18.853 10.61c-.14-.25-.355-.43-.588-.52c-.26-.1-.484-.28-.633-.53a1.056 1.056 0 0 0-1.36-.47a.68.68 0 0 1-.56 0c-.13-.06-.27-.09-.429-.09c-.391 0-.727.22-.922.54c-.15.26-.373.45-.644.55c-.251.09-.465.28-.605.56c-.177.39-.14.86.084 1.21a.8.8 0 0 1 .125.345a.75.75 0 0 1 .322-.127v-.088c0-.92.699-1.67 1.556-1.67h.597c.13 0 .242.08.289.21c.186.43.587.71 1.034.71h.652c.355.02.634.33.643.71l-.008.136a.75.75 0 0 1 .292.132a.8.8 0 0 1 .127-.358c.214-.36.242-.84.027-1.25"></path>
                        <path fill="#9b9b9b" d="M2 6.13A.13.13 0 0 1 2.13 6H3v1h-.87A.13.13 0 0 1 2 6.87zM26 6H6v1h20zm3.87 0a.13.13 0 0 1 .13.13v.74a.13.13 0 0 1-.13.13H29V6z"></path>
                        <path fill="#533566" d="M8.515 23h2.96a.533.533 0 0 0 .525-.515V21c0-1.101-.899-2-2-2s-2 .899-2 2v1.485c0 .283.232.515.515.515m11.591 0h2.798a.593.593 0 0 0 .596-.606V21c0-1.101-.9-2-2-2s-2 .899-2 2v1.394c0 .333.273.606.606.606"></path>
                        <path fill="#ffc83d" d="M9.75 5.375a.375.375 0 1 0-.75 0V5.5h-.007a.375.375 0 0 0-.736 0H8.23a.375.375 0 0 0-.729.125v.5a.375.375 0 0 0 .729.125h.022a.375.375 0 0 0 .748 0v.125a.375.375 0 1 0 .75 0a.375.375 0 1 0 .75 0v-.75a.375.375 0 0 0-.729-.125H9.75zm12.5 0a.375.375 0 0 1 .75 0V5.5h.008a.375.375 0 0 1 .735 0h.028a.375.375 0 0 1 .729.125v.5a.375.375 0 0 1-.729.125h-.022a.375.375 0 0 1-.748 0L23 6.375a.375.375 0 0 1-.75 0a.375.375 0 0 1-.75 0v-.75a.375.375 0 0 1 .729-.125h.021z"></path>
                        <path fill="#f59f00" d="M10.625 7.5a.375.375 0 1 1 0-.75a.375.375 0 0 1 0 .75m10.75 0a.375.375 0 1 0 0-.75a.375.375 0 0 0 0 .75"></path>
                        <path fill="#533566" d="M5.9 2a.9.9 0 0 0-.9.9v1.5a.9.9 0 0 0-.9-.9h-.2a.9.9 0 0 0-.9.9v4.2a.9.9 0 0 0 .9.9h.2a.9.9 0 0 0 .9-.9v1.5a.9.9 0 0 0 .9.9h.2a.9.9 0 0 0 .9-.9V2.9a.9.9 0 0 0-.9-.9zm20 0a.9.9 0 0 0-.9.9v7.2a.9.9 0 0 0 .9.9h.2a.9.9 0 0 0 .9-.9V8.6a.9.9 0 0 0 .9.9h.2a.9.9 0 0 0 .9-.9V4.4a.9.9 0 0 0-.9-.9h-.2a.9.9 0 0 0-.9.9V2.9a.9.9 0 0 0-.9-.9z"></path>
                      </g>
                    </svg>
                  )
                },
                {
                  number: t('home2.experienceStats.stats.happyCustomers.number'),
                  label: t('home2.experienceStats.stats.happyCustomers.label'),
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 36 36" className="w-8 h-8 text-green-300">
                      <path fill="#ef9645" d="M16.428 30.331a2.31 2.31 0 0 0 3.217-.568a.8.8 0 0 0-.197-1.114l-1.85-1.949l4.222 2.955a1.497 1.497 0 0 0 2.089-.369a1.5 1.5 0 0 0-.369-2.089l-3.596-3.305l5.375 3.763a1.497 1.497 0 0 0 2.089-.369a1.5 1.5 0 0 0-.369-2.089l-4.766-4.073l5.864 4.105a1.497 1.497 0 0 0 2.089-.369a1.5 1.5 0 0 0-.369-2.089L4.733 11.194l-3.467 5.521c-.389.6-.283 1.413.276 1.891l7.786 6.671q.533.456 1.107.859z"></path>
                      <path fill="#ffdc5d" d="M29.802 21.752L18.5 13.601l-.059-.08l.053-.08l.053-.053l.854.469c.958.62 3.147 1.536 4.806 1.536c1.135 0 1.815-.425 2.018-1.257a1.41 1.41 0 0 0-1.152-1.622a6.8 6.8 0 0 1-2.801-1.091l-.555-.373c-.624-.421-1.331-.898-1.853-1.206c-.65-.394-1.357-.585-2.163-.585c-1.196 0-2.411.422-3.585.83l-1.266.436a5.2 5.2 0 0 1-1.696.271c-1.544 0-3.055-.586-4.516-1.152l-.147-.058a1.39 1.39 0 0 0-1.674.56L1.35 15.669a1.36 1.36 0 0 0 .257 1.761l7.785 6.672c.352.301.722.588 1.1.852l6.165 4.316a2 2 0 0 0 2.786-.491a.803.803 0 0 0-.196-1.115l-1.833-1.283a.424.424 0 0 1-.082-.618a.42.42 0 0 1 .567-.075l3.979 2.785a1.4 1.4 0 0 0 1.606-2.294l-3.724-2.606a.424.424 0 0 1-.082-.618a.423.423 0 0 1 .567-.075l5.132 3.593a1.4 1.4 0 0 0 1.606-2.294l-4.868-3.407a.42.42 0 0 1-.081-.618a.377.377 0 0 1 .506-.066l5.656 3.959a1.4 1.4 0 0 0 1.606-2.295"></path>
                      <path fill="#ef9645" d="M16.536 27.929c-.07.267-.207.498-.389.681l-1.004.996a1.5 1.5 0 0 1-1.437.396a1.5 1.5 0 0 1-.683-2.512l1.004-.996a1.5 1.5 0 0 1 1.437-.396a1.5 1.5 0 0 1 1.072 1.831M5.992 23.008l1.503-1.497a1.5 1.5 0 0 0-.444-2.429a1.495 1.495 0 0 0-1.674.31l-1.503 1.497a1.5 1.5 0 0 0 .445 2.429a1.5 1.5 0 0 0 1.673-.31m5.204.052a1.5 1.5 0 1 0-2.122-2.118L6.072 23.94a1.5 1.5 0 1 0 2.122 2.118zm2.25 3a1.5 1.5 0 0 0-.945-2.555a1.49 1.49 0 0 0-1.173.44L9.323 25.94a1.5 1.5 0 0 0 .945 2.556c.455.036.874-.141 1.173-.44zm16.555-4.137l.627-.542l-6.913-10.85l-12.27 1.985a1.507 1.507 0 0 0-1.235 1.737c.658 2.695 6.003.693 8.355-.601z"></path>
                      <path fill="#ffcc4d" d="M16.536 26.929c-.07.267-.207.498-.389.681l-1.004.996a1.5 1.5 0 0 1-1.437.396a1.5 1.5 0 0 1-.683-2.512l1.004-.996a1.5 1.5 0 0 1 1.437-.396a1.5 1.5 0 0 1 1.072 1.831M5.992 22.008l1.503-1.497a1.5 1.5 0 0 0-.444-2.429a1.5 1.5 0 0 0-1.674.31l-1.503 1.497a1.5 1.5 0 0 0 .445 2.429a1.5 1.5 0 0 0 1.673-.31m5.204.052a1.5 1.5 0 1 0-2.122-2.118L6.072 22.94a1.5 1.5 0 1 0 2.122 2.118zm2.25 3a1.5 1.5 0 0 0-.945-2.555a1.49 1.49 0 0 0-1.173.44L9.323 24.94a1.5 1.5 0 0 0 .945 2.556c.455.036.874-.141 1.173-.44zm21.557-7.456a1.45 1.45 0 0 0 .269-1.885l-.003-.005l-3.467-6.521a1.49 1.49 0 0 0-1.794-.6c-1.992.771-4.174 1.657-6.292.937l-1.098-.377c-1.948-.675-4.066-1.466-6-.294c-.695.409-1.738 1.133-2.411 1.58a6.9 6.9 0 0 1-2.762 1.076a1.5 1.5 0 0 0-1.235 1.737c.613 2.512 5.3.908 7.838-.369a.97.97 0 0 1 1.002.081l11.584 8.416z"></path>
                    </svg>
                  )
                },
                {
                  number: t('home2.experienceStats.stats.programDays.number'),
                  label: t('home2.experienceStats.stats.programDays.label'),
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" className="w-8 h-8 text-green-300">
                      <g fill="none" strokeLinejoin="round" strokeWidth={4}>
                        <path fill="#2f88ff" stroke="#000" d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"></path>
                        <path stroke="#fff" strokeLinecap="round" d="M16 24L22 30L34 18"></path>
                      </g>
                    </svg>
                  )
                }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-green-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-24 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              {t('home2.testimonials.title')}
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t('home2.testimonials.clients.sophia.name'),
                role: t('home2.testimonials.clients.sophia.role'),
                content: t('home2.testimonials.clients.sophia.content'),
                rating: 4,
                image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: t('home2.testimonials.clients.david.name'),
                role: t('home2.testimonials.clients.david.role'),
                content: t('home2.testimonials.clients.david.content'),
                rating: 4,
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                name: t('home2.testimonials.clients.aisha.name'),
                role: t('home2.testimonials.clients.aisha.role'),
                content: t('home2.testimonials.clients.aisha.content'),
                rating: 5,
                image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="text-center">
                {/* Profile Image */}
                <div className="mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {testimonial.name}
                </h3>

                {/* Role */}
                <p className="text-sm text-gray-600 mb-4">
                  {testimonial.role}
                </p>

                {/* Quote */}
                <p className="text-sm text-gray-700 leading-relaxed mb-4 text-left">
                  "{testimonial.content}"
                </p>

                {/* Stars */}
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Because You Matter Template Section */}
      <section
        id="because-you-matter"
        className={`py-24 transition-colors duration-300 ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className={`text-4xl font-extrabold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t('home2.becauseYouMatter.title')}
            </motion.h2>
            <motion.p 
              className={`text-gray-700 max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t('home2.becauseYouMatter.subtitle')}
            </motion.p>
          </motion.div>

          {/* Three Column Content Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: '/images/63H5.jpg',
                title: t('home2.becauseYouMatter.services.familyMedicine.title'),
                description: t('home2.becauseYouMatter.services.familyMedicine.description')
              },
              {
                image: '/images/63H6.jpg',
                title: t('home2.becauseYouMatter.services.certifiedProfessionals.title'),
                description: t('home2.becauseYouMatter.services.certifiedProfessionals.description')
              },
              {
                image: '/images/63H7.jpg',
                title: t('home2.becauseYouMatter.services.improveLife.title'),
                description: t('home2.becauseYouMatter.services.improveLife.description')
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Title */}
                <motion.h3 
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  {item.title}
                </motion.h3>

                {/* Description */}
                <motion.p 
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact CTA Section */}
      <section
        id="contact-cta"
        className="relative h-[70vh] w-full flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/images/63H21.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-2xl px-6 flex flex-col items-center justify-center text-center">
          <motion.h2 
            className="text-4xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('home2.contactCta.title')}
          </motion.h2>
          
          {/* Subtext */}
          <motion.p 
            className="text-xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t('home2.contactCta.subtitle')}
          </motion.p>

          {/* Button */}
          <motion.button
            className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#4CAF50' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('home2.contactCta.button')}
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  )
}