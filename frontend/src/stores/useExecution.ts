import { api } from "@/api/client"
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand"

export type executeCodeData = { source_code: string, language_id: number, stdin: string[], expected_outputs: string[], problemId: string }

export interface TestCaseResult {
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
    stdout: string[];
    stderr: string | null;
    compileOutput: string | null;
    status: string;
    memory: string[];
    time: string[];
    createAt: string;
    updatedAt: string;
    TestCaseResult: TestCaseResult[];
}

type useExecutionStore = {
    isExecuting: boolean,
    submission: Submission | null,
    executeCode: ({ source_code, language_id, expected_outputs, problemId, stdin }: executeCodeData) => Promise<void>
}

export const useExecutionStore = create<useExecutionStore>((set) => ({
    isExecuting: false,
    submission: null,

    executeCode: async (data: executeCodeData) => {

        try {
            set({ isExecuting: true })
            const res = await api.post("/execute-code", data)

            set({ submission: res.data.data })

            toast.success(res.data.message)
        } catch (error) {
            let message = "Something went wrong";

            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            toast.error(message);
        }
        finally {
            set({ isExecuting: false })
        }
    }
}))