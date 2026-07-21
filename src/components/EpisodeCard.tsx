import { EyeIcon, HeartIcon } from '@/components/icons'
import { formatAirDate, formatEpisodeCode } from '@/lib/formatters'
import { useEpisodeStore } from '@/store/episodeStore'
import type { EpisodeListItem } from '@/types/api'

import styles from './EpisodeCard.module.css'

interface EpisodeCardProps {
  episode: EpisodeListItem
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const characterCount = episode.characters.length
  // Pergunta por id: só o card clicado re-renderiza, não a lista inteira.
  const isFavorite = useEpisodeStore((state) => state.favoriteIds.includes(episode.id))
  const isWatched = useEpisodeStore((state) => state.watchedIds.includes(episode.id))
  const toggleFavorite = useEpisodeStore((state) => state.toggleFavorite)
  const toggleWatched = useEpisodeStore((state) => state.toggleWatched)

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.code}>{formatEpisodeCode(episode.episode)}</span>

        <div className={styles.actions}>
          <button
            className={styles.favoriteButton}
            type="button"
            onClick={() => toggleFavorite(episode.id)}
            aria-pressed={isFavorite}
            aria-label="Favoritar episódio"
          >
            <HeartIcon />
          </button>

          <button
            className={styles.watchedButton}
            type="button"
            onClick={() => toggleWatched(episode.id)}
            aria-pressed={isWatched}
            aria-label="Marcar como visto"
          >
            <EyeIcon />
          </button>
        </div>
      </div>

      <h2 className={styles.title}>{episode.name}</h2>

      <div className={styles.meta}>
        <span className={`${styles.chip} ${styles.chipDate}`}>
          {formatAirDate(episode.air_date)}
        </span>
        <span className={`${styles.chip} ${styles.chipCharacters}`}>
          {characterCount} {characterCount === 1 ? 'personagem' : 'personagens'}
        </span>
        {isWatched && <span className={`${styles.chip} ${styles.chipWatched}`}>Visto</span>}
      </div>
    </article>
  )
}
