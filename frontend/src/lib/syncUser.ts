
import axios from "axios";

export const apiForSyncUser = axios.create({
    baseURL: import.meta.env.PROD ? `${import.meta.env.VITE_BACKEND_URL}/api/v1` : "http://localhost:8081/api/v1",
    headers: {
        'Content-Type': "application/json",
    },
    withCredentials: true

})

