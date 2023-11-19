import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig( ({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        env: env,
        base: env.VITE_BASE_URL,
        plugins: [vue()],
        server: {
        host: true,
        port: 5173,
        proxy: {
            "/api": { target: env.VITE_PROXY, secure: false, changeOrigin: true },
        },
        },
    }
})