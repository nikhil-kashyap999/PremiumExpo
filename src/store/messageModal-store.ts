import { create } from "zustand";

type ModalProp = {
  message: string;
  isModalVisible: boolean;
  createMessage: (msg: string) => void;
  hideMessageModal: () => void;
};

export const useMessageModal = create<ModalProp>((set) => ({
  message: "",
  isModalVisible: false,
  createMessage: (msg?: string) => {
    set({ isModalVisible: true, message: msg });
  },
  hideMessageModal: () => {
    set({ isModalVisible: false });
  },
}));
