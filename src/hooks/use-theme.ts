import { applyTheme } from "@/services/theme-mode";
import { useThemeStore } from "@/store/theme-store";
import { useEffect } from "react";

export default function useThemeHook() {
  const mode = useThemeStore(s => s.mode);
  useEffect(() => { applyTheme(mode) }, [mode]);
}