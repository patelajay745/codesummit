import { api } from "@/api/client";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand"

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

export interface SubmissionStore {
    submissions: Submission[] | []
    isLoading: boolean
    submission: Submission[] | null
    submissionCount: number
    getAllSubmission: () => Promise<void>
    getSubmissionById: (problemId: string) => Promise<void>
    getTotalSubmission: (problemId: string) => Promise<void>

}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
    submissions: [],
    isLoading: false,
    submission: null,
    submissionCount: 0,

    getAllSubmission: async () => {
        try {
            set({ isLoading: true })
            const res = await api.get("/submission/")
            set({ submissions: res.data.data })

        } catch (error) {
            let message = "Something went wrong";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast.error(message);
        } finally {
            set({ isLoading: false })
        }
    },
    getSubmissionById: async (problemId) => {
        try {
            set({ isLoading: true })
            const res = await api.get(`/submission/${problemId}`)
            set({ submission: res.data.data })

        } catch (error) {
            let message = "Something went wrong";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast.error(message);
        } finally {
            set({ isLoading: false })
        }
    },
    getTotalSubmission: async (problemId) => {
        try {
            set({ isLoading: true })
            const res = await api.get(`/submission/submission-count/${problemId}`)
            set({ submissionCount: res.data.data })

        } catch (error) {
            let message = "Something went wrong";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast.error(message);
        } finally {
            set({ isLoading: false })
        }
    },

}))