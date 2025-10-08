import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - How much of the element should be visible (0-1)
 * @param {string} options.rootMargin - Margin around the root element
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once
 * @returns {Object} - { ref, isVisible, hasTriggered }
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options

  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              setHasTriggered(true)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible, hasTriggered }
}

/**
 * Hook for multiple elements with scroll animations
 * @param {Array} elements - Array of element configurations
 * @returns {Array} - Array of animation states for each element
 */
export const useMultipleScrollAnimations = (elements = []) => {
  const [animationStates, setAnimationStates] = useState(
    elements.map(() => ({ isVisible: false, hasTriggered: false }))
  )

  const refs = useRef(elements.map(() => null))

  useEffect(() => {
    const observers = elements.map((element, index) => {
      const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = element

      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAnimationStates(prev => {
                const newStates = [...prev]
                newStates[index] = { isVisible: true, hasTriggered: true }
                return newStates
              })
            } else if (!triggerOnce) {
              setAnimationStates(prev => {
                const newStates = [...prev]
                newStates[index] = { isVisible: false, hasTriggered: prev[index].hasTriggered }
                return newStates
              })
            }
          })
        },
        { threshold, rootMargin }
      )
    })

    // Observe all elements
    refs.current.forEach((ref, index) => {
      if (ref && observers[index]) {
        observers[index].observe(ref)
      }
    })

    return () => {
      observers.forEach((observer, index) => {
        if (refs.current[index] && observer) {
          observer.unobserve(refs.current[index])
        }
      })
    }
  }, [elements])

  return { refs, animationStates }
}
