import styles from './EpisodeCardSkeleton.module.css'

interface EpisodeCardSkeletonProps {
  /** Escalona o início da animação para as cascas pulsarem em cascata. */
  index?: number
}

export function EpisodeCardSkeleton({ index = 0 }: EpisodeCardSkeletonProps) {
  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${index * 90}ms` }}
      aria-hidden
    />
  )
}
