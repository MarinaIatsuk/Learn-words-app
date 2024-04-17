import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
server:{
  "proxy": {
    "/api": {
      "target": "http://itgirlschool.justmakeit.ru",
      "changeOrigin": true
    }
},
},

  plugins: [react()],
})
