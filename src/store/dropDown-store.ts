import { create } from "zustand";

export type DropDownOptionType = {
  id: string;
  label: string;
  destructive?: boolean;
  onPress?: () => void;
};

type Prop = {
  isVisible: boolean;
  options: DropDownOptionType[];
  showDropDown: (options: DropDownOptionType[]) => void;
  hideDropDown: () => void;
};

export const useDropDown = create<Prop>((set) => ({
  isVisible: false,
  options: [],
  showDropDown: (options) => set({ options, isVisible: true }),
  hideDropDown: () => set({ isVisible: false }),
}));
