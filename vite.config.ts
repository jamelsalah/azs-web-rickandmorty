import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  // strictPort: falha se a 3005 estiver ocupada, em vez de escolher outra porta
  server: { port: 3005, strictPort: true },
  preview: { port: 3005, strictPort: true },
})
