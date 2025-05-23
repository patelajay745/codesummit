import { create } from "zustand"
import { Problem } from "@/pages/AddProblem"
import { api } from "@/api/client"
import axios from "axios"
import { toast } from "sonner"

export type ProblemType = Problem & {

    userId: string
    createdAt: string
    updatedAt: string
    playlistId: string
}

export interface ProblemStore {
    problems: ProblemType[] | []
    problem: ProblemType | null
    isProblemsLoading: boolean
    isProblemLoading: boolean
    solvedProblems: ProblemType | []
    getAllProblems: () => Promise<void>
    getProblemById: (id: string) => Promise<void>
    getSolvedProblemByUser: () => Promise<void>
}

export const useProblemStore = create<ProblemStore>((set) => ({
    problems: [],
    problem: null,
    solvedProblems: [],
    isProblemsLoading: false,
    isProblemLoading: false,

    getAllProblems: async () => {
        try {
            set({ isProblemsLoading: true })

            const res = await api.get("/problems/")
            set({ problems: res.data.data })

        } catch (error) {
            let message = "Something went wrong";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast.error(message);
        } finally {
            set({ isProblemsLoading: false })

        }
    },
    getProblemById: async (id: string) => {
        try {
            set({ isProblemLoading: true })

            const res = await api.get(`/problems/${id}`)
            set({ problem: res.data.data })
            toast.success(res.data.message)
        } catch (error) {
            let message = "Something went wrong";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast.error(message);
        } finally {
            set({ isProblemLoading: false })

        }
    },
    getSolvedProblemByUser: async () => {
        try {
            set({ isProblemLoading: true })

            const res = await api.get(`/problems/get-solved-problems`)
            set({ solvedProblems: res.data.data })
            toast.success(res.data.message)
        } catch (error) {
            let message = "Something went wrong";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast.error(message);
        } finally {
            set({ isProblemLoading: false })

        }
    }
}))

