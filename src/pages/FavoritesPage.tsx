import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { favoriteEpisodesQuery } from '@/api/episodes'
import { EpisodeCard } from '@/components/EpisodeCard'
import { EpisodeCardSkeleton } from '@/components/EpisodeCardSkeleton'
import { useEpisodeStore } from '@/store/episodeStore'

import styles from './FavoritesPage.module.css'

export function FavoritesPage() {
  const favoriteIds = useEpisodeStore((state) => state.favoriteIds)
  const { data: episodes, isPending, isError, error } = useQuery(
    favoriteEpisodesQuery(favoriteIds),
  )

  // Nenhum favorito: a query nem dispara (enabled: false na favoriteEpisodesQuery),
  // então isPending ficaria travado em true para sempre. Por isso este caso vem
  // ANTES de checar o "carregando".
  if (favoriteIds.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Favoritos</h1>
        </header>
        <p className={styles.emptyState}>
          Você ainda não favoritou nenhum episódio.{' '}
          <Link to="/" className={styles.emptyLink}>
            Ver episódios
          </Link>
        </p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Favoritos</h1>
        </header>
        <div className={styles.grid} aria-hidden>
          {Array.from({ length: favoriteIds.length }, (_, index) => (
            <EpisodeCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <div className={styles.errorBox}>
          <span className={styles.errorBadge}>Erro</span>
          <p className={styles.errorTitle}>Não deu para carregar os favoritos</p>
          <p className={styles.errorMessage}>{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Favoritos</h1>
        <span className={styles.count}>
          {episodes.length} {episodes.length === 1 ? 'episódio' : 'episódios'}
        </span>
      </header>

      <div className={styles.grid}>
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  )
}
