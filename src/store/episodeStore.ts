import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EpisodeStore {
  favoriteIds: string[]
  watchedIds: string[]
  toggleFavorite: (episodeId: string) => void
  toggleWatched: (episodeId: string) => void
}

/** Estava na lista? sai. Não estava? entra. */
function toggleId(ids: string[], episodeId: string) {
  if (ids.includes(episodeId)) {
    return ids.filter((id) => id !== episodeId)
  }
  return [...ids, episodeId]
}

/** Ids como string[], nunca Set: Set não sobrevive ao JSON do localStorage. */
export const useEpisodeStore = create<EpisodeStore>()(
  persist(
    (set) => ({
      favoriteIds: [],
      watchedIds: [],

      toggleFavorite: (episodeId) => {
        set((state) => {
          return { favoriteIds: toggleId(state.favoriteIds, episodeId) }
        })
      },

      toggleWatched: (episodeId) => {
        set((state) => {
          return { watchedIds: toggleId(state.watchedIds, episodeId) }
        })
      },
    }),
    { name: 'rick-and-morty:episodios' },
  ),
)
