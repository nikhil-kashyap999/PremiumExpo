import { CLIENT_EVENTS } from "./events";
import { socket } from "./socket";
import { MessageStatusType, TransmittingMessageType } from "@/types/BareMessageType";

export const sendMessage = (data: TransmittingMessageType) => {
  socket.emit(CLIENT_EVENTS.MESSAGE_SEND, data);
};
export const sendMessageStatus = (payload: MessageStatusType) => {
  socket.emit(CLIENT_EVENTS.MESSAGE_STATUS, payload);
};
