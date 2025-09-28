import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel-ready Vite config
export default defineConfig({
  base: '/',
  plugins: [react()],
})
