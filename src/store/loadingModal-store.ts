import { create } from "zustand";

type LoadingModelProp = {
  label?: string;
  isVisible: boolean;
  showLoadingModal: (label?:string) => void;
  stopLoadingModel: () => void;
};

export const useLoadingModel = create<LoadingModelProp>((set) => ({
  isVisible: false,
  showLoadingModal: (label) => {
    set({ isVisible: true, label });
  },
  stopLoadingModel: () => {
    set({ isVisible: false });
  },
}));
