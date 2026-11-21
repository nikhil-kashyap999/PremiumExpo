export type IncomingMessageType = {
  message: string;
  senderid: string;
  messageid: string;
  receiverid: string;
  conversationId?: string;
  createdAt: number | string;
};
export type TransmittingMessageType = Pick<
  IncomingMessageType,
  "receiverid" | "message" | "messageid" | "createdAt"
>;
// export type Status = "sending" | "sent" | "delivered" | "read" | "pending";
export type Status = "Pending" | "Delivered" | "Seen" | "Sent" | "Error";

export type MessageStatusType = {
  messageid: string;
  receiverid: string;
  status: Status;
};