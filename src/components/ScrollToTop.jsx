import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  // Show button when page is scrolled down 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
    setIsVisible(false) // Hide button when on new page
  }, [location.pathname])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          style={{ backgroundColor: '#4CAF50' }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  )
}

export default ScrollToTop
