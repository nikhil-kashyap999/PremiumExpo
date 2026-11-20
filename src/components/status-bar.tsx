import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind"; // v5 mein: from "react-native"

export default function CustomStatusBar() {
  const { colorScheme } = useColorScheme(); // v5: const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return <StatusBar style={isDark ? "light" : "dark"} />;
}
