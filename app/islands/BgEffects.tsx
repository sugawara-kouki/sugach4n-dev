import { useEffect, useRef } from 'hono/jsx'
import { animate } from 'motion'

export default function BgEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })
  const isVisible = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const glow = glowRef.current
    if (!canvas || !glow) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouse.current) return
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      animate(glow as any, {
        transform: `translate(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%))`
      }, {
        duration: 0.2
      })
    }

    const handleVisibilityChange = () => {
      isVisible.current = document.visibilityState === 'visible'
    }

    const drawStaticNoise = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < 800; i++) {
        ctx.fillStyle = `rgba(0,0,0,0.012)`
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1)
      }
    }

    const animateBg = () => {
      if (!isVisible.current) {
        requestAnimationFrame(animateBg)
        return
      }

      if (mouse.current) {
        drawStaticNoise()
        for (let i = 0; i < 15; i++) {
          const rx = mouse.current.x + (Math.random() - 0.5) * 120
          const ry = mouse.current.y + (Math.random() - 0.5) * 120
          ctx.fillStyle = i % 10 === 0 ? `rgba(255, 69, 0, 0.12)` : `rgba(0,0,0,0.025)`
          ctx.fillRect(rx, ry, 1, 1)
        }
      }
      requestAnimationFrame(animateBg)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    resize()
    const animationId = requestAnimationFrame(animateBg)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <div
        ref={glowRef}
        class="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none -z-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 69, 0, 0.03) 0%, rgba(255, 255, 255, 0) 70%)',
        }}
      ></div>
      <canvas ref={canvasRef} class="fixed top-0 left-0 -z-10 pointer-events-none"></canvas>
    </>
  )
}
