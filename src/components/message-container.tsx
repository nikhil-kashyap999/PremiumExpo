import { Text } from "react-native";
import { useEffect, useRef } from "react";
import { getMessages } from "@/db/queries";
import { useToast } from "@/store/toast-store";
import { useAuthStore } from "@/store/auth-store";
import { ChatRoomStore } from "@/store/chat-store";
import { getConversationId } from "@/utils/chat-store.utils";
import { useLoadingModel } from "@/store/loadingModal-store";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

export function MessagesContainer() {
  const userid = useAuthStore((s) => s.user?.id);
  const createToast = useToast((s) => s.createToast);
  const messages = ChatRoomStore((s) => s.messages);
  const participantid = useAuthStore((s) => s.participant?._id);
  const stopLoading = useLoadingModel((s) => s.stopLoadingModel);
  const setBulkMessages = ChatRoomStore((s) => s.setBulkMessags);
  const startLoading = useLoadingModel((s) => s.showLoadingModal);

  const listRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (!userid || !participantid) return;
    startLoading();
    getMessages(getConversationId(userid, participantid))
      .then((data) => {
        setBulkMessages(data);
        console.log(data);
      })
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
              <Text
                className={`${item.isReceived ? "bg-neutral-900" : "bg-neutral-800"} h-full max-w-72 justify-center rounded-xl px-3 py-2 flex items-center text-white`}
              >
                {item.textMsg}
              </Text>
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
