import styles from './EpisodeCardSkeleton.module.css'

export function EpisodeCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden>
      <span className={styles.code} />
      <span className={styles.title} />
      <span className={`${styles.title} ${styles.titleShort}`} />
      <div className={styles.meta}>
        <span className={styles.chip} />
        <span className={styles.chip} />
      </div>
    </div>
  )
}
