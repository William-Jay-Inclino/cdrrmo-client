import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5173/api/v1",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});


export const config = {
    api
}

