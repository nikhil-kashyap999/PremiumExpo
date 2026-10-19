import { create } from "zustand";

type MessagePayloadType = {
  senderid: string;
  receiverid: string;
  message: string;
};

type Status = "connecting" | "connected" | "disconnected";
export const useSocketStore = create<{
  status: Status;
  setStatus: (s: Status) => void;
}>((set) => ({
  status: "disconnected",
  setStatus: (status) => {
    set({ status });
  },
}));
