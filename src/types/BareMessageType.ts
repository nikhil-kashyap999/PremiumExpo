export type IncomingMessageType = {
  senderid: string;
  receiverid: string;
  message: string;
};
export type TransmittingMessageType = Pick<
  IncomingMessageType,
  "receiverid" | "message"
>;
