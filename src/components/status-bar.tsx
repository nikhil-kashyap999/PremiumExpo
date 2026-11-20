import { useTheme } from "@/store/theme-store";
import { useState } from "react";
import { StatusBar } from "react-native";

export default function CustomStatusBar() {
  const [mode, setMode] = useState("dark");
  const isDark = useTheme(s=>s.isDark);
  return (
    <>
      <StatusBar
        backgroundColor={isDark ? "#000" : "#f2f2f2"}
        barStyle={isDark ? "light-content" : "dark-content"}
      />
    </>
  );
}
