import { api } from "@/api/client"
import { queryClient } from "@/App"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export type executeCodeData = { source_code: string, language_id: number, stdin: string[], expected_outputs: string[], problemId: string }

const executeCode = async (data: executeCodeData) => {
    const res = await api.post("/execute-code", data)
    return res.data.data
}

export const useExecuteCode = (id: string) => useMutation({
    mutationFn: executeCode,
    onSuccess: (data) => {
        toast.success(data.message || "Code is executed");
        queryClient.invalidateQueries({ queryKey: ['submissions-count', id] })
        queryClient.invalidateQueries({ queryKey: ['submissions-success', id] })
        queryClient.invalidateQueries({ queryKey: ['submissions', id] })
    },
    onError: (error) => {
        const message =
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Something went wrong'
                : error instanceof Error
                    ? error.message
                    : 'Something went wrong'
        toast.error(message)
    }
})