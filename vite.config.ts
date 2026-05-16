import { defineConfig } from 'vite'
import openEditorReact from '@line-copy-open/react/vite'
import openEditor from '@line-copy-open/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    openEditorReact(),
    react(),
    openEditor({
      editor: 'code',
    }),
  ],
})
