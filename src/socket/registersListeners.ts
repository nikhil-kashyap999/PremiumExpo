import { SERVER_EVENTS } from "./events";
import { Socket } from "socket.io-client";
import { useAuthStore } from "@/store/auth-store";
import { ChatRoomStore } from "@/store/chat-store";
import { useSocketStore } from "@/store/socketStore";
import { ContactStore } from "@/store/contacts-store";
import { IncomingMessageType } from "@/types/BareMessageType";
import { useNotificationStore, UserInfoType } from "@/store/notification-store";

export function registerSocketListners(socket: Socket) {
  const onConnect = () => {
    console.log("connected : ", socket.id);
    useSocketStore.getState().setStatus("connected");
  };
  const onDisconnect = () => {
    useSocketStore.getState().setStatus("disconnected");
  };
  const onNewMessage = (msg: IncomingMessageType) => {
    if (!msg?.senderid || !msg?.receiverid || typeof msg.message !== "string") {
      console.warn("Invalid message payload:", msg);
      return;
    }
    // if sender is not the one whom user chatting with show notification
    if (msg.senderid !== useAuthStore.getState().participant?._id) {
      const contact = ContactStore.getState().getContact(msg.senderid);
      useNotificationStore.getState().showModal(
        {
          username: contact?.username ?? "username",
          avatarUrl: contact?.avatarUrl ?? null,
        },
        "new message",
      );
    }
    ChatRoomStore.getState().handleIncomingMessage(msg);
  };
  const onPresence = (contact: { userid: string; isActive: boolean }) => {
    ContactStore.getState().updateContactPresence(contact);
  };
  const onInviteNotification = (obj: UserInfoType) => {
    useNotificationStore
      .getState()
      .showModal(
        { username: obj.username, avatarUrl: obj.avatarUrl },
        "invite notification",
      );
  };
  const onMessageAck = async (payload: {
    messageid: string;
    receiverid: string;
  }) => {
    ChatRoomStore.getState().updateMessageStatus(payload.messageid, "sent");
  }

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on(SERVER_EVENTS.MESSAGE_NEW, onNewMessage);
  socket.on(SERVER_EVENTS.PRESENCE_UPDATE, onPresence);
  socket.on(SERVER_EVENTS.INVITE_NOTIFICATION, onInviteNotification);
  socket.on(SERVER_EVENTS.MESSAGE_ACK, onMessageAck);

  socket.on("connect_error", async (err) => {
    console.log(err);
  });

  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.off(SERVER_EVENTS.MESSAGE_NEW, onNewMessage);
    socket.off(SERVER_EVENTS.PRESENCE_UPDATE, onPresence);
    socket.off(SERVER_EVENTS.INVITE_NOTIFICATION, onInviteNotification);
    socket.off(SERVER_EVENTS.MESSAGE_ACK, onMessageAck);

    socket.off("connect_error", async (err) => {
      console.log(err);
    });
  };
}
