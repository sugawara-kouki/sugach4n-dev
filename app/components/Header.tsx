import Navigation from '../islands/Navigation'

export const Header = () => {
  const navItems = [
    { name: 'About', href: '#about-me' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Works', href: '#works' },
    { name: 'Blog', href: '#blog' },
  ]

  return (
    <header class="fixed top-0 left-0 w-full z-50">
      {/* 背景とぼかしを分離 (これで Navigation の fixed がヘッダーに縛られなくなる) */}
      <div class="absolute inset-0 bg-bg/40 backdrop-blur-xl border-b border-black/5 shadow-sm shadow-black/2 -z-10" />
      
      <div class="max-w-[800px] mx-auto px-10 h-20 flex justify-between items-center">
        <a href="/" class="text-[1.1rem] font-bold font-mono no-underline text-ink">
          sugach<span class="text-accent">4</span>n
        </a>
        <Navigation navItems={navItems} />
      </div>
    </header>
  )
}
