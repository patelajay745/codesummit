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