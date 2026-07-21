const airDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

/**
 * "December 2, 2013" -> "02 dez 2013".
 * Devolve a string original se a API mudar o formato e o parse falhar.
 */
export function formatAirDate(airDate: string): string {
  const parsed = new Date(airDate)

  if (Number.isNaN(parsed.getTime())) {
    return airDate
  }

  const parts = airDateFormatter.formatToParts(parsed)
  const day = parts.find((part) => part.type === 'day')?.value ?? ''
  const month = parts.find((part) => part.type === 'month')?.value ?? ''
  const year = parts.find((part) => part.type === 'year')?.value ?? ''

  // O Intl devolve o mês abreviado com ponto ("dez."); aqui ele atrapalha.
  return `${day} ${month.replace('.', '')} ${year}`
}

/**
 * "S01E01" -> "Temporada 1 · Ep. 1".
 * O código cru da API é compacto mas críptico; aqui vira texto legível.
 * Number() de quebra remove os zeros à esquerda.
 */
export function formatEpisodeCode(code: string): string {
  const match = code.match(/^S(\d+)E(\d+)$/i)

  if (!match) {
    return code
  }

  return `Temporada ${Number(match[1])} · Ep. ${Number(match[2])}`
}
