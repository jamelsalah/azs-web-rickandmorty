import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { favoriteEpisodesQuery } from '@/api/episodes'
import { EpisodeCard } from '@/components/EpisodeCard'
import { useEpisodeStore } from '@/store/episodeStore'

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
      <div>
        <h1>Favoritos</h1>
        <p>Você ainda não favoritou nenhum episódio.</p>
        <Link to="/">Ver episódios</Link>
      </div>
    )
  }

  if (isPending) {
    return <p>Carregando favoritos…</p>
  }

  if (isError) {
    return (
      <div>
        <p>Não deu para carregar os favoritos.</p>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Favoritos</h1>
      <span>
        {episodes.length} {episodes.length === 1 ? 'episódio' : 'episódios'}
      </span>

      <div>
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  )
}
