import type { Child } from 'hono/jsx'

interface SectionProps {
  id: string
  title: string
  children: Child
}

export const Section = ({ id, title, children }: SectionProps) => {
  const firstChar = title.charAt(0)
  const restOfTitle = title.slice(1)

  return (
    <section id={id} class="mb-[140px]">
      <span class="relative inline-block mb-12 text-[1.25rem] font-bold font-mono uppercase tracking-wider pb-2">
        <span class="text-accent">{firstChar}</span>
        {restOfTitle}
        <span class="absolute bottom-0 left-0 w-full h-[3px] bg-accent line-animation" />
      </span>
      <div class="max-w-[620px] text-[0.95rem]">
        {children}
      </div>
    </section>
  )
}
