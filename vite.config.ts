import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/api/graphql': {
        target: 'https://api.hardcover.app',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/graphql/, '/v1/graphql'),
      },
    },
  },
})
