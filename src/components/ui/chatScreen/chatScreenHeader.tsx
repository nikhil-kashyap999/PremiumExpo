import useChatRoom from "@/hooks/useChatRoom";
import { ContactType } from "@/hooks/useFetchContacts";
import { useAuthStore } from "@/store/auth-store";
import { ChatRoomStore } from "@/store/chat-store";
import { useDropDown } from "@/store/dropDown-store";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function ChatScreenHeader({
  participant,
}: {
  participant: ContactType;
}) {
  const router = useRouter();
  const { handleDeleteAllMessages: onClearChat } = useChatRoom();
  const showDropDown = useDropDown((s) => s.showDropDown);
  const isActive = !!participant?.isActive;
  const progress = useSharedValue(isActive ? 1 : 0); // 0 = offline, 1 = online
  const pulse = useSharedValue(1);
  const removeParticipant = useAuthStore(s=>s.removeParticipant);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });

    // status change par halka "pop" effect
    pulse.value = withSequence(
      withTiming(0.4, { duration: 120 }),
      withTiming(1, { duration: 280 }),
    );
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ["#a3a3a3", "#38bdf8"], // neutral-400 -> sky-400
    ),
    opacity: pulse.value,
    transform: [{ scale: 0.95 + pulse.value * 0.05 }],
  }));

  const openMenu = () => {
    showDropDown([
      {
        id: "clear",
        label: "Clear Chat",
        destructive: true,
        onPress: () => {
          Alert.alert(
            "Clear chat?",
            "The action will clear all your conversation with this contact",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Clear",
                style: "destructive",
                onPress: onClearChat,
              },
            ],
          );
        },
      },
    ]);
  };
  const back = () => {
    removeParticipant();
    router.back();
  };
  return (
    <View className="w-screen max-h-20 items-center flex-row justify-between px-2 mb-3">
      <TouchableOpacity
        className="h-14 w-14 rounded-full px-3 flex justify-center items-center bg-neutral-700 "
        onPress={back}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View className="h-full flex-1 justify-center py-1 overflow-x-hidden">
        <View className="self-center flex-row items-center rounded-full px-2 py-1 bg-neutral-700 max-w-[80%]">
          <View className="w-14 h-14 bg-black items-center justify-center rounded-full shrink-0">
            <Image
              source={{ uri: participant?.avatarUrl }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
              contentFit="cover"
              placeholder={require("@/assets/images/default-avatar.png")}
              transition={200}
            />
          </View>

          <View className="shrink ml-2 mr-1 justify-center pr-2">
            <Text
              className="text-stone-200 font-bold text-center"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {participant.username ?? "Username"}
            </Text>
            <Animated.Text
              className="text-center text-sm font-bold"
              style={animatedStyle}
            >
              {isActive ? "Online" : "Offline"}
            </Animated.Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="h-14 w-14 rounded-full px-3 flex justify-center items-center bg-neutral-700"
        onPress={openMenu}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
