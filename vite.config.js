import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          
          // Router
          'router': ['react-router-dom'],
          
          // UI libraries
          'ui-libs': [
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-slot',
            'lucide-react',
          ],
          
          // Animation
          'framer-motion': ['framer-motion'],
          
          // Charts
          'recharts': ['recharts'],
          
          // i18n
          'i18n': [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
          ],
          
          // Utility libraries
          'utils': [
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
          ],
        },
      },
    },
    // Increase chunk size warning limit to 1000 kB (optional)
    chunkSizeWarningLimit: 1000,
  },
})

