import { useState } from "react";
import { StatusBar } from "react-native";
// import { useTheme } from "../context/ThemeContext";

export default function CustomStatusBar() {
  //   const { mode } = useTheme();
  const [mode, setMode] = useState("dark");
  return (
    <>
      <StatusBar
        backgroundColor={mode === "dark" ? "#000" : "#f2f2f2"}
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
      />
    </>
  );
}
