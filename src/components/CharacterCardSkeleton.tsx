import styles from './CharacterCardSkeleton.module.css'

export function CharacterCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden>
      <div className={styles.photo} />
      <div className={styles.info}>
        <span className={styles.line} />
        <span className={`${styles.line} ${styles.lineShort}`} />
        <span className={`${styles.line} ${styles.lineStatus}`} />
      </div>
    </div>
  )
}
