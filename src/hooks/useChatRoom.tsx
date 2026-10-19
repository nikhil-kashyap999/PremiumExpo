import { useAuthStore } from "@/store/auth-store";
import { ChatRoomStore } from "@/store/chat-store";
import { getConversationId } from "@/utils/chat-store.utils";

// ---------------------Responsiblities--------------------
// 1. Current Room ke Messages provide karna
// 2. Incoming Messages event ko listen karna

export default function useChatRoom() {
  const userid = useAuthStore((s) => s.user?.id);
  const participentid = useAuthStore((s) => s.participant?._id);

  const handleDeleteAllMessages = () => {
    if (!userid || !participentid) return;
    const cid = getConversationId(userid, participentid);
    ChatRoomStore.getState().deleteAllMessagesFromStorage(cid);
  };

  return { handleDeleteAllMessages };
}
