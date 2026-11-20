import { useThemeStore } from "@/store/theme-store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatSettings() {
  const router = useRouter();
  const mode = useThemeStore(s=>s.mode)==="dark"?"white":"black";
  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      {/* header */}
      <View className="w-screen py-1 flex-row items-center">
        <TouchableOpacity
          className="h-14 w-14 px-3 flex justify-center items-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={mode} />
        </TouchableOpacity>

        <View>
            <Text className="font-bold dark:text-neutral-200 text-lg">ChatSettings</Text>
            <Text className="font-bold dark:text-neutral-500 text-neutral-600 text-sm">Manage your all chat related settings </Text>
        </View>
      </View>

      <View className="px-3">
        <Text className="text-xl font-bold mt-4 mx-1 py-2 dark:text-neutral-200">Chat Background</Text>
        <View className="w-full h-96 rounded-2xl bg-neutral-200 dark:bg-neutral-800"></View>
      </View>
    </SafeAreaView>
  );
}
