import {
  NotificationLabelType,
  useNotificationStore,
} from "@/store/notification-store";
import { useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";

const LABEL_CONFIG: Record<
  NotificationLabelType,
  { title: string; icon: string; accent: string }
> = {
  "invite notification": {
    title: "sent you an invite",
    icon: "👋",
    accent: "bg-blue-500",
  },
  "new message": {
    title: "sent you a message",
    icon: "💬",
    accent: "bg-green-500",
  },
};

export default function NotificationCard() {
  const duration = useNotificationStore((s) => s.duration);
  const onPress = useNotificationStore((s) => s.onPress);
  const userInfo = useNotificationStore((s) => s.userInfo);
  const hideNoti = useNotificationStore((s) => s.hideModal);
  const isVisible = useNotificationStore((s) => s.isModalVisible);
  const label = useNotificationStore((s) => s.NotificationLabel);

  const translateY = useRef(new Animated.Value(-120)).current;
  const config = LABEL_CONFIG[label];

  const hide = () => {
    Animated.timing(translateY, {
      toValue: -120,
      duration: 250,
      useNativeDriver: true,
    }).start(() => hideNoti());
  };

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(hide, duration);
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return;
  return (
    <Animated.View
      style={{ transform: [{ translateY }] }}
      className="absolute top-4 left-0 right-0 px-3 z-50"
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          onPress?.();
          hide();
        }}
        className="flex-row items-center bg-neutral-800 rounded-2xl p-3 bgne"
        style={{ boxShadow: "0 0 8px rgba(115,115,115,0.5)" }}
      >
        <View>
          <Image
            source={
              userInfo?.avatarUrl
                ? { uri: userInfo.avatarUrl }
                : require("@/assets/images/default-avatar.png")
            }
            className="w-11 h-11 rounded-full bg-neutral-600"
          />
          <View
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full items-center justify-center ${config.accent}`}
          >
            <Text className="text-[10px]">{config.icon}</Text>
          </View>
        </View>

        <View className="flex-1 ml-3">
          <Text className="text-white font-semibold" numberOfLines={1}>
            {userInfo?.username}
          </Text>
          <Text className="text-neutral-300 text-xs" numberOfLines={1}>
            {config.title}
          </Text>
        </View>

        <TouchableOpacity onPress={hide} hitSlop={10}>
          <Text className="text-neutral-400 text-lg">✕</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}
