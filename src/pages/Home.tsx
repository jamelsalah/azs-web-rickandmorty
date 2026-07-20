import { useQuery } from '@tanstack/react-query'

import { episodesQuery } from '@/api/episodes'

/**
 * Listagem de episódios. Por enquanto só a primeira página e sem estilo —
 * a lógica vem primeiro, a estilização numa etapa própria.
 */
export function Home() {
  const { data, isPending, isError, error } = useQuery(episodesQuery(1, ''))

  if (isPending) {
    return <p>Carregando episódios…</p>
  }

  if (isError) {
    return <p>Erro ao carregar os episódios: {error.message}</p>
  }

  return (
    <section>
      <h1>Episódios</h1>
      <p>{data.totalCount} episódios no total</p>

      <ul>
        {data.episodes.map((episode) => (
          <li key={episode.id}>
            <strong>{episode.episode}</strong> — {episode.name}
            <br />
            {episode.air_date} · {episode.characters.length} personagens
          </li>
        ))}
      </ul>
    </section>
  )
}
