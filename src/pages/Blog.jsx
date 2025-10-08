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
                <span className="text-2xl">{style.icon}</span>
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
                
                {/* Read More Button */}
                <button className="mt-4 px-4 py-2 bg-white/20 text-white text-sm rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
                  Read More
                </button>
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
