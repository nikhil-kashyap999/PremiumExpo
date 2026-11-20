import { useRef, useState } from "react";
import SectionItem from "./section-item";
import { Animated, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/store/theme-store";

const TRAVEL = 30;

export default function ThemeToggler() {
    const isDark = useTheme(s=>s.isDark);
    const toggleThem = useTheme(s=>s.toggleTheme);
  const x = useRef(new Animated.Value(isDark ? TRAVEL : 0)).current;

  const toggle = () => {
    const next = !isDark;
    toggleThem();
    Animated.timing(x, {
      toValue: next ? TRAVEL : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="bg-neutral-800 rounded-2xl mb-4 flex flex-row overflow-hidden">
      <SectionItem title="Theme" subtitle="Toggle app theme" icon={"light-mode"} disbaled={true}/>
      <View className="max-h-min p-3 flex justify-center">
        <TouchableOpacity
          onPress={toggle}
          activeOpacity={0.8}
          className="w-16 bg-neutral-950 rounded-2xl border border-neutral-700 justify-center p-1"
        >
          <Animated.View
            style={{ transform: [{ translateX: x }] }}
            className={`w-5 h-5 rounded-full ${
              isDark ? "bg-white" : "bg-neutral-500"
            }`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}