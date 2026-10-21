export type IncomingMessageType = {
  senderid: string;
  receiverid: string;
  message: string;
  messageid: string;
  createdAt:number|string;
};
export type TransmittingMessageType = Pick<
  IncomingMessageType,
  "receiverid" | "message" | "messageid" | "createdAt"
>;
export type Status = "sending" | "sent" | "delivered" | "read" | "pending";

export type MessageStatusType = {
  messageid: string;
  receiverid: string;
  status: Status;
};