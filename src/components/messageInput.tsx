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
    ChatRoomStore.getState().handleSendMessage(text,userid,participantid);
    setText("");
  };

  return (
    <View className="w-full h-20">
      <Animated.View
        entering={FadeInDown.springify().damping(18).stiffness(140)}
        className="w-11/12 h-full bg-neutral-900 border border-neutral-800 mx-auto rounded-2xl flex flex-row overflow-hidden"
      >
        <TextInput
          value={text}
          placeholder="Enter Message"
          placeholderTextColor={"gray"}
          onChangeText={(text) => setText(text)}
          className="color-white px-4 h-full text-lg flex-1"
        />
        <View className="px-2 flex justify-center">
          <TouchableOpacity
            className="w-14 h-14 rounded-full justify-center items-center"
            onPress={handleSendMessage}
            disabled={!text}
          >
            <Ionicons name="send" size={25} color={text ? "gray" : "black"} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
