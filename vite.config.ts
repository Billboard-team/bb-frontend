import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  server: {
      cors: {
        // the origin you will be accessing via browser
        origin: 'http://localhost:5173/',
      },
    },
    build: {
      // generate .vite/manifest.json in outDir
      manifest: true,
      rollupOptions: {
        // overwrite default .html entry
        input: '/path/to/main.js',
      },
    },
  plugins: [react(), tsconfigPaths()],
})
