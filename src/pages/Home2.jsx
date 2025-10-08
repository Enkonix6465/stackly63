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
                title: t('home2.whyChooseHealthCoach.services.nutritionStrategies.title'),
                icon: (
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                )
              },
              {
                image: '/images/63H2.jpg',
                title: t('home2.whyChooseHealthCoach.services.workoutRoutines.title'),
                icon: (
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5S15 3.17 15 4s-.67 1.5-1.5 1.5zM9.5 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                )
              },
              {
                image: '/images/63H3.jpg',
                title: t('home2.whyChooseHealthCoach.services.supportMotivation.title'),
                icon: (
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                )
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
                      <div className="flex-shrink-0">
                      {service.icon}
                    </div>
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
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.physicalActivity.title'),
                subtitle: t('home2.wellnessPrograms.programs.physicalActivity.subtitle'),
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.fitnessPerformance.title'),
                subtitle: t('home2.wellnessPrograms.programs.fitnessPerformance.subtitle'),
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43 2.14-2.14 1.43 1.43-2.14 2.14L7.71 12l-1.43 1.43 2.14 2.14-1.43 1.43L4.14 15.57l2.14 2.14L5.57 19l1.43 1.43L8.43 19l2.14 2.14L12 20.57l1.43 1.43L15.57 19l2.14 2.14L19 20.57l1.43-1.43L19 17.43l2.14-2.14L20.57 14.86z"/>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.exerciseProgram.title'),
                subtitle: t('home2.wellnessPrograms.programs.exerciseProgram.subtitle'),
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.healthyDailyLife.title'),
                subtitle: t('home2.wellnessPrograms.programs.healthyDailyLife.subtitle'),
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                )
              },
              {
                title: t('home2.wellnessPrograms.programs.improvingHealth.title'),
                subtitle: t('home2.wellnessPrograms.programs.improvingHealth.subtitle'),
                icon: (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
              <button className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl bg-yellow-400 text-green-800 hover:bg-yellow-300">
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
                    <svg className="w-8 h-8 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.5 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5S15 3.17 15 4s-.67 1.5-1.5 1.5zM9.5 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </svg>
                  )
                },
                {
                  number: t('home2.experienceStats.stats.happyCustomers.number'),
                  label: t('home2.experienceStats.stats.happyCustomers.label'),
                  icon: (
                    <svg className="w-8 h-8 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )
                },
                {
                  number: t('home2.experienceStats.stats.programDays.number'),
                  label: t('home2.experienceStats.stats.programDays.label'),
                  icon: (
                    <svg className="w-8 h-8 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
            <div className="text-sm text-gray-400 mb-2">Health & Wellness</div>
            <div className="w-8 h-px bg-gray-300 mx-auto mb-6"></div>
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
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-gray-400' : 'text-gray-200'}`}
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