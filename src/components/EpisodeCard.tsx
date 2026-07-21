import { formatAirDate, formatEpisodeCode } from '@/lib/formatters'
import type { EpisodeListItem } from '@/types/api'

interface EpisodeCardProps {
  episode: EpisodeListItem
}

/** Chips compartilham borda e arredondamento; só a cor de fundo muda. */
const CHIP_CLASS =
  'rounded-[9px] border-[2.5px] border-ink px-2 py-0.5 text-xs font-bold'

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const characterCount = episode.characters.length

  // Atenção: o Tailwind 4 aplica -translate-* na propriedade CSS `translate`,
  // que é independente de `transform`. Por isso a transição nomeia `translate`
  // — com `transform` o hover pula direto, sem animar.
  return (
    <article className="border-ink bg-card flex flex-col rounded-[18px] border-[3px] p-[18px] shadow-[6px_6px_0_var(--color-ink)] transition-[translate,box-shadow] duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_var(--color-ink)]">
      <span className="border-ink bg-portal w-fit rounded-full border-[2.5px] px-[11px] py-0.5 text-xs font-extrabold">
        {formatEpisodeCode(episode.episode)}
      </span>

      <h2 className="font-display text-ink mt-3.5 mb-2.5 text-xl leading-[1.15] font-semibold text-balance">
        {episode.name}
      </h2>

      {/* mt-auto alinha os rodapés mesmo com títulos de alturas diferentes. */}
      <div className="mt-auto flex flex-wrap gap-2">
        <span className={`${CHIP_CLASS} bg-plasma`}>
          {formatAirDate(episode.air_date)}
        </span>
        <span className={`${CHIP_CLASS} bg-blip tabular-nums`}>
          {characterCount} {characterCount === 1 ? 'personagem' : 'personagens'}
        </span>
      </div>
    </article>
  )
}
