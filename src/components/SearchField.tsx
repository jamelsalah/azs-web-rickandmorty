interface SearchFieldProps {
  value: string
  onChange: (newValue: string) => void
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Buscar episódio pelo nome…"
      aria-label="Buscar episódio pelo nome"
    />
  )
}
