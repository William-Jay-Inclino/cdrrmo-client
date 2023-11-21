import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5173/api/v1",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});

// const baseUrl = '/cdrrmo'
const baseUrl = import.meta.env.VITE_DOMAIN + import.meta.env.BASE_URL

export const config = {
    api,
    baseUrl
}


