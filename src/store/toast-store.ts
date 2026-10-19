import { create } from "zustand";

type ToastProp = {
  message: string;
  isVisible: boolean;
  createToast: (message?:string) => void;
  hideToast: () => void;
};
export const useToast = create<ToastProp>((set) => ({
  message: "",
  isVisible: false,
  hideToast: () => {
    set({ isVisible: false });
  },
  createToast: (message?: string) => {
    set({ isVisible: true, message });
  },
}));
