import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black justify-center">
      <View className="w-screen px-2">
        <Text className="text-3xl text-neutral-600 font-bold text-center">Welcome Back</Text>
        <Text className="text-neutral-700 text-center font-semibold mt-1">Let's start to chat with your contacts</Text>
      </View>
    </SafeAreaView>
  );
}
