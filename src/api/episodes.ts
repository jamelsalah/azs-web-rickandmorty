import { QueryClient, keepPreviousData, queryOptions } from '@tanstack/react-query'

import {
  GET_EPISODE,
  GET_EPISODES,
  GET_EPISODES_BY_IDS,
} from '@/graphql/queries'
import { sendGraphQLRequest } from '@/lib/graphqlClient'
import type { EpisodeDetail, EpisodeListItem } from '@/types/api'

/**
 * Os episódios não mudam: a API é somente leitura e não tem mutations.
 * `staleTime: Infinity` já impede o refetch ao focar a janela, então não
 * precisa de mais nenhuma opção aqui.
 */
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
})

/** Formato cru da resposta: no schema, todo campo abaixo é anulável. */
interface EpisodesResponse {
  episodes: {
    info: { count: number | null; pages: number | null } | null
    results: EpisodeListItem[] | null
  } | null
}

export function episodesQuery(page: number, name: string) {
  return queryOptions({
    queryKey: ['episodes', page, name],
    queryFn: async ({ signal }) => {
      const data = await sendGraphQLRequest<EpisodesResponse>(
        GET_EPISODES,
        { page, name },
        signal,
      )
      const info = data.episodes?.info

      // Numa busca sem resultados a API devolve tudo como null. Normalizar aqui
      // evita que `null` chegue à UI — em React, `{null}` não renderiza nada.
      return {
        episodes: data.episodes?.results ?? [],
        totalCount: info?.count ?? 0,
        totalPages: info?.pages ?? 0,
      }
    },
    // Mantém a página anterior em tela enquanto a próxima carrega.
    placeholderData: keepPreviousData,
  })
}

export function episodeQuery(id: string) {
  return queryOptions({
    queryKey: ['episode', id],
    queryFn: async ({ signal }) => {
      const data = await sendGraphQLRequest<{ episode: EpisodeDetail | null }>(
        GET_EPISODE,
        { id },
        signal,
      )

      // Um id inexistente devolve null sem erro; o throw é o que aciona o
      // estado de erro do useQuery.
      if (!data.episode) {
        throw new Error(`Episódio ${id} não encontrado.`)
      }
      return data.episode
    },
  })
}

export function favoriteEpisodesQuery(ids: string[]) {
  return queryOptions({
    queryKey: ['favorite-episodes', ids],
    queryFn: async ({ signal }) => {
      const data = await sendGraphQLRequest<{
        episodesByIds: EpisodeListItem[] | null
      }>(GET_EPISODES_BY_IDS, { ids }, signal)

      return data.episodesByIds ?? []
    },
    // Sem favoritos, a query nem dispara.
    enabled: ids.length > 0,
  })
}
