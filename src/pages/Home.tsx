import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { episodesQuery } from '@/api/episodes'
import { EpisodeCard } from '@/components/EpisodeCard'
import { EpisodeCardSkeleton } from '@/components/EpisodeCardSkeleton'
import { Pagination } from '@/components/Pagination'
import { SearchField } from '@/components/SearchField'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

import styles from './Home.module.css'

export function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 400)
  const { data, isPending, isError, error } = useQuery(
    episodesQuery(currentPage, debouncedSearchTerm),
  )

  // Mudar o termo tem que voltar para a página 1: a página 3 não existe
  // quando a busca sobra um resultado só.
  function handleSearchTermChange(newSearchTerm: string) {
    setSearchTerm(newSearchTerm)
    setCurrentPage(1)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>

        <h1 className={styles.title}>Rick and Morty</h1>

        <p className={styles.subtitle}>
          Navegue, busque e favorite os episódios da série.
        </p>
        
        <span className={styles.count}>
          {data ? `${data.totalCount} episódios` : 'Carregando…'}
        </span>
      </header>

      <SearchField value={searchTerm} onChange={handleSearchTermChange} />

      {isPending && <EpisodeGridSkeleton />}

      {isError && (
        <div className={styles.error}>
          <span className={styles.errorBadge}>Erro</span>
          <p className={styles.errorTitle}>Não deu para carregar os episódios</p>
          <p className={styles.errorMessage}>{error.message}</p>
        </div>
      )}

      {data && (
        <div className={styles.grid}>
          {data.episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}

      {data?.episodes.length === 0 && (
        <p className={styles.emptyState}>
          Nenhum episódio encontrado para “{debouncedSearchTerm}”.
        </p>
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

function EpisodeGridSkeleton() {
  return (
    <div className={styles.grid} aria-hidden>
      {Array.from({ length: 6 }, (_, index) => (
        <EpisodeCardSkeleton key={index} index={index} />
      ))}
    </div>
  )
}
