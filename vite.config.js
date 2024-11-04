// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/martin-ai-messestand/',
  server: {
    host: '0.0.0.0'
  }
})
