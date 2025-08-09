import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Three.js/GLB model support
  assetsInclude: ['**/*.glb', '**/*.gltf'],

  // Build settings
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600, // For larger Three.js bundles
  },

  // Path aliases (optional but recommended)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@models': path.resolve(__dirname, './public/models') 
    }
  },

  // Dev server settings
  server: {
    port: 3000,
    open: true
  },

  // Vercel-specific optimizations
  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ]
  }
});
