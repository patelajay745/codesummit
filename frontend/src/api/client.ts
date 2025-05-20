import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8081/api/v1" : import.meta.env.BASE_URL,
    headers: {
        'Content-Type': "applications/json"
    },

})