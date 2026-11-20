import { create } from "zustand";

type Props = {
    isDark: boolean;
    toggleTheme: () => void;
}

export const useTheme = create<Props>((set) => ({ isDark: true, toggleTheme: () => set((prev) => ({ isDark: !prev.isDark })) }));