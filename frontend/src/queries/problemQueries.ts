import { api } from '@/api/client'
import { queryClient } from '@/App'
import { Problem } from '@/pages/AddProblem'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

type problemSolveBy = {
    userId: string
}

export type ProblemType = Problem & {

    userId: string
    company: string
    createdAt: string
    updatedAt: string
    playlistId: string
    ProblemSolved: problemSolveBy[]
    id: string
}

const fetchAllProblems = async () => {
    try {
        const res = await api.get('/problems/')
        return res.data.data
    } catch (error) {
        const message =
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Something went wrong'
                : error instanceof Error
                    ? error.message
                    : 'Something went wrong'
        toast.error(message)
    }
}

const addProblem = async (data: Problem) => {
    const res = await api.post("/problems/", data);
    return res.data
}

export const useAllProblems = () => useQuery({
    queryKey: ['problems'],
    queryFn: fetchAllProblems,
})

export const useAddProblem = () => useMutation({
    mutationFn: addProblem,
    onSuccess: (data) => {
        toast.success(data.message || "Problem is created");
        queryClient.invalidateQueries({ queryKey: ['problems'] })

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

const deleteProblem = async (id: string) => {
    const res = await api.delete(`/problems/${id}`)
    return res.data
}

export const useDeleteProblem = () => useMutation({
    mutationFn: deleteProblem,
    onSuccess: (data) => {
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: ['problems'] })
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

// const fetchProblemById = async (id: string) => {
//     const res = await api.get(`/problems/${id}`)
//     return res.data.data
// }

// const fetchSolvedProblemsByUser = async () => {
//     const res = await api.get('/problems/get-solved-problems')
//     toast.success(res.data.message)
//     return res.data.data
// }

