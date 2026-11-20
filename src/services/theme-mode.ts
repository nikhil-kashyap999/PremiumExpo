import { colorScheme } from "nativewind";
import { ThemeMode } from "@/store/theme-store";

export const applyTheme = (mode: ThemeMode) => colorScheme.set(mode);