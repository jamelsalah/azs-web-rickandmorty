import { useQuery } from '@tanstack/react-query'

import { episodesQuery } from '@/api/episodes'
import { EpisodeCard } from '@/components/EpisodeCard'

import styles from './Home.module.css'

export function Home() {
  const { data, isPending, isError, error } = useQuery(episodesQuery(1, ''))

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.count}>
          {data ? `${data.totalCount} episódios` : 'Carregando…'}
        </span>

        <h1 className={styles.title}>Rick and Morty</h1>

        <p className={styles.subtitle}>
          Todos os episódios, de C-137 até onde der.
        </p>
      </header>

      {isPending && <EpisodeGridSkeleton />}

      {isError && (
        <div className={styles.error}>
          <span className={styles.errorBadge}>Erro</span>
          <p className={styles.errorTitle}>Não deu para carregar os episódios</p>
          <p className={styles.errorMessage}>{error.message}</p>
        </div>
      )}

      {data && (
        <div className={styles.grid}>
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
    <div className={styles.grid} aria-hidden>
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className={styles.skeletonCard}
          style={{ animationDelay: `${index * 90}ms` }}
        />
      ))}
    </div>
  )
}
