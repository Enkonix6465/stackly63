import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAuthenticated } from '../utils/auth'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollAnimation from '../components/ScrollAnimation'
import { useTranslation } from 'react-i18next'

export default function Blog() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [isDark, setIsDark] = useState(false)

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

  const blogPosts = [
    {
      id: 1,
      title: t('blogPage.blogPosts.takeCharge.title'),
      excerpt: t('blogPage.blogPosts.takeCharge.excerpt'),
      image: "/images/63B1.jpg",
      category: t('blogPage.blogPosts.takeCharge.category'),
      author: t('blogPage.blogPosts.takeCharge.author'),
      authorImage: "/images/63BT1.jpg",
      date: t('blogPage.blogPosts.takeCharge.date'),
      readTime: t('blogPage.blogPosts.takeCharge.readTime'),
      featured: true
    },
    {
      id: 2,
      title: t('blogPage.blogPosts.getMotivated.title'),
      excerpt: t('blogPage.blogPosts.getMotivated.excerpt'),
      image: "/images/63B2.jpg",
      category: t('blogPage.blogPosts.getMotivated.category'),
      author: t('blogPage.blogPosts.getMotivated.author'),
      authorImage: "/images/63BT2.jpg",
      date: t('blogPage.blogPosts.getMotivated.date'),
      readTime: t('blogPage.blogPosts.getMotivated.readTime'),
      featured: true
    },
    {
      id: 3,
      title: t('blogPage.blogPosts.boostMetabolism.title'),
      excerpt: t('blogPage.blogPosts.boostMetabolism.excerpt'),
      image: "/images/63B3.jpg",
      category: t('blogPage.blogPosts.boostMetabolism.category'),
      author: t('blogPage.blogPosts.boostMetabolism.author'),
      authorImage: "/images/63BT3.jpg",
      date: t('blogPage.blogPosts.boostMetabolism.date'),
      readTime: t('blogPage.blogPosts.boostMetabolism.readTime'),
      featured: true
    }
  ]

  const categories = [
    { name: 'all', label: t('blogPage.categories.all'), count: 3 },
    { name: 'wellness', label: t('blogPage.categories.wellness'), count: 1 },
    { name: 'motivation', label: t('blogPage.categories.motivation'), count: 1 },
    { name: 'nutrition', label: t('blogPage.categories.nutrition'), count: 1 }
  ]

  const trendingTopics = t('blogPage.trendingTopics.topics', { returnObjects: true })

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`)
  }

  return (
    <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} text-black dark:text-white transition-colors`}>
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
  <source src="/63Blog.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay (darken video for readability) */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-4xl">
    <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
      <p className="text-sm tracking-widest text-green-300 font-medium">
        {t('blogPage.showcase.tagline')}
      </p>
    </ScrollAnimation>
    
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
      <h1 className="mt-4 text-4xl font-extrabold mb-4 leading-tight text-white">
        {t('blogPage.showcase.title')}
      </h1>
    </ScrollAnimation>
    
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
      <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
        {t('blogPage.showcase.subtitle')}
      </p>
    </ScrollAnimation>
    
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-4">
      <div className="mt-8 flex gap-4 justify-center">
        {/* Primary Button */}
        <a
          href="/services"
          className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
          style={{ backgroundColor: '#4CAF50' }}
        >
          {t('blogPage.showcase.subscribeButton')}
        </a>
      </div>
    </ScrollAnimation>
  </div>
