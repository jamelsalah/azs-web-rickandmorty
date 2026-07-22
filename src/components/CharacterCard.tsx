import { formatCharacterStatus } from '@/lib/formatters'
import type { Character } from '@/types/api'

import styles from './CharacterCard.module.css'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className={styles.card}>
      <img
        className={styles.photo}
        src={character.image}
        alt={character.name}
        loading="lazy"
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{character.name}</h3>
        <p className={styles.species}>{character.species}</p>
        <span className={styles.status} data-status={character.status}>
          {formatCharacterStatus(character.status)}
        </span>
      </div>
    </article>
  )
}
