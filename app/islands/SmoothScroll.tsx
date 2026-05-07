import { useEffect } from 'hono/jsx'

export default function SmoothScroll() {
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (!link) return

      const href = link.getAttribute('href')
      if (href?.startsWith('#')) {
        e.preventDefault()
        const id = href.slice(1)
        const element = document.getElementById(id)
        if (element) {
          // Subtract header height (80px) from the scroll target
          const headerHeight = 80
          const targetY = element.getBoundingClientRect().top + window.scrollY - headerHeight
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          })
        }
      }
    }

    window.addEventListener('click', handleLinkClick)
    return () => window.removeEventListener('click', handleLinkClick)
  }, [])

  return null
}
