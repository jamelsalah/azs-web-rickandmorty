import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { episodeQuery } from '@/api/episodes'
import { CharacterCard } from '@/components/CharacterCard'
import { EyeIcon, HeartIcon } from '@/components/icons'
import { formatAirDate, formatEpisodeCode } from '@/lib/formatters'
import { useEpisodeStore } from '@/store/episodeStore'

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
    return <p>Carregando episódio…</p>
  }

  if (isError) {
    return (
      <div>
        <p>Não deu para carregar o episódio.</p>
        <p>{error.message}</p>
        <Link to="/">Voltar para a lista</Link>
      </div>
    )
  }

  const characterCount = episode.characters.length

  return (
    <div>
      <Link to="/">← Voltar</Link>

      <header>
        <span>{formatEpisodeCode(episode.episode)}</span>
        <h1>{episode.name}</h1>
        <span>{formatAirDate(episode.air_date)}</span>
        <span>
          {characterCount} {characterCount === 1 ? 'personagem' : 'personagens'}
        </span>

        <button
          type="button"
          onClick={() => toggleFavorite(episodeId)}
          aria-pressed={isFavorite}
          aria-label="Favoritar episódio"
        >
          <HeartIcon />
          {isFavorite ? 'Favoritado' : 'Favoritar'}
        </button>

        <button
          type="button"
          onClick={() => toggleWatched(episodeId)}
          aria-pressed={isWatched}
          aria-label="Marcar como visto"
        >
          <EyeIcon />
          {isWatched ? 'Visto' : 'Marcar como visto'}
        </button>
      </header>

      <section>
        <h2>Personagens</h2>
        <div>
          {episode.characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>
    </div>
  )
}
