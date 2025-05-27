import { api } from "@/api/client"
import axios from "axios"
import { toast } from "sonner"
import { create } from "zustand"

type useActionsStore = {
    isDeletingProblem: boolean
    onDeletProblem: (id: string) => Promise<void>
}

export const useActionsStore = create<useActionsStore>((set) => ({
    isDeletingProblem: false,
    onDeletProblem: async (id) => {
        try {
            set({ isDeletingProblem: true })
            const res = await api.delete(`/problems/${id}`)
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
            set({ isDeletingProblem: false })
        }
    }
}))