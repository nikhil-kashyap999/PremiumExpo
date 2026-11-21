import logo from "@/assets/images/logo.png";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthSaplash() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center pb-12 dark:bg-black">
      <Image source={logo} className="w-[130px] h-[120px] mb-5" />
      {/* Title */}
      <Text className="text-2xl dark:color-[#E0E0E0] color-black tracking-[25px] font-bold mb-4">
        PREMIUM
      </Text>

      {/* Authenticating */}
      <Text className="dark:color-neutral-200 color-neutral-700 mb-5">
        Authenticating{dots}
      </Text>

      {/* Footer */}
      <View className="absolute bottom-6 items-center">
        <Text className="text-sm color-neutral-400 mb-1">Version v0.0.1</Text>
        <Text className="text-sm color-neutral-400">
          Developed By <Text style={{ fontWeight: "700" }}>BlackCode</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}