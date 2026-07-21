import { formatAirDate, formatEpisodeCode } from '@/lib/formatters'
import type { EpisodeListItem } from '@/types/api'

import styles from './EpisodeCard.module.css'

interface EpisodeCardProps {
  episode: EpisodeListItem
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const characterCount = episode.characters.length

  return (
    <article className={styles.card}>
      <span className={styles.code}>{formatEpisodeCode(episode.episode)}</span>

      <h2 className={styles.title}>{episode.name}</h2>

      <div className={styles.meta}>
        <span className={`${styles.chip} ${styles.chipDate}`}>
          {formatAirDate(episode.air_date)}
        </span>
        <span className={`${styles.chip} ${styles.chipCharacters}`}>
          {characterCount} {characterCount === 1 ? 'personagem' : 'personagens'}
        </span>
      </div>
    </article>
  )
}
