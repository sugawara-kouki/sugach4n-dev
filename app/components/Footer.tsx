import { GitHubIcon, XIcon } from './Icons'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer class="mt-[160px] py-[100px] border-t border-black/10 flex justify-between items-center text-[0.75rem] text-ink-sub font-mono">
      <div>&copy; {currentYear} sugach4n</div>
      <div class="flex gap-6">
        <a
          href="https://github.com/sugawara-kouki"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          class="hover:text-accent transition-colors"
        >
          <GitHubIcon size={18} />
        </a>
        <a
          href="https://x.com/sugas4n"
          target="_blank"
          rel="noopener"
          aria-label="X (Twitter)"
          class="hover:text-accent transition-colors"
        >
          <XIcon size={16} />
        </a>
      </div>
    </footer>
  )
}
