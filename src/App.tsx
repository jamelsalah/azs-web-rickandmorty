import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { EpisodeDetailPage } from '@/pages/EpisodeDetailPage'
import { Home } from '@/pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episodio/:id" element={<EpisodeDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
