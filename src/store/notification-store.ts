import { create } from "zustand";

export type NotificationLabelType = "invite notification" | "new message";

export type UserInfoType = {
  username: string;
  avatarUrl: string;
};

type DefaultProp = {
  userInfo: UserInfoType | null;
  isModalVisible: boolean;
  showModal: (user: UserInfoType) => void;
  hideModal: () => void;
  onPress?: () => void;
  duration:number;
  NotificationLabel: NotificationLabelType;
};

export const useNotificationStore = create<DefaultProp>((set) => ({
  userInfo: null,
  duration:4000,
  isModalVisible: false,
  showModal: (user) => {
    set({ isModalVisible: true, userInfo: user });
  },
  hideModal: () => {
    set({ isModalVisible: false, userInfo: null });
  },
  NotificationLabel:"invite notification",
}));
