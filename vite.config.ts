import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseConfig = {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
 if (mode === 'lib') {
  return {
    ...baseConfig,
    build: {
      lib: {
        entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        name: 'vue-drag-scroller',
        fileName: (format) => `vue-drag-scroller.${format}.js`
      },
    },
  }
 } else if (mode === 'app') {
  return {
    ...baseConfig,
    plugins: [
      vue(),
    ],
    build: {
      outDir: 'server'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
 }
})
