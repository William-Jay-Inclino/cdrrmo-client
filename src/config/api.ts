// Axios interceptors setup in Vue.js 3
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IAuth } from '../auth'
import router from '../router'; 
import { routeNames } from '../common';
import { useToast } from "vue-toastification";
import { authService } from '../auth';

const toast = useToast();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the JWT token in the Authorization header
api.interceptors.request.use(
    // @ts-ignore
    (config: AxiosRequestConfig) => {
        const auth: IAuth | null = JSON.parse(localStorage.getItem('auth') || 'null');

        if (auth && auth.access_token) {
            config.headers!.Authorization = `Bearer ${auth.access_token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration errors
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401 && !authService.isTokenExpiredNotificationShown) {
        // Token is expired or invalid, redirect to login
        authService.isTokenExpiredNotificationShown = true; 
        toast.error('Token expired or invalid. Please login again.');
        router.push({ name: routeNames.login });
      }
  
      return Promise.reject(error);
    }
);

export default api;
