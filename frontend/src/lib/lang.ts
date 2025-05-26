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