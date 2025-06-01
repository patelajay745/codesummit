import { api } from '@/api/client'
import { queryClient } from '@/App'
import { Difficulty } from '@/schemas'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

type problemSolveBy = {
    userId: string
}

type testCase = {
    input: string;
    output: string;
};

type Language = "JAVASCRIPT" | "PYTHON" | "JAVA" | string;

type Examples = Record<Language, Example>;

export type CodeSnippets = Record<Language, string>;
type ReferenceSolutions = Record<Language, string>;

type Example = {
    input: string;
    output: string;
    explanation: string;
};

export interface Problem {
    title: string;
    description: string;
    constraints: string;
    testcases: testCase[];
    codeSnippets: CodeSnippets;
    referenceSolution: ReferenceSolutions;
    hints?: string;
    editorial?: string;
    category?: string;
    tags: string[];
    examples: Examples;
    difficulty: Difficulty;
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

const fetchAllProblems = async (): Promise<ProblemType[]> => {
    try {
        const res = await api.get('/problems/');
        return res.data.data;
    } catch (error) {
        const message = axios.isAxiosError(error)
            ? error.response?.data?.message || 'Something went wrong'
            : error instanceof Error
                ? error.message
                : 'Something went wrong';

        toast.error(message);
        return [];
    }
}

export const useAllProblems = () => useQuery({
    queryKey: ['problems'],
    queryFn: fetchAllProblems,
})

const addProblem = async (data: Problem) => {
    const res = await api.post("/problems/", data);
    return res.data
}

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

const fetchProblemById = async (id: string): Promise<ProblemType> => {
    const res = await api.get(`/problems/${id}`)
    return res.data.data
}

export const useProblemById = (id: string) => useQuery({
    queryKey: ["problem", id],
    queryFn: () => fetchProblemById(id),
    enabled: !!id,

})

const updateProblem = async ({ id, data }: { id: string, data: Problem }) => {
    const res = await api.patch(`/problems/${id}`, data)
    return res.data
}

export const useUpdateProblem = () => useMutation({
    mutationFn: updateProblem,
    onSuccess: (data) => {
        toast.success(data.message || "Problem is updated");
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

// const fetchSolvedProblemsByUser = async () => {
//     const res = await api.get('/problems/get-solved-problems')
//     toast.success(res.data.message)
//     return res.data.data
// }

interface DifficultyStats {
    solved: number;
    total: number;
}

interface ProgressData extends DifficultyStats {
    easy: DifficultyStats;
    medium: DifficultyStats;
    hard: DifficultyStats;
}

const userProgress = async (): Promise<ProgressData> => {
    const res = await api.get("/auth/user-progress")
    return res.data.data.progressData
}

export const useUserProgress = () => useQuery({
    queryKey: ["progress"],
    queryFn: userProgress
})

