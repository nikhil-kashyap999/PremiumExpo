import { Text, View } from "react-native";
import { useEffect, useRef } from "react";
import { getMessages } from "@/db/queries";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "@/store/toast-store";
import { useAuthStore } from "@/store/auth-store";
import { ChatRoomStore } from "@/store/chat-store";
import { getConversationId } from "@/utils/chat-store.utils";
import { useLoadingModel } from "@/store/loadingModal-store";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Status } from "@/types/BareMessageType";

export function MessagesContainer() {
  const userid = useAuthStore((s) => s.user?.id);
  const createToast = useToast((s) => s.createToast);
  const messages = ChatRoomStore((s) => s.messages);
  const participantid = useAuthStore((s) => s.participant?._id);
  const stopLoading = useLoadingModel((s) => s.stopLoadingModel);
  const setBulkMessages = ChatRoomStore((s) => s.setBulkMessags);
  const startLoading = useLoadingModel((s) => s.showLoadingModal);

  const listRef = useRef<FlatList | null>(null);

  const MessageStatus = ({ status }: { status?: Status }) => {
    switch (status) {
      case "sending":
        return <Ionicons name="time-outline" size={14} color="#9ca3af" />;
      case "sent":
        return <Ionicons name="checkmark" size={14} color="#9ca3af" />;
      case "delivered":
        return <Ionicons name="checkmark-done" size={14} color="#9ca3af" />;
      case "read":
        return <Ionicons name="checkmark-done" size={14} color="#38bdf8" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!userid || !participantid) return;
    startLoading();
    getMessages(getConversationId(userid, participantid))
      .then((data) => setBulkMessages(data))
      .catch((err) => createToast(err?.message ?? "Failed to load messages"))
      .finally(() => {
        stopLoading();
      });
  }, [userid, participantid]);

  return (
    <GestureHandlerRootView>
      <FlatList
        ref={listRef}
        data={messages ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const isMine = item.senderId === userid;
          return (
            <Animated.View
              entering={isMine ? FadeInRight : FadeInLeft}
              className={`w-full mb-4 flex flex-row ${isMine ? "justify-end" : "justify-start"}`}
            >
              <View
                className={`${item.isReceived ? "bg-neutral-900" : "bg-neutral-800"} max-w-72 flex-row items-end rounded-xl px-3 py-2`}
              >
                <Text className="text-white shrink">{item.textMsg}</Text>

                {isMine && (
                  <View className="ml-2 mb-0.5">
                    <MessageStatus status={item.status} />
                  </View>
                )}
              </View>
            </Animated.View>
          );
        }}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
        className="w-full px-4"
      />
    </GestureHandlerRootView>
  );
}
