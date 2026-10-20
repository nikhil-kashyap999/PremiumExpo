import { create } from "zustand";
import * as Crypto from "expo-crypto";
import { useToast } from "./toast-store";
import { NewMessage } from "@/db/schema";
import { useAuthStore } from "./auth-store";
import { sendMessage } from "@/socket/emitters";
import { useLoadingModel } from "./loadingModal-store";
import { IncomingMessageType, Status } from "@/types/BareMessageType";
import { deleteAllMessages, saveMessages } from "@/db/queries";
import { getConversationId, toMillis } from "@/utils/chat-store.utils";

type DefualtProp = {
  messages: NewMessage[];
  cleanMessages: () => void;
  setMessage: (msg: NewMessage) => void;
  setBulkMessags: (msg: NewMessage[]) => void;
  handleIncomingMessage: (msg: IncomingMessageType) => void;
  deleteAllMessagesFromStorage: (cid: string) => Promise<void>;
  handleSendMessage: (msg: string, sid: string, rid: string) => void;
  updateMessageStatus: (msgid: string, status: Status) => void;
};

export const ChatRoomStore = create<DefualtProp>((set, get) => ({
  messages: [],
  setMessage: (newMsg) =>
    set((state) => ({ messages: [...state.messages, newMsg] })),
  cleanMessages: () => {
    set({ messages: [] });
  },
  setBulkMessags: (msg) => set({ messages: msg ?? [] }),
  handleSendMessage: (text, userid, participentid) => {
    if (!text.trim()) {
      return;
    }
    const msgId = Crypto.randomUUID();
    const msgObj: NewMessage = {
      id: msgId,
      conversationId: getConversationId(userid, participentid),
      senderId: userid,
      isReceived: false,
      textMsg: text,
      createdAt: toMillis(),
      status: "pending",
    };
    get().setMessage(msgObj);
    sendMessage({
      receiverid: participentid,
      message: text,
      messageid: msgId,
    });
    saveMessages(msgObj, { isIncoming: false });
  },

  handleIncomingMessage: async (msg) => {
    try {
      const msgObj: NewMessage = {
        id: msg.messageid ?? Crypto.randomUUID(),
        conversationId: getConversationId(msg.senderid, msg.receiverid),
        senderId: msg.senderid,
        isReceived: true,
        textMsg: msg.message,
        createdAt: toMillis(),
        status: "sent",
      };
      if (msg.senderid === useAuthStore.getState().participant?._id) {
        ChatRoomStore.getState().setMessage(msgObj);
      }
      await saveMessages(msgObj, { isIncoming: true });
    } catch (e) {
      console.error("Failed to save incoming message:", e);
    }
  },
  deleteAllMessagesFromStorage: async (conversationId) => {
    useLoadingModel.getState().showLoadingModal();
    try {
      const res = await deleteAllMessages(conversationId);
      get().setBulkMessags([]);
      if (res.changes > 0) useToast.getState().createToast("Messages Deleted");
    } catch (error) {
      useToast.getState().createToast("Faild to delete messages");
    } finally {
      useLoadingModel.getState().stopLoadingModel();
    }
  },
  updateMessageStatus: (msgid, status) => (set(s => {
    return { messages: s.messages.map(m => m.id === msgid ? { ...m, status } : m) }
  }))
}));
