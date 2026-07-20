/**
 * Documentos das queries. São strings simples: como o transporte é fetch puro,
 * nada precisa parsear o documento no client (o pacote `graphql` não está
 * instalado).
 */

/**
 * `characters { id }` traz apenas os ids porque a listagem só precisa da
 * quantidade de participantes — evita baixar o objeto completo de cada personagem.
 */
export const GET_EPISODES = /* GraphQL */ `
  query GetEpisodes($page: Int, $name: String) {
    episodes(page: $page, filter: { name: $name }) {
      info {
        count
        pages
      }
      results {
        id
        episode
        name
        air_date
        characters {
          id
        }
      }
    }
  }
`

export const GET_EPISODE = /* GraphQL */ `
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      episode
      name
      air_date
      characters {
        id
        name
        image
        species
        status
      }
    }
  }
`

/** Tela de favoritos: busca vários episódios por id numa única query. */
export const GET_EPISODES_BY_IDS = /* GraphQL */ `
  query GetEpisodesByIds($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      episode
      name
      air_date
      characters {
        id
      }
    }
  }
`
