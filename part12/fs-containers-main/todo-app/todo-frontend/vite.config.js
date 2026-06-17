import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: { usePolling: true },
    allowedHosts: ['app', 'localhost'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-cleanup-after-each.js']
  }
})
