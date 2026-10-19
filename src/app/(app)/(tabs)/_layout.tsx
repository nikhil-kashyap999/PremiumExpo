import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";
import AppTabs from "@/components/app-tabs";

// @ts-ignore: allow side-effect CSS import without type declarations
import "../../../global.css";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppTabs />
    </ThemeProvider>
  );
}
