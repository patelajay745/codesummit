import { env } from "../validators/env"
import axios from "axios"

export interface TestcasesTypes {
    input: string,
    output: string
}

export interface Submissions {
    source_code: string,
    language_id: number,
    stdin: string,
    expected_output: string
}

export interface submissionsResponse {
    token: string
}

export interface submissionBatchResult {
    stdout: string,
    time: string,
    memory: string,
    stderr: string | null,
    token: string
    compile_output: string | null
    message: string | null,
    status: {
        id: number,
        description: string | null
    }
}

export const getJudge0LanguageId = (language: string) => {

    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63
    }

    return languageMap[language.toUpperCase() as keyof typeof languageMap]

}

export const submitBatch = async (submissions: Submissions[]) => {

    const options = {
        method: 'POST',
        url: `${env.JUDGE0_API_URL}/submissions/batch`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${env.JUDGE0_AUTH}`
        },
        data: {
            submissions
        }
    };
    const { data }: { data: submissionsResponse[] } = await axios.request(options);

    return data
}

const sleep = (ms: number) => {
    return new Promise((resolver) => setTimeout(resolver, ms))
}

export const poolBatchResults = async (tokens: string[]) => {

    const alltokens = tokens.join(",")

    console.log(env.JUDGE0_AUTH)

    while (true) {

        const options = {
            method: 'GET',
            url: `${env.JUDGE0_API_URL}/submissions/batch`,
            params: { tokens: alltokens },
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${env.JUDGE0_AUTH}`
            }
        };

        const { data } = await axios.request(options);

        const results: submissionBatchResult[] = data.submissions

        if (results.every(r => r !== null)) {

            const isAllDone = results.every(
                r => r.status.id !== 1 && r.status.id !== 2
            );

            if (isAllDone) return results;
        }

        await sleep(1000)
    }

}

export const getLanguageName = (language_id: number) => {

    const LanguageName = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java"
    }

    type LanguageId = keyof typeof LanguageName;

    return LanguageName[language_id as LanguageId] || "Unknown"
}