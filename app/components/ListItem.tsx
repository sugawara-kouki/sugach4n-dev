interface ListItemProps {
  title: string
  meta: string
  description?: string
  href?: string
  target?: string
}

export const ListItem = ({ title, meta, description, href, target }: ListItemProps) => {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      class="block py-7 px-6 -mx-6 border-b border-black/10 no-underline text-inherit transition-all duration-300 hover:bg-black/2 group rounded-sm"
    >
      <div class="flex justify-between items-baseline gap-6 mb-2">
        <span class="text-[0.95rem] font-medium flex-1 group-hover:text-accent transition-colors leading-relaxed">
          {title}
        </span>
        <span class="text-[0.75rem] text-ink-sub font-mono shrink-0">
          {meta}
        </span>
      </div>
      {description && (
        <p class="text-[0.85rem] text-ink-sub leading-relaxed group-hover:text-ink transition-colors">
          {description}
        </p>
      )}
    </Tag>
  )
}
