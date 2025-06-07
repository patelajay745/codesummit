import { api } from "@/api/client"
import { useQuery } from "@tanstack/react-query";

interface TestCaseResult {
    id: string;
    submissionId: string;
    testCase: number;
    passed: boolean;
    stdout: string;
    expected: string;
    stderr: string | null;
    compileOutput: string | null;
    status: string;
    memory: string;
    time: string;
    createAt: string;
    updatedAt: string;
}

export interface Submission {
    id: string;
    userId: string;
    problemId: string;
    sourceCode: string;
    language: string;
    stdin: string;
    stdout: string;
    stderr: string | null;
    compileOutput: string | null;
    status: string;
    memory: string;
    time: string;
    createAt: string;
    updatedAt: string;
    TestCaseResult: TestCaseResult[];
}

const getAllSubmission = async (): Promise<Submission[]> => {
    const res = await api.get("/submission")
    return res.data.data
}

export const useGetAllSubmission = () => useQuery({
    queryKey: ["submissions"],
    queryFn: getAllSubmission
})

const getSubmissionById = async (problemId: string) => {
    const res = await api.get(`/submission/${problemId}`)
    return res.data.data
}

export const useGetSubmissionById = (id: string) => useQuery({
    queryKey: ["submissions", id],
    queryFn: () => getSubmissionById(id)
})

const getSubmissionCount = async (problemId: string) => {
    const res = await api.get(`/submission/submission-count/${problemId}`)
    return res.data.data
}

export const useGetSubmissionCount = (id: string) => useQuery({
    queryKey: ["submissions-count", id],
    queryFn: () => getSubmissionCount(id)
})

const getSuccessRate = async (problemId: string) => {
    const res = await api.get(`/submission/success-count/${problemId}`)
    return res.data.data
}

export const useGetSuccessRate = (id: string) => useQuery({
    queryKey: ["submissions-success", id],
    queryFn: () => getSuccessRate(id)
})

export type StreakEntry = {
    date: string;
    count: number;
    level: number;
};

const getStreakData = async (): Promise<StreakEntry[]> => {
    const res = await api.get("/submission/streak-calendar/")
    return res.data.data
}

export const useGetStreakData = () => useQuery({
    queryKey: ["streak-data"],
    queryFn: getStreakData
})