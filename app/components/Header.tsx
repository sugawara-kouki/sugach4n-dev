export const Header = () => {
  const navItems = [
    { name: 'About', href: '#about-me' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Works', href: '#works' },
    { name: 'Blog', href: '#blog' },
  ]

  return (
    <header class="fixed top-0 left-0 w-full z-50 bg-bg/40 backdrop-blur-xl border-b border-black/5 shadow-sm shadow-black/2">
      <div class="max-w-[800px] mx-auto px-10 h-20 flex justify-between items-center">
        <a href="/" class="text-[1.1rem] font-bold font-mono no-underline text-ink">
          sugach<span class="text-accent">4</span>n
        </a>
        <nav class="flex gap-8">
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
      </div>
    </header>
  )
}
