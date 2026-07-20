/**
 * Tipos do domínio, espelhando o schema da API (obtidos por introspecção).
 *
 * Os formatos crus de resposta (com os `null` que a API pode devolver) ficam
 * junto de quem os consome, em `src/api/episodes.ts`.
 */

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export interface Character {
  id: string
  name: string
  image: string
  species: string
  status: CharacterStatus
}

export interface Episode {
  id: string
  /** Código no formato "S01E01". */
  episode: string
  name: string
  /** Data de exibição já formatada pela API, ex.: "December 2, 2013". */
  air_date: string
}

/** Item da listagem: só os ids dos personagens, para contar participantes. */
export interface EpisodeListItem extends Episode {
  characters: { id: string }[]
}

/** Item do detalhe: personagens completos, para exibir na tela. */
export interface EpisodeDetail extends Episode {
  characters: Character[]
}
