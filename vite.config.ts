import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: "/cdrrmo",
    plugins: [vue()],
    server: {
        proxy: {
            "/api": {
            target: 'http://cdrrmo-server:3000', 
            secure: false, 
            changeOrigin: true
            },
        },
      },
})
