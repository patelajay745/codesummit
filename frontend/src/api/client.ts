import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8081" : import.meta.env.BASE_URL,
    headers: {
        'Content-Type': "applications/json"
    },

})