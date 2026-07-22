import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { episodeQuery } from '@/api/episodes'
import { CharacterCard } from '@/components/CharacterCard'
import { EyeIcon, HeartIcon } from '@/components/icons'
import { formatAirDate, formatEpisodeCode } from '@/lib/formatters'
import { useEpisodeStore } from '@/store/episodeStore'

import styles from './EpisodeDetailPage.module.css'

export function EpisodeDetailPage() {
  const { id } = useParams()
  const episodeId = id ?? ''

  const { data: episode, isPending, isError, error } = useQuery(episodeQuery(episodeId))

  // Mesma leitura por seletor do card: favoritar aqui reflete na Home.
  const isFavorite = useEpisodeStore((state) => state.favoriteIds.includes(episodeId))
  const isWatched = useEpisodeStore((state) => state.watchedIds.includes(episodeId))
  const toggleFavorite = useEpisodeStore((state) => state.toggleFavorite)
  const toggleWatched = useEpisodeStore((state) => state.toggleWatched)

  if (isPending) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>Carregando episódio…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <div className={styles.errorBox}>
          <span className={styles.errorBadge}>Erro</span>
          <p className={styles.errorTitle}>Não deu para carregar o episódio</p>
          <p className={styles.errorMessage}>{error.message}</p>
          <Link to="/" className={styles.backLink}>
            ← Voltar para a lista
          </Link>
        </div>
      </div>
    )
  }

  const characterCount = episode.characters.length

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← Voltar
      </Link>

      <header className={styles.header}>
        <span className={styles.code}>{formatEpisodeCode(episode.episode)}</span>
        <h1 className={styles.title}>{episode.name}</h1>

        <div className={styles.chips}>
          <span className={`${styles.chip} ${styles.chipDate}`}>
            {formatAirDate(episode.air_date)}
          </span>
          <span className={`${styles.chip} ${styles.chipCharacters}`}>
            {characterCount} {characterCount === 1 ? 'personagem' : 'personagens'}
          </span>
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.actionButton} ${styles.favoriteButton}`}
            type="button"
            onClick={() => toggleFavorite(episodeId)}
            aria-pressed={isFavorite}
            aria-label="Favoritar episódio"
          >
            <HeartIcon />
            {isFavorite ? 'Favoritado' : 'Favoritar'}
          </button>

          <button
            className={`${styles.actionButton} ${styles.watchedButton}`}
            type="button"
            onClick={() => toggleWatched(episodeId)}
            aria-pressed={isWatched}
            aria-label="Marcar como visto"
          >
            <EyeIcon />
            {isWatched ? 'Visto' : 'Marcar como visto'}
          </button>
        </div>
      </header>

      <section>
        <h2 className={styles.sectionTitle}>Personagens</h2>
        <div className={styles.charactersGrid}>
          {episode.characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>
    </div>
  )
}
