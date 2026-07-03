import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',

    manifest: {
      name: 'Flashcard App',
      short_name: 'Flashcards',
      description: 'Eine App zum Lernen mit Karteikarten',
      theme_color: '#134ff4',
      background_color: '#000000',
display: 'standalone',
  
    }
  })],
})  