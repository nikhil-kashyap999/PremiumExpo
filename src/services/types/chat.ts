export type MsgType = {
  senderid: string;
  receiverid: string;
  message: string;
};

// server se aane wala payload (id aur createdAt optional, server bheje to use honge)
export type IncomingMsg = MsgType & {
  id?: string;
  createdAt?: number | string;
};