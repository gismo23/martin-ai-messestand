import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/martin-ai-messestand/',
  build: {
    sourcemap: true,  // Für besseres Debugging
    minify: false     // Deaktiviert Minifizierung für bessere Lesbarkeit
  },
  esbuild: {
    jsxInject: `import React from 'react'`  // Automatischer React-Import
  }
})
