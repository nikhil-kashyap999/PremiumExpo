import React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import { View, Text, TouchableOpacity } from "react-native";
import { useThemeStore } from "@/store/theme-store";

type PropType = {
  icon?: any;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isLast?: boolean;
  disbaled?: boolean;
};

export default function SectionItem({
  icon,
  title,
  subtitle,
  onPress,
  isLast = false,
  disbaled = false,
}: PropType) {
  const mode = useThemeStore(s=>s.mode);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disbaled}
      className={`flex-row items-center rounded-2xl p-4 flex-1 ${!isLast && "border-b-neutral-600"}`}
    >
      <View className="w-10 h-10 rounded-2xl justify-center items-center mr-4">
        <Icon name={icon} size={25} color={mode==="dark"?"white":"black"} />
      </View>
      <View className="flex-1">
        <Text className="font-bold color-black dark:color-white">{title}</Text>
        {subtitle && (
          <Text className="color-neutral-500 mt-1 text-sm">{subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
