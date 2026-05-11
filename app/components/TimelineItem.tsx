interface TimelineItemProps {
  title: string
  meta: string
  description?: string
  isLatest?: boolean
}

export const TimelineItem = ({ title, meta, description, isLatest }: TimelineItemProps) => {
  return (
    <div class="relative pl-12 pb-14 last:pb-0 group">
      {/* 垂直ライン */}
      <div class="absolute left-[7px] top-3 bottom-0 w-px bg-linear-to-b from-accent/50 via-black/5 to-transparent group-last:hidden" />

      {/* 丸ぽち */}
      <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-bg z-10 flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:shadow-[0_0_12px_rgba(255,69,0,0.4)]">
        <div class="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-bg transition-colors duration-500" />

        {/* 最新のアイテムへのアニメーション効果 */}
        {isLatest && (
          <span class="absolute inset-0 rounded-full bg-accent/30 animate-ping -z-10" />
        )}
      </div>

      {/* コンテンツエリア */}
      <div class="transition-all duration-500 group-hover:translate-x-2">
        <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
          <h3 class="text-[1rem] font-bold text-ink leading-relaxed">
            {title}
          </h3>
          <span class="text-ink-sub text-[0.75rem] font-mono font-medium">
            {meta}
          </span>
        </div>

        {description && (
          <p class="text-[0.9rem] text-ink-sub leading-relaxed max-w-[580px] group-hover:text-ink/80 transition-colors duration-500">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
