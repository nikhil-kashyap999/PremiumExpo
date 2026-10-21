export type IncomingMessageType = {
  senderid: string;
  receiverid: string;
  message: string;
  messageid: string;
};
export type TransmittingMessageType = Pick<
  IncomingMessageType,
  "receiverid" | "message" | "messageid"
>;
export type Status = "sending" | "sent" | "delivered" | "read" | "pending";

export type MessageStatusType = {
  messageid: string;
  receiverid: string;
  status: Status;
};