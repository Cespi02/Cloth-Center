// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Cloth-Center/', // 👈 esto es CLAVE
  plugins: [react()],
})