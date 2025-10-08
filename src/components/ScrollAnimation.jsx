import { useScrollAnimation } from '../hooks/useScrollAnimation'

/**
 * ScrollAnimation component that applies scroll-triggered animations to its children
 * @param {Object} props
 * @param {string} props.animation - Animation type: 'fade-in', 'slide-in-left', 'slide-in-right', 'scale-in', 'slide-up', 'zoom-in', 'rotate-in'
 * @param {number} props.threshold - Intersection Observer threshold (0-1)
 * @param {string} props.rootMargin - Intersection Observer root margin
 * @param {boolean} props.triggerOnce - Whether to trigger animation only once
 * @param {string} props.stagger - Stagger delay class: 'scroll-stagger-1' to 'scroll-stagger-6'
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Child elements to animate
 */
const ScrollAnimation = ({
  animation = 'fade-in',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  stagger = '',
  className = '',
  children,
  ...props
}) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce
  })

  const animationClass = `scroll-${animation}`
  const visibleClass = isVisible ? 'visible' : ''
  const staggerClass = stagger || ''
  
  const combinedClassName = [
    animationClass,
    visibleClass,
    staggerClass,
    className
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={combinedClassName} {...props}>
      {children}
    </div>
  )
}

export default ScrollAnimation
