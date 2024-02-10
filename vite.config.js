import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'src', // go into src directory then find the index.html file and check for App.jsx import 
})
