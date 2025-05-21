import { create } from "zustand"
import { api } from "@/api/client"
import { toast } from 'sonner'
import { FormDataTypes } from "@/sections/SignUpForm"
import { loginFormDataTypes } from "@/sections/SignInForm"

export interface User {
    id?: string
    name: string
    email: string
    image?: string
    role?: string
}

export interface AuthStore {
    authUser: User | null
    isSignInUp: boolean
    isLoggingIn: boolean
    isCheckingAuth: boolean
    checkAuth: () => Promise<void>
    signUp: (data: FormDataTypes) => Promise<void>
    signIn: (data: loginFormDataTypes) => Promise<void>
    logOut: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    isSignInUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await api.get("/auth/")
            console.log("checkauth response", res.data)
            set({ authUser: res.data.data.user })
        } catch (error) {
            // console.log("Error checking auth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data: User) => {
        set({ isSignInUp: true })
        try {
            const res = await api.post("/auth/", data)
            console.log("register response", res.data)
            set({ authUser: res.data.data.user })
            toast.success('Account has been created successFully')
        } catch (error) {
            console.log("Error checking auth", error)
            toast.error('Error while signUp')
        } finally {
            set({ isSignInUp: false })
        }
    },

    signIn: async (data: loginFormDataTypes) => {

        console.log("node_env", import.meta.env.PROD)
        console.log("VITE_BACKEND_URL", import.meta.env.VITE_BACKEND_URL)
        set({ isLoggingIn: true })
        try {
            const res = await api.post("/auth/login", data)
            console.log("login response", res.data)
            set({ authUser: res.data.data.user })
            toast.success('LoggedIn successFully')
        } catch (error) {
            console.log("Error checking auth", error)
            toast.error('Error while login')
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logOut: async () => {
        set({ isLoggingIn: true })
        try {
            await api.post("/auth/logout")
            set({ authUser: null })
            toast.success('Logged out successFully')
        } catch (error) {
            console.log("Error while logout", error)
            toast.error('Error while logout')
        } finally {
            set({ isLoggingIn: false })
        }
    },

}))