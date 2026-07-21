import { useEffect, useState } from 'react'

/**
 * Devolve o valor com atraso: ele só muda depois de passar `delayInMilliseconds`
 * sem digitação nova. Cada tecla cancela o agendamento anterior.
 */
export function useDebouncedValue(value: string, delayInMilliseconds: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delayInMilliseconds)

    return () => clearTimeout(timeoutId)
  }, [value, delayInMilliseconds])

  return debouncedValue
}
