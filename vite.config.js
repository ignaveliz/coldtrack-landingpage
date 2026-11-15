import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // El chunk de la mascota 3D (three.js) se carga de forma diferida
    chunkSizeWarningLimit: 1000,
  },
})
