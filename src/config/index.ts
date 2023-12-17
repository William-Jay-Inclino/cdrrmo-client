
import api from './api'

export const config = {
    api,
    baseUrl: import.meta.env.BASE_URL,
    uploads: '/api/v1/image/get-image/'
    // baseUrl: import.meta.env.VITE_DOMAIN + import.meta.env.BASE_URL,
};