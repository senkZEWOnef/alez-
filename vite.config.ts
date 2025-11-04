import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_85mzQKZdcvxH@ep-empty-star-aeknhdcm-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require')
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
  },
})