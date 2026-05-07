import { useEffect, useRef } from 'hono/jsx'
import { animate, inView } from 'motion'
import type { Child } from 'hono/jsx'

interface RevealProps {
  children: Child
  delay?: number
}

export default function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      element.style.opacity = '1'
      element.style.transform = 'none'
      element.classList.add('revealed')
      return
    }

    inView(element, () => {
      // Start the reveal animation
      animate(
        element as any,
        { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
        { delay, duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }
      )
      
      // Add 'revealed' class with a slight additional delay to ensure 
      // the line starts drawing after the fade-in has started.
      // We use (delay + 0.4) to stagger it.
      setTimeout(() => {
        element.classList.add('revealed')
      }, (delay + 0.4) * 1000)
    })
  }, [delay])

  return (
    <div ref={ref} style={{ opacity: 0 }} class="reveal-container">
      {children}
    </div>
  )
}
