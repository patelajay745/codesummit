import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === "production" ? `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1` : "http://localhost:8081/api/v1",
    headers: {
        'Content-Type': "application/json"
    },
    withCredentials: true

})