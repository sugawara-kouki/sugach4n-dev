import { useState, useEffect } from 'hono/jsx'

export default function Navigation({ navItems }: { navItems: { name: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const toggleMenu = (e: MouseEvent) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* PC用ナビゲーション */}
      <nav class="hidden md:flex gap-8">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            class="text-ink-sub text-[0.8rem] font-mono no-underline transition-colors duration-300 hover:text-accent"
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* スマホ用メニューボタン */}
      <button
        type="button"
        onClick={toggleMenu}
        class="md:hidden flex items-center gap-3 text-ink-sub text-[0.75rem] font-mono tracking-[0.2em] hover:text-accent transition-colors z-120 relative bg-transparent border-none cursor-pointer p-2 -mr-2"
        aria-label="Toggle menu"
      >
        <div class="flex flex-col gap-1.5 w-5">
          <span class={`h-px bg-current transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span class={`h-px bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span class={`h-px bg-current transition-all duration-300 origin-center ${isOpen ? '-rotate-45 translate-y-[-7px]' : ''}`} />
        </div>
        <span class="min-w-[3.5em] text-left font-bold">{isOpen ? 'CLOSE' : 'MENU'}</span>
      </button>

      {/* フルスクリーンオーバーレイメニュー */}
      <div
        class={`fixed inset-0 z-110 bg-bg/98 backdrop-blur-3xl transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <nav class="h-full w-full flex flex-col items-center justify-center gap-10 p-10 overflow-y-auto">
          {navItems.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              class={`text-4xl font-mono text-ink hover:text-accent transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
