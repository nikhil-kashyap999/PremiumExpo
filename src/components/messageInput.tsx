import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ChatRoomStore } from "@/store/chat-store";
import { useAuthStore } from "@/store/auth-store";

export default function MessageInput() {
  const [text, setText] = useState<string>("");
  const userid = useAuthStore((s) => s.user?.id);
  const participantid = useAuthStore((s) => s.participant?._id);

  const handleSendMessage = () => {
    if (!text.trim() || !userid || !participantid) return;
    ChatRoomStore.getState().handleSendMessage(text, userid, participantid);
    setText("");
  };

  return (
    <View className="w-full relative h-24 mb-5 items-center justify-center">
      <View className="w-full h-20">
        <Animated.View
          entering={FadeInDown.springify().damping(18).stiffness(140)}
          className="w-full h-full mx-auto rounded-2xl flex flex-row gap-2 overflow-hidden px-2"
        >
          <TextInput
            value={text}
            placeholder="Enter Message"
            placeholderTextColor={"gray"}
            onChangeText={(text) => setText(text)}
            className="color-white px-4 h-auto text-lg flex-1 bg-neutral-700 border border-neutral-600 my-2 rounded-full"
          />
          <View className="flex justify-center">
            <TouchableOpacity
              className="w-14 h-14 rounded-full justify-center items-center bg-neutral-700"
              onPress={handleSendMessage}
              disabled={!text}
            >
              <Ionicons name="send" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
