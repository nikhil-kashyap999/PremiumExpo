import { Pressable, Text, View } from "react-native";
import { useThemeStore, type ThemeMode } from "@/store/theme-store";
import Icon from "@expo/vector-icons/MaterialIcons";

const OPTIONS: { key: ThemeMode; label: string }[] = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "system", label: "System" },
];

export default function ThemeSelector() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  return (
    <View className="rounded-xl bg-neutral-200 dark:bg-neutral-800 p-1 mb-4">
      <View className="flex-row items-center px-3 mb-1">
        <View className="w-10 h-10 rounded-2xl justify-center items-center mr-4">
          <Icon name={"light-mode"} size={25} color={mode==="dark"?"white":"black"} />
        </View>
        <View>
          <Text className="text-black dark:text-white font-bold">
            Change Theme
          </Text>
          <Text className="text-neutral-800 dark:text-neutral-500 mt-1 text-sm">
            Switch to dark and light mode
          </Text>
        </View>
      </View>
      <View className="flex-row ">
        {OPTIONS.map(({ key, label }) => {
          const active = mode === key;
          return (
            <Pressable
              key={key}
              onPress={() => setMode(key)}
              className={`flex-1 items-center rounded-lg py-2 ${
                active ? "bg-white dark:bg-neutral-950" : ""
              }`}
            >
              <Text
                className={
                  active
                    ? "font-semibold text-black dark:text-white"
                    : "text-neutral-500"
                }
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
