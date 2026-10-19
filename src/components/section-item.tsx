import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

type PropType = {
  icon?: any;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isLast?: boolean;
};

export default function SectionItem({
  icon,
  title,
  subtitle,
  onPress,
  isLast = false,
}: PropType) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center rounded-2xl p-4 ${!isLast && "border-b-neutral-600"}`}
    >
      <View className="w-10 h-10 rounded-2xl justify-center items-center mr-4">
        <Icon name={icon} size={25} color={"white"} />
      </View>
      <View className="flex-1">
        <Text className="font-bold color-white">{title}</Text>
        {subtitle && (
          <Text className="color-neutral-500 mt-1 text-sm">{subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
