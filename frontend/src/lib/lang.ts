import { ProblemType } from "@/queries/problemQueries";

const LanguageName = {
    74: "Typescript",
    63: "Javascript",
    71: "Python",
    62: "Java"
}

export const getLanguageName = (language_id: number) => {

    type LanguageId = keyof typeof LanguageName;

    return LanguageName[language_id as LanguageId] || "Unknown"
}

export const getLanguageId = (language: string) => {

    return (Object.keys(LanguageName).find(key =>
        LanguageName[key as unknown as keyof typeof LanguageName] === language));

}

export function getTagCounts(problems: ProblemType[]): Record<string, number> {
    const tagCount: Record<string, number> = {};

    for (const problem of problems) {
        for (const tag of problem.tags) {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        }
    }
    const sortedEntries = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

    const sortedTagCount: Record<string, number> = {};
    for (const [tag, count] of sortedEntries) {
        sortedTagCount[tag] = count;
    }

    return sortedTagCount;
}