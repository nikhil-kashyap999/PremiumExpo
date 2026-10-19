import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const APP_NAME = "SendME";
const TAGLINE = "Stay connected with the people who matter, in real time.";

enum Paths {
  login = "/(auth)/login",
  register = "/(auth)/signup",
}

export default function AuthScreen() {
  const router = useRouter();

  const handleNavigation = (path: Paths): void => {
    router.push(path);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      {/* Brand section */}
      <Animated.View
        entering={FadeInUp.duration(700)}
        className="flex-1 items-center justify-center px-8"
      >
        {/* <View className="h-24 w-24 items-center justify-center rounded-3xl border border-blue-400/20 bg-sky-400/10">
          <Ionicons name="chatbubble-ellipses" size={44} color="#3b82f6" />
        </View> */}

        <Text className="mt-8 text-4xl font-extrabold tracking-tight text-white">
          {APP_NAME}
        </Text>
        <Text className="mt-3 text-center text-base leading-6 text-neutral-400">
          {TAGLINE}
        </Text>
      </Animated.View>

      {/* Actions */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(700)}
        className="px-6 pb-6"
      >
        <TouchableOpacity
          activeOpacity={0.85}
          accessibilityRole="button"
          className="mb-3 w-full items-center rounded-2xl bg-blue-500 py-4"
          onPress={() => handleNavigation(Paths.register)}
        >
          <Text className="text-lg font-bold text-black">Create account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          accessibilityRole="button"
          className="w-full items-center rounded-2xl border border-neutral-800 bg-neutral-900 py-4"
          onPress={() => handleNavigation(Paths.login)}
        >
          <Text className="text-lg font-bold text-white">Log in</Text>
        </TouchableOpacity>

        <Text className="mt-6 px-4 text-center text-xs leading-5 text-neutral-500">
          By continuing, you agree to our{" "}
          <Text className="text-neutral-300">Terms of Service</Text> and{" "}
          <Text className="text-neutral-300">Privacy Policy</Text>.
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}
