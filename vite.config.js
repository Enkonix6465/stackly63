import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,  // 👈 this will auto open browser
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor libraries into separate chunks
          if (id.includes('node_modules')) {
            // React core libraries
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // React Router
            if (id.includes('react-router')) {
              return 'router-vendor'
            }
            // i18next internationalization
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n-vendor'
            }
            // Framer Motion (for animations)
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            // Chart libraries
            if (id.includes('recharts') || id.includes('chart')) {
              return 'chart-vendor'
            }
            // All other vendor libraries
            return 'vendor'
          }
        }
      }
    },
    // Increase chunk size warning limit since we're properly splitting now
    chunkSizeWarningLimit: 1000
  }
})
