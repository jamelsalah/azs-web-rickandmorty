import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/Layout'
import { EpisodeDetailPage } from '@/pages/EpisodeDetailPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { Home } from '@/pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
        </Route>
        <Route path="/episodio/:id" element={<EpisodeDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
