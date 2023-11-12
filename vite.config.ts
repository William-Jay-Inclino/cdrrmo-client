import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    // resolve: {
    //     alias: [
    //     { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    //     ]
    // },
    server: {
        // host: true,
        // port: 5173,
        proxy: {
            "/api": {
            target: 'http://localhost:3000', // Replace with your NestJS backend URL
            secure: false, 
            changeOrigin: true
            },
        },
      },
})
