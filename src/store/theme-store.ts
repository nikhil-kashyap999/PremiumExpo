import { create } from "zustand";
import Storage from "expo-sqlite/kv-store"
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

const storage = {
    getItem: (key: string) => Storage.getItemSync(key),
    removeItem: (key: string) => Storage.removeItemSync(key),
    setItem: (key: string, value: string) => Storage.setItemSync(key, value),
};
type ThemeState = { mode: ThemeMode; setMode: (m: ThemeMode) => void };

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({ mode: "system", setMode: (mode) => set({ mode }) }),
        { name: "theme-mode", storage: createJSONStorage(() => storage) }
    )
);