import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // CSS Modules são nativos do Vite — não precisam de plugin nem configuração.
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  // strictPort: falha se a 3005 estiver ocupada, em vez de escolher outra porta
  server: { port: 3005, strictPort: true },
  preview: { port: 3005, strictPort: true },
})
