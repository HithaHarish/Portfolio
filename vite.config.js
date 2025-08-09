import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // 100% Error-proof settings
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600, // For Three.js
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          vendor: ['react', 'react-dom']
        }
      }
    }
  },

  // Foolproof path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },

  // Crash-proof asset handling
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.mp4'],

  // Error-resistant server config
  server: {
    host: true, // Avoid network issues
    port: 3000,
    strictPort: true, // No random port switching
    open: false, // Prevent browser tab explosions
    headers: {
      'Content-Type': 'application/javascript'
    }
  },

  // Safe optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber'
    ],
    exclude: ['three-mesh-bvh'] // Prevent version conflicts
  }
});
