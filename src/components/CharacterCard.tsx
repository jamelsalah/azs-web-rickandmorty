import { formatCharacterStatus } from '@/lib/formatters'
import type { Character } from '@/types/api'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article>
      <img src={character.image} alt={character.name} loading="lazy" />
      <h3>{character.name}</h3>
      <p>{character.species}</p>
      <span data-status={character.status}>
        {formatCharacterStatus(character.status)}
      </span>
    </article>
  )
}
