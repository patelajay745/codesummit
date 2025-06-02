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

export const useAuthStore = create<AuthStore>()(
    (set) => ({
        authUser: null,
        isSignInUp: false,
        isLoggingIn: false,
        isCheckingAuth: false,

        checkAuth: async () => {
            set({ isCheckingAuth: true })
            try {
                const res = await api.get("/auth/")
                console.log("auth api called ")
                set({ authUser: res.data.data.user })
                console.log("auth api called ", res.data.data)
            } catch (error) {
                set({ authUser: null })
            } finally {
                set({ isCheckingAuth: false })
            }
        },

        signUp: async (data: User) => {
            set({ isSignInUp: true })
            let res
            try {
                res = await api.post("/auth/", data)
                set({ authUser: res.data.data.user })
                toast.success('Account has been created successFully')
            } catch (error) {
                console.log(error)
                console.log(typeof error)
                toast.error('Error while signUp')
            } finally {
                set({ isSignInUp: false })
            }
        },

        signIn: async (data: loginFormDataTypes) => {

            set({ isLoggingIn: true })
            try {
                const res = await api.post("/auth/login", data)
                set({ authUser: res.data.data.user })
                toast.success('Login successful.')

            } catch (error) {
                toast.error('Error while login')
            } finally {
                set({ isLoggingIn: false })
            }

        },

        logOut: async () => {
            set({ isLoggingIn: true })
            try {
                set({ authUser: null })
                localStorage.removeItem("auth")
            } catch (error) {
                toast.error('Error while logout')
            } finally {
                set({ isLoggingIn: false })
            }
        },
    }),

)
