import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'

export default function BlogPost2() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
    const [isDark, setIsDark] = useState(false) // <-- define state

   useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  const user = getCurrentUser()

  return (
<div
      className={`transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >       <Navbar user={user} />

      {/* Hero Section */}
      <section 
        className="relative text-white"
        style={{
          backgroundImage: "url('/images/63B2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{t('blogPost2.hero.category')}</span>
              <span className="text-white/80">•</span>
              <span className="text-white/80">{t('blogPost2.hero.readTime')}</span>
              <span className="text-white/80">•</span>
              <span className="text-white/80">{t('blogPost2.hero.date')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('blogPost2.hero.title')}
            </h1>
            <div className="flex items-center gap-4">
              <img
                src="/images/63BT2.jpg"
                alt={t('blogPost2.hero.author')}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
              />
              <div>
                <p className="font-semibold">{t('blogPost2.hero.author')}</p>
                <p className="text-white/80 text-sm">{t('blogPost2.hero.authorRole')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none dark:prose-invert">
                <img
                  src="/images/63B2.jpg"
                  alt="Ways to Get Motivated"
                  className="w-full h-64 object-cover rounded-xl mb-8"
                />
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {t('blogPost2.content.intro')}
                </p>

                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('blogPost2.content.section1.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost2.content.section1.description')}
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  {t('blogPost2.content.section2.title')}
                </h3>
                <ul className="mb-6 space-y-2">
                  {t('blogPost2.content.section2.benefits', { returnObjects: true }).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500 text-lg">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('blogPost2.content.section3.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost2.content.section3.description')}
                </p>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl mb-8">
                  <h4 className="font-semibold mb-3 text-green-800 dark:text-green-200">
                    {t('blogPost2.content.section3.checklistTitle')}
                  </h4>
                  <ul className="space-y-2 text-green-700 dark:text-green-300">
                    {t('blogPost2.content.section3.checklistItems', { returnObjects: true }).map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('blogPost2.content.section4.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost2.content.section4.description')}
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  {t('blogPost2.content.section4.subtitle')}
                </h3>
                <ul className="mb-8 space-y-2">
                  {t('blogPost2.content.section4.tips', { returnObjects: true }).map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500 text-lg">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('blogPost2.content.section5.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost2.content.section5.description')}
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  {t('blogPost2.content.section5.subtitle')}
                </h3>
                <ul className="mb-8 space-y-2">
                  {t('blogPost2.content.section5.strategies', { returnObjects: true }).map((strategy, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500 text-lg">•</span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('blogPost2.content.section6.title')}
                </h2>
                <p className="mb-6">
                  {t('blogPost2.content.section6.description')}
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  {t('blogPost2.content.section6.subtitle')}
                </h3>
                <ul className="mb-8 space-y-2">
                  {t('blogPost2.content.section6.strategies', { returnObjects: true }).map((strategy, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500 text-lg">•</span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('blogPost2.content.conclusion.title')}
                </h2>
                <p className="mb-8">
                  {t('blogPost2.content.conclusion.mainText')}
                </p>
              </article>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-start gap-4">
                  <img
                    src="/images/63BT2.jpg"
                    alt={t('blogPost2.author.name')}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-200 dark:border-green-700"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('blogPost2.author.name')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {t('blogPost2.author.bio')}
                    </p>
                    <div className="flex gap-2">
                      {t('blogPost2.author.expertise', { returnObjects: true }).map((expertise, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                          {expertise}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              

              {/* Related Posts */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-4">{t('blogPost2.sidebar.relatedPosts')}</h3>
                <div className="space-y-4">
                  <div 
                    className="cursor-pointer group"
                    onClick={() => navigate('/blog/1')}
                  >
                    <h4 className="font-semibold group-hover:text-green-600 transition-colors">
                      {t('blogPost2.sidebar.post1.title')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('blogPost2.sidebar.post1.description')}
                    </p>
                  </div>
                  <div 
                    className="cursor-pointer group"
                    onClick={() => navigate('/blog/3')}
                  >
                    <h4 className="font-semibold group-hover:text-green-600 transition-colors">
                      {t('blogPost2.sidebar.post2.title')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('blogPost2.sidebar.post2.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
