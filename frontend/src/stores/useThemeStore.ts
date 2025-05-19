import { THEME_TYPES } from "@/constants"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const { THEME_DARK, THEME_LIGHT } = THEME_TYPES

export type Theme = typeof THEME_TYPES[keyof typeof THEME_TYPES];

interface ThemeState {
    theme: Theme;
    toogleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: THEME_DARK,
            toogleTheme: () => set((state) => {
                const newTheme = state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
                window.document.documentElement.setAttribute("class", newTheme);
                return { theme: newTheme };
            })
        }),
        {
            name: "theme",
            onRehydrateStorage: () => (state) => {
                const theme = state?.theme || THEME_DARK;
                window.document.documentElement.setAttribute("class", theme);
            },
        }
    )
)

export default useThemeStore