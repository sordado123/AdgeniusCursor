import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import themeJson from './theme.json'
import shadcnThemeJson from '@replit/vite-plugin-shadcn-theme-json'
import cartographer from '@replit/vite-plugin-cartographer'
import runtimeModals from '@replit/vite-plugin-runtime-error-modal'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    shadcnThemeJson(themeJson),
    cartographer.withNestedDeps({
      customEsbuildPlugins: []
    }),
    runtimeModals({
      plugins: ['react', 'typescript']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})