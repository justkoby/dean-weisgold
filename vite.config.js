import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        team: resolve(__dirname, 'team.html'),
        practice: resolve(__dirname, 'practice-areas.html'),
        stories: resolve(__dirname, 'client-stories.html'),
        resources: resolve(__dirname, 'resources.html'),
        faq: resolve(__dirname, 'faq.html'),

      },
    },
  },
})