</section>





      

      {/* Section 1: Latest News */}
      <section className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('blogPage.latestNews.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg max-w-2xl mx-auto`}>{t('blogPage.latestNews.subtitle')}</p>
            </ScrollAnimation>
          </div>
          
          {/* Articles Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => {
              const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5'];
              const staggerClass = staggerClasses[index] || 'scroll-stagger-3';
              
              return (
              <ScrollAnimation key={post.id} animation="slide-up" stagger={staggerClass}>
                <article 
                  className={`cursor-pointer group rounded-2xl shadow-lg hover:shadow-xl transition-shadow border ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } p-6`}
                  onClick={() => handleBlogClick(post.id)}
                >
                  {/* Image */}
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Date */}
                  <div className="mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.date}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-green-500 transition-colors duration-300`}>
                    {post.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`mb-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {post.excerpt}
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    {post.authorImage ? (
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
                        <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>by {post.author}</span>
                  </div>
                </article>
              </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Take Charge Of Your Life */}
      <section className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
              <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('blogPage.takeCharge.title')}</h2>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg max-w-3xl mx-auto`}>{t('blogPage.takeCharge.subtitle')}</p>
            </ScrollAnimation>
          </div>

          {/* Content Blocks */}
          <div className="relative">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  id: 1,
                  title: t('blogPage.takeCharge.connect.title'),
                  description: t('blogPage.takeCharge.connect.description'),
                  image: "/images/63B5.jpg"
                },
                {
                  id: 2,
                  title: t('blogPage.takeCharge.goNatural.title'),
                  description: t('blogPage.takeCharge.goNatural.description'),
                  image: "/images/63B4.jpg"
                },
                {
                  id: 3,
                  title: t('blogPage.takeCharge.scheduleExercise.title'),
                  description: t('blogPage.takeCharge.scheduleExercise.description'),
                  image: "/images/63B6.jpg"
                },
                {
                  id: 4,
                  title: t('blogPage.takeCharge.celebrateSuccess.title'),
                  description: t('blogPage.takeCharge.celebrateSuccess.description'),
                  image: "/images/63B7.jpg"
                }
              ].map((item, index) => {
                const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6'];
                const staggerClass = staggerClasses[index] || 'scroll-stagger-3';
                
                return (
                <ScrollAnimation key={item.id} animation="slide-up" stagger={staggerClass}>
                  <div className={`text-center rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border ${
                    isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    {/* Circular Image */}
                    <div className="relative mb-6">
                      <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                    
                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                  </div>
                </ScrollAnimation>
                );
              })}
            </div>
          </div>
        </div>
      </section>




      

      {/* Section 4: Trending Topics */}
<section className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>  <div className="mx-auto max-w-7xl px-4">
    {/* Heading */}
    <div className="text-center mb-16">
      <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
        <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('blogPage.trendingTopics.title')}
        </h2>
      </ScrollAnimation>
      <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto text-lg`}>
          {t('blogPage.trendingTopics.subtitle')}
        </p>
      </ScrollAnimation>
    </div>

    {/* Topics Container */}
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-green-500 rounded-3xl"></div>
      </div>
      
      {/* Topics Grid */}
      <div className="relative grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {trendingTopics.map((topic, index) => {
          // Create staggered delays for each topic card
          const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5', 'scroll-stagger-6', 'scroll-stagger-1'];
          const staggerClass = staggerClasses[index] || 'scroll-stagger-3';
          
          // Define unique styling for each topic - all using green variations
          const topicStyles = [
            { 
              bg: isDark ? 'bg-gray-800' : 'bg-white',
              border: isDark ? 'border-gray-700' : 'border-green-200',
              accent: 'bg-green-500',
              icon: '🧠'
            },
            { 
              bg: isDark ? 'bg-gray-800' : 'bg-white',
              border: isDark ? 'border-gray-700' : 'border-green-200',
              accent: 'bg-green-500',
              icon: '🌿'
            },
            { 
              bg: isDark ? 'bg-gray-800' : 'bg-white',
              border: isDark ? 'border-gray-700' : 'border-green-200',
              accent: 'bg-green-500',
              icon: '🥗'
            },
            { 
              bg: isDark ? 'bg-gray-800' : 'bg-white',
              border: isDark ? 'border-gray-700' : 'border-green-200',
              accent: 'bg-green-500',
              icon: '🧘'
            },
            { 
              bg: isDark ? 'bg-gray-800' : 'bg-white',
              border: isDark ? 'border-gray-700' : 'border-green-200',
              accent: 'bg-green-500',
              icon: '💚'
            }
          ];
          
          const style = topicStyles[index] || topicStyles[0];
          
          return (
          <ScrollAnimation key={index} animation="slide-up" stagger={staggerClass}>
            <div className={`group relative ${style.bg} ${style.border} border-2 rounded-2xl p-6 cursor-pointer 
                           transition-all duration-300 hover:shadow-xl hover:scale-105`}>
              
              {/* Icon Container */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${style.accent} 
                              flex items-center justify-center shadow-lg group-hover:shadow-xl
                              group-hover:scale-110 transition-all duration-300`}>
                {index === 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 36 36">
                    <path fill="#ea596e" d="M29.896 26.667c.003.283-.07.653-.146.958c-.531 2.145-2.889 4.552-6.208 4.333c-3.008-.198-5.458-1.642-5.458-3.667s2.444-3.667 5.458-3.667s6.335.018 6.354 2.043"></path>
                    <path fill="#dd2e44" d="M23.542 24.964c-1.619 0-5.314.448-6.162.448c-1.498 0-2.713.94-2.713 2.1c0 .558.286 1.062.744 1.438c0 0 1.006 1.009 2.818.525c.793-.212 2.083-1.786 4.354-2.036c1.131-.125 3.25.75 6.974.771c.16-.344.193-.583.193-.583c0-2.027-3.194-2.663-6.208-2.663"></path>
                    <path fill="#f4abba" d="M29.75 27.625s2.184-.443 3.542-2.229c1.583-2.083 1.375-4.312 1.375-4.312c1.604-3-.5-5.813-.5-5.813C33.958 12.104 32 10.792 32 10.792c-1.271-3.021-4.083-3.833-4.083-3.833c-2.208-2.583-6.125-2.5-6.125-2.5s-3.67-1.345-8.708.167c-.833.25-3.625.833-5.667 2.083C.981 10.649.494 16.793.584 17.792C1.083 23.375 5 24.375 7.5 24.958c.583 1.583 2.729 4.5 6.583 3.417c4.75-.833 6.75-2.25 7.917-2.25s4.417 1.25 7.75 1.5"></path>
                    <g fill="#ea596e">
                      <path d="M17.737 18.648c2.328-1.255 3.59-1.138 4.704-1.037c.354.032.689.057 1.028.055c1.984-.045 3.591-.881 4.302-1.69a.501.501 0 0 0-.752-.661c-.548.624-1.899 1.313-3.573 1.351c-.3.009-.601-.021-.913-.05c-1.195-.111-2.679-.247-5.271 1.152c-.665.359-1.577.492-2.565.592c-2.197-3.171-.875-5.933-.497-6.591c.037.002.073.014.111.014c.4 0 .802-.098 1.166-.304a.5.5 0 0 0-.492-.87a1.426 1.426 0 0 1-1.88-.467a.5.5 0 0 0-.841.539c.237.371.571.65.948.837c-.521 1.058-1.51 3.84.372 6.951c-1.324.13-2.65.317-3.688.986a7.2 7.2 0 0 0-1.878 1.791c-.629-.108-2.932-.675-3.334-3.231c.25-.194.452-.45.577-.766a.5.5 0 1 0-.93-.368a.77.77 0 0 1-.454.461a.78.78 0 0 1-.643-.07a.5.5 0 0 0-.486.874c.284.158.588.238.89.238c.037 0 .072-.017.109-.019c.476 2.413 2.383 3.473 3.732 3.794a3.7 3.7 0 0 0-.331 1.192a.5.5 0 0 0 .454.542l.045.002a.5.5 0 0 0 .498-.456c.108-1.213 1.265-2.48 2.293-3.145c.964-.621 2.375-.752 3.741-.879c1.325-.121 2.577-.237 3.558-.767m12.866-1.504a.5.5 0 0 0 .878.48c.019-.034 1.842-3.449-1.571-5.744a.5.5 0 0 0-.558.83c2.644 1.778 1.309 4.326 1.251 4.434M9.876 9.07a.5.5 0 0 0 .406-.208c1.45-2.017 3.458-1.327 3.543-1.295a.5.5 0 0 0 .345-.938c-.96-.356-3.177-.468-4.7 1.65a.5.5 0 0 0 .406.791m13.072-1.888c2.225-.181 3.237 1.432 3.283 1.508a.5.5 0 0 0 .863-.507c-.054-.091-1.34-2.218-4.224-1.998a.5.5 0 0 0 .078.997m9.15 14.611c-.246-.014-.517.181-.539.457c-.002.018-.161 1.719-1.91 2.294a.499.499 0 0 0 .157.975a.5.5 0 0 0 .156-.025c2.372-.778 2.586-3.064 2.594-3.161a.5.5 0 0 0-.458-.54"></path>
                      <path d="M7.347 16.934a.5.5 0 1 0 .965.26a1.423 1.423 0 0 1 1.652-1.014a.5.5 0 0 0 .205-.979a2.35 2.35 0 0 0-1.248.086c-1.166-1.994-.939-3.96-.936-3.981a.5.5 0 0 0-.429-.562a.503.503 0 0 0-.562.427c-.013.097-.28 2.316 1.063 4.614a2.4 2.4 0 0 0-.71 1.149m11.179-2.47a1.07 1.07 0 0 1 1.455.015a.5.5 0 0 0 .707-.011a.5.5 0 0 0-.01-.707a2 2 0 0 0-.797-.465c.296-1.016.179-1.467-.096-2.312a21 21 0 0 1-.157-.498l-.03-.1c-.364-1.208-.605-2.005.087-3.13a.5.5 0 0 0-.852-.524c-.928 1.508-.587 2.637-.192 3.944l.03.1q.088.29.163.517c.247.761.322 1.016.02 1.936a2 2 0 0 0-1.01.504a.5.5 0 0 0 .682.731m6.365-2.985a2 2 0 0 0 .859-.191a.5.5 0 0 0-.426-.905a1.07 1.07 0 0 1-1.384-.457a.5.5 0 1 0-.881.472c.18.336.448.601.76.785c-.537 1.305-.232 2.691.017 3.426a.5.5 0 1 0 .947-.319c-.168-.498-.494-1.756-.002-2.826c.038.002.073.015.11.015m4.797 9.429a.497.497 0 0 0-.531-.467a1.825 1.825 0 0 1-1.947-1.703a.51.51 0 0 0-.533-.465a.5.5 0 0 0-.465.533c.041.59.266 1.122.608 1.555c-.804.946-1.857 1.215-2.444 1.284c-.519.062-.973.009-1.498-.053c-.481-.055-1.025-.118-1.698-.098l-.005.001c-.02-.286-.088-.703-.305-1.05a.501.501 0 0 0-.847.531c.134.215.159.558.159.725c-.504.181-.94.447-1.334.704c-.704.458-1.259.82-2.094.632c-.756-.173-1.513-.208-2.155-.118c-.1-.251-.258-.551-.502-.782a.5.5 0 0 0-.687.727c.086.081.154.199.209.317c-1.103.454-1.656 1.213-1.682 1.25a.499.499 0 0 0 .407.788a.5.5 0 0 0 .406-.205c.005-.008.554-.743 1.637-1.04c.56-.154 1.363-.141 2.146.037c.219.05.422.067.619.07c.093.218.129.477.134.573a.5.5 0 0 0 .499.472l.027-.001a.5.5 0 0 0 .473-.523a3 3 0 0 0-.13-.686c.461-.167.862-.428 1.239-.673c.572-.373 1.113-.726 1.82-.749c.592-.021 1.08.036 1.551.091c.474.055.94.091 1.454.061c.091.253.084.591.07.704a.503.503 0 0 0 .497.563a.5.5 0 0 0 .495-.435a2.9 2.9 0 0 0-.059-.981a4.67 4.67 0 0 0 2.345-1.471a2.8 2.8 0 0 0 1.656.413a.5.5 0 0 0 .465-.531"></path>
                    </g>
                  </svg>
                ) : index === 1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 128 128">
                    <path fill="#598b15" d="M30.94 78.75c0-.94-.31-14.43-1.57-19.29s-3.61-7.06-4.24-14.12s3.47-12.98 5.34-15.19c3.45-4.07 8.46-5.98 8.46-5.98S37.76 17 43.32 13.66C49.6 9.89 54.31 16 55.25 16.47S75.33 6.44 75.33 6.44s3.45-2.61 10.2-2.51c9.32.13 13.15 5.79 14.9 7.84c2.67 3.14 4.92 10.73 4.77 15.28s-1.23 6.71-.71 7.79s3.37.55 5.93 3.62c2.35 2.82 5.5 7.29 5.66 15.6c.15 8.05-7.72 18.69-9.6 20.41c-1.88 1.73-4.09 3.48-5.66 5.84c-1.57 2.35-3.53 7.09-7.6 10.23c-4.08 3.14-10.34 4.36-14.42 4.83s-8.2-.34-11.04 1.53c-2.94 1.93-6.42 10.17-12.08 14.59c-3.32 2.6-6.13 3.6-9.31 3.77c-4.88.27-7.01-.91-8.98-1.47c-3.31-.94-6.45-35.04-6.45-35.04"></path>
                    <path fill="#85bb41" d="M22.43 102.03s-6.64-4.85-4.8-14.03c1.64-8.2 6.44-11.65 8.62-19.27c2.16-7.56.88-10.87.33-14.45c-.6-3.91-.92-4.21-.47-4.41c.47-.21 4.83 11.78 4.83 12.05c.09 3.47 1.08 9.31.35 12.85s-7.63 8.62-8.08 12.07s-1.82 11.17-1 13.25c.82 2.09 4.81 2.83 4.81 2.83z"></path>
                    <radialGradient id="SVGKJ3eIUOY" cx={102.033} cy={18.288} r={125.793} gradientUnits="userSpaceOnUse"><stop offset={0.554} stopColor="#85bb41"></stop><stop offset={0.614} stopColor="#a2c65f"></stop><stop offset={0.706} stopColor="#c9d487"></stop><stop offset={0.779} stopColor="#e1dda0"></stop><stop offset={0.823} stopColor="#eae0a9"></stop></radialGradient>
                    <path fill="url(#SVGKJ3eIUOY)" d="M22.94 101.02c-.36.48-1.81 2.29-3.38 3.62s-5.07 2.17-4.95 3.02c.12.84 10.13 9.89 10.13 9.89l8.3 5.97s2.44-2.87 3.98-5.66c.84-1.52 1.84-3.57 1.84-3.57s2.66 1.22 6.77.56c6.15-.98 11.71-8.11 14.11-12.38c1.52-2.7 4.33-8.09 8.79-10.62s9.81-2.96 14.88-5.73c3.97-2.18 9.37-6.94 11.54-10.43c2.17-3.5 2.05-4.8 2.05-4.8s11.7-13.54 7.72-28.5s-7.96-13.27-10.74-17.13c-2.77-3.86-3.14-13.63-12.79-17.61s-19.29-.02-24.27 4.04c-4.79 3.9-12.74 10.26-17.13 24.94c-2.27 7.61-.01 20.15-.3 23.44c-.48 5.4-6.9 12.61-6.9 12.61s-7.24 8.2-7.6 9.17s-3.02 12.91-3.02 12.91z"></path>
                    <path fill="#598b15" d="M41.65 101.91c.91.09 8.08-.91 12.98-7.35s4.81-14.07 4.72-13.8s-12.62 1.63-12.8 5.9c-.18 4.26-4.9 15.25-4.9 15.25"></path>
                    <path fill="#e9e7d7" d="M26.28 104.73s-6.9-2.26-6.28-11.74c.6-9.25 8.07-13.44 9.43-23.83c.66-5.03-.74-8.95-1.98-13.16c-1.35-4.59-2.45-9.03-1.7-7.54c1.17 2.33 2.03 3.85 4.75 10.41c1.63 3.93 2.94 8.67 2.33 13.46c-.99 7.79-8.34 14.15-8.97 20.58c-.74 7.54 3.05 10.77 3.05 10.77z"></path>
                    <path fill="#e9e7d7" d="M30.04 111.83c-2.32-2.05-5.57-6.43-3.96-12.12c2.1-7.42 6.68-9.77 11.25-16.7s5.32-13.45 5.41-20.39c.12-9.28.65-16.72 2.26-17.21s.78 9.26 1.15 17.3c.26 5.56.95 14.11.95 14.11s4.91-4.12 6.09-9.69c2.1-9.89-1.86-20.6-1.02-31.74c.63-8.29 4.56-16.34 8.53-20.65c2.84-3.09 5.69-5.44 6.55-4.95s-4.95 6.43-7.54 13.36s-3.2 13.73-2.21 21.15s2.38 14.78 3.25 14.53s6.16-10.77 7.81-18.86c1.61-7.92 2.43-13.23 6.26-18.55s8.29-8.41 9.03-7.67c1.31 1.31-3.56 3.7-6.77 11.61c-1.92 4.72-1.88 7.97-3.54 16.15c-.85 4.21-4.01 13.63-3.89 14.01s4.46-1.82 7.55-4.04s8.51-6.34 13.33-12.65c2.73-3.58 4.57-6.53 5.81-5.67c1.24.87-4.3 11.54-9.42 16.31c-7.3 6.8-16.68 11.89-16.68 12.87s8.94.19 17.85-2.27c7.17-1.98 14.8-7.5 15.67-6.14s-8.04 6.41-13.84 8.66c-9.28 3.59-17.08 3.22-22.4 6.43c-5.32 3.22-8.5 8.54-9.03 9.52c-.19.35 8.9-2.1 17.56-3.34s20.53-5.44 20.9-4.08s-4.33 4.08-14.72 6.55s-18.3 4.82-23.99 8.41S48.97 94.02 46 99.21s-3.02 13.37-7.35 15.23c-2.85 1.22-6.5-.76-8.61-2.61"></path>
                    <path fill="#b5cf17" d="M14.75 107.1c-1.28.64-.77 2.53-.01 3.68c1.15 1.77 3.1 3.78 7.77 7.43c3.63 2.83 5.45 4.12 7.55 5.03c1.64.71 3.29.75 3.56-.35c.07-.28-5.89-4.15-9.64-7.13c-6.46-5.12-8.95-8.8-9.23-8.66"></path>
                  </svg>
                ) : index === 2 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 128 128">
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
                ) : index === 3 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 24 24">
                    <g fill="none">
                      <path fill="#66e1ff" d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"></path>
                      <path fill="#c2f3ff" d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"></path>
                      <path fill="#ffdda1" stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435" strokeWidth={1}></path>
                      <path stroke="#191919" strokeLinecap="round" strokeLinejoin="round" d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434" strokeWidth={1}></path>
                    </g>
                  </svg>
                ) : index === 4 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 32 32">
                    <g fill="none">
                      <path fill="#f8312f" d="M6 6c4.665-2.332 8.5.5 10 2.5c1.5-2 5.335-4.832 10-2.5c6 3 4.5 10.5 0 15c-2.196 2.196-6.063 6.063-8.891 8.214a1.764 1.764 0 0 1-2.186-.041C12.33 27.08 8.165 23.165 6 21C1.5 16.5 0 9 6 6"></path>
                      <path fill="#ca0b4a" d="M16 8.5v3.05c1.27-2.685 4.425-6.27 9.658-5.713c-4.51-2.03-8.195.712-9.658 2.663m-4.054-2.963C10.26 4.95 8.225 4.887 6 6C0 9 1.5 16.5 6 21c2.165 2.165 6.33 6.08 8.923 8.173a1.764 1.764 0 0 0 2.186.04q.381-.29.785-.618c-2.854-2.143-6.86-5.519-9.035-7.462c-4.957-4.431-6.61-11.815 0-14.769a9.7 9.7 0 0 1 3.087-.827"></path>
                      <ellipse cx={23.477} cy={12.594} fill="#f37366" rx={2.836} ry={4.781} transform="rotate(30 23.477 12.594)"></ellipse>
                    </g>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" fill="currentColor" />
                  </svg>
                )}
              </div>
              
              {/* Topic Title */}
              <h3 className={`text-center font-bold text-lg mb-3 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}
                             group-hover:text-green-500 transition-all duration-300`}>
                {topic}
              </h3>
              
              {/* Decorative Line */}
              <div className={`w-12 h-1 ${style.accent} mx-auto rounded-full 
                              opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-300`}></div>
            </div>
          </ScrollAnimation>
          );
        })}
      </div>
    </div>
  </div>
</section>


      {/* Section 5: Meet Our Authors */}
<section className={`py-20 transition-colors duration-500 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>  <div className="mx-auto max-w-6xl px-4">
    {/* Heading */}
   <div className="text-center mb-16">
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
      <h2 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {t('blogPage.authors.title')}
      </h2>
    </ScrollAnimation>
    <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg max-w-2xl mx-auto`}>
        {t('blogPage.authors.subtitle')}
      </p>
    </ScrollAnimation>
  </div>

    {/* Authors Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          name: t('blogPage.authors.sarah.name'),
          role: t('blogPage.authors.sarah.role'),
          bio: t('blogPage.authors.sarah.bio'),
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          expertise: t('blogPage.authors.sarah.expertise', { returnObjects: true }),
          icon: "🥗"
        },
        {
          name: t('blogPage.authors.mike.name'),
          role: t('blogPage.authors.mike.role'),
          bio: t('blogPage.authors.mike.bio'),
          image: "https://randomuser.me/api/portraits/men/46.jpg",
          expertise: t('blogPage.authors.mike.expertise', { returnObjects: true }),
          icon: "🏋️‍♂️"
        },
        {
          name: t('blogPage.authors.emma.name'),
          role: t('blogPage.authors.emma.role'),
          bio: t('blogPage.authors.emma.bio'),
          image: "https://randomuser.me/api/portraits/women/65.jpg",
          expertise: t('blogPage.authors.emma.expertise', { returnObjects: true }),
          icon: "🧠"
        }
      ].map((author, index) => {
        // Assign different animations based on card position
        const getAnimationType = (index) => {
          switch(index) {
            case 0: return 'slide-in-left';
            case 1: return 'fade-in';
            case 2: return 'slide-in-right';
            default: return 'fade-in';
          }
        };
        
        // Create staggered delays for each author card
        const staggerClasses = ['scroll-stagger-3', 'scroll-stagger-4', 'scroll-stagger-5'];
        const staggerClass = staggerClasses[index] || 'scroll-stagger-3';

        return (
        <ScrollAnimation key={index} animation={getAnimationType(index)} stagger={staggerClass}>
          <div className="relative group cursor-pointer">
            {/* Author Card with Background Image */}
            <div className="relative h-80 rounded-xl overflow-hidden">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${author.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 transition-all duration-500 group-hover:from-black/40 group-hover:via-black/20 group-hover:to-black/40" />
              
              {/* Main Content - Always Centered */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                {/* Author Profile Image */}
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-white/30 shadow-lg group-hover:border-white/50 transition-all duration-300">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Name */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                  {author.name}
                </h3>
                
                {/* Role */}
                <p className="text-green-300 font-medium group-hover:text-green-200 transition-colors duration-300">
                  {author.role}
                </p>
              </div>
              
              {/* Hover Details Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-sm">
                <p className="text-white/90 text-sm leading-relaxed mb-4 max-h-20 overflow-hidden">
                  {author.bio}
                </p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {author.expertise.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-green-600/80 text-white text-xs rounded-full backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
        </ScrollAnimation>
        );
      })}
    </div>
  </div>
</section>

      {/* Section 6: Call to Action */}
<section className={`relative py-20 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
  {/* Background Image */}
  <div className="absolute inset-0">
    <img 
      src="/images/healthcare.jpg" 
      alt="Health and Wellness Background"
      className="w-full h-full object-cover opacity-20"
    />
    <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-white/80'}`}></div>
  </div>

  <div className="relative mx-auto max-w-7xl px-4">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Side - Content */}
      <div className="space-y-8">
        <ScrollAnimation animation="slide-up" stagger="scroll-stagger-1">
          <h2 className={`text-4xl font-extrabold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('blogPage.cta.title')}
          </h2>
        </ScrollAnimation>
        
        <ScrollAnimation animation="slide-up" stagger="scroll-stagger-2">
          <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('blogPage.cta.description')}
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="slide-up" stagger="scroll-stagger-3">
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="btn-animate-strong inline-flex items-center rounded-lg px-8 py-4 font-bold text-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#4CAF50' }}
            >
              {t('blogPage.cta.startFreelancingButton')}
            </a>
            <a
              href="/about"
              className={`inline-flex items-center rounded-lg px-8 py-4 font-semibold text-lg border-2 transition-all duration-300
                         hover:scale-105 hover:shadow-xl shadow-lg
                         ${isDark 
                           ? "bg-transparent border-white text-white hover:bg-white hover:text-gray-900" 
                           : "bg-transparent border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                         }`}
            >
              {t('blogPage.cta.learnMoreButton')}
            </a>
          </div>
        </ScrollAnimation>

        {/* Trust Indicators */}
        <ScrollAnimation animation="slide-up" stagger="scroll-stagger-4">
          <div className="flex items-center space-x-6 pt-8">
            <div className="flex items-center space-x-2">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-green-500"
              />
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-green-500 -ml-2"
              />
              <img 
                src="https://randomuser.me/api/portraits/women/68.jpg" 
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-green-500 -ml-2"
              />
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className="font-semibold text-green-500">50K+</span> {t('blogPage.cta.trustIndicator')}
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* Right Side - Image Gallery */}
      <div className="relative">
        <ScrollAnimation animation="slide-up" stagger="scroll-stagger-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Main Image */}
            <div className="col-span-2 relative group">
              <img 
                src="/images/63B10.jpg" 
                alt="Health and Wellness"
                className="w-full h-64 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-green-500/20 rounded-2xl group-hover:bg-green-500/10 transition-colors duration-500"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-medium">{t('blogPage.cta.imageLabels.mainImage.title')}</div>
                <div className="text-xs opacity-80">{t('blogPage.cta.imageLabels.mainImage.subtitle')}</div>
              </div>
            </div>

            {/* Secondary Images */}
            <div className="relative group">
              <img 
                src="/images/63B8.jpg" 
                alt="Nutrition"
                className="w-full h-32 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 rounded-xl group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-2 left-2 text-white text-xs font-medium">{t('blogPage.cta.imageLabels.nutrition')}</div>
            </div>

            <div className="relative group">
              <img 
                src="/images/63B9.jpg" 
                alt="Fitness"
                className="w-full h-32 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 rounded-xl group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-2 left-2 text-white text-xs font-medium">{t('blogPage.cta.imageLabels.fitness')}</div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  </div>
</section>





      <Footer />
    </div>
  )
}
