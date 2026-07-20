export const GRAPHQL_URL = 'https://rickandmortyapi.com/graphql'

interface GraphQLResponse<T> {
  data?: T
  errors?: { message: string }[]
}

/**
 * Cliente GraphQL mínimo sobre o fetch nativo. Único lugar do projeto que
 * chama `fetch`.
 *
 * GraphQL usa um endpoint único e sempre POST — a query vai no corpo, não na
 * URL. Por isso não há necessidade de axios nem de um cliente dedicado.
 */
export async function sendGraphQLRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal,
  })

  if (!response.ok) {
    throw new Error(`Falha na requisição à API (HTTP ${response.status}).`)
  }

  const payload = (await response.json()) as GraphQLResponse<T>

  // A API responde 200 mesmo em erro, com a falha no array `errors`.
  // Sem esta checagem, erros de query passariam despercebidos.
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(' | '))
  }

  if (!payload.data) {
    throw new Error('A API respondeu sem dados.')
  }

  return payload.data
}
