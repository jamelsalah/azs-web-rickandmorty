import { useQuery } from '@tanstack/react-query'

import { episodesQuery } from '@/api/episodes'
import { EpisodeCard } from '@/components/EpisodeCard'

const GRID_CLASS =
  'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[22px]'

export function Home() {
  const { data, isPending, isError, error } = useQuery(episodesQuery(1, ''))

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <header className="mb-10">
        <span className="border-ink bg-blip inline-block rounded-full border-[2.5px] px-3.5 py-1 text-sm font-bold shadow-[3px_3px_0_var(--color-ink)]">
          {data ? `${data.totalCount} episódios` : 'Carregando…'}
        </span>

        <h1 className="font-display text-ink mt-[18px] text-4xl leading-none font-bold sm:text-5xl">
          Rick and Morty
        </h1>

        <p className="text-ink-soft mt-1.5 font-semibold">
          Todos os episódios, de C-137 até onde der.
        </p>
      </header>

      {isPending && <EpisodeGridSkeleton />}

      {isError && (
        <div className="border-ink bg-card rounded-[18px] border-[3px] p-10 text-center shadow-[6px_6px_0_var(--color-ink)]">
          <span className="border-ink bg-alert inline-block rounded-full border-[2.5px] px-3 py-0.5 text-xs font-extrabold">
            Erro
          </span>
          <p className="font-display text-ink mt-4 text-xl font-semibold">
            Não deu para carregar os episódios
          </p>
          <p className="text-ink-soft mt-2 text-sm font-semibold">
            {error.message}
          </p>
        </div>
      )}

      {data && (
        <div className={GRID_CLASS}>
          {data.episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}
    </div>
  )
}

function EpisodeGridSkeleton() {
  return (
    <div className={GRID_CLASS} aria-hidden>
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="border-ink h-[150px] animate-pulse rounded-[18px] border-[3px] bg-white/50 shadow-[6px_6px_0_var(--color-ink)]"
          style={{ animationDelay: `${index * 90}ms` }}
        />
      ))}
    </div>
  )
}
