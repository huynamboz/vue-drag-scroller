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
        fileName: (format) => `vue-drag-scroller.${format}.js`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['vue'],
      }
    },
  }
 } else if (mode === 'nuxt') {
  return {
    ...baseConfig,
    build: {
      emptyOutDir: false, // Don't clear dist folder
      lib: {
        entry: fileURLToPath(new URL('./src/nuxt.ts', import.meta.url)),
        name: 'nuxt-module',
        fileName: (format) => `nuxt.${format === 'es' ? 'mjs' : 'cjs'}`,
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['vue', '@nuxt/kit', '@nuxt/schema', 'nuxt/app', '#app'],
      }
    },
  }
 } else if (mode === 'app') {
  return {
    ...baseConfig,
    base: '/vue-drag-scroller/',
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
