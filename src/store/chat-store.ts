import { create } from "zustand";
import * as Crypto from "expo-crypto";
import { NewMessage } from "@/db/schema";
import { deleteAllMessages, saveMessages } from "@/db/queries";
import { sendMessage } from "@/socket/emitters";
import { getConversationId, toMillis } from "@/utils/chat-store.utils";
import { IncomingMsg } from "@/services/types/chat";
import { useToast } from "./toast-store";
import { useLoadingModel } from "./loadingModal-store";
import { useAuthStore } from "./auth-store";

type DefualtProp = {
  messages: NewMessage[];
  cleanMessages: () => void;
  setMessage: (msg: NewMessage) => void;
  setBulkMessags: (msg: NewMessage[]) => void;
  handleIncomingMessage: (msg: IncomingMsg) => void;
  deleteAllMessagesFromStorage: (cid: string) => Promise<void>;
  handleSendMessage: (msg: string, sid: string, rid: string) => void;
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
    const msgObj: NewMessage = {
      id: Crypto.randomUUID(),
      conversationId: getConversationId(userid, participentid),
      senderId: userid,
      isReceived: false,
      textMsg: text,
      createdAt: toMillis(),
      status: "sent",
    };
    get().setMessage(msgObj);
    sendMessage({
      receiverid: participentid,
      message: text,
    });
    saveMessages(msgObj, { isIncoming: false });
  },

  handleIncomingMessage: (msg) => {
    try {
      const msgObj: NewMessage = {
        id: Crypto.randomUUID(),
        conversationId: getConversationId(msg.senderid, msg.receiverid),
        senderId: msg.senderid,
        isReceived: true,
        textMsg: msg.message,
        createdAt: toMillis(),
        status: "sent",
      };
      if (msg.senderid !== useAuthStore.getState().participant?._id) {
        console.log("Save backend message");
        saveMessages(msgObj, { isIncoming: true });
        return;
      }
      saveMessages(msgObj, { isIncoming: true });
      ChatRoomStore.getState().setMessage(msgObj);
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
}));
