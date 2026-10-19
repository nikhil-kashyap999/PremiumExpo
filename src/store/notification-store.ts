import { create } from "zustand";

export type NotificationLabelType = "invite notification" | "new message";

export type UserInfoType = {
  username: string;
  avatarUrl?: string | null;
};

type DefaultProp = {
  userInfo: UserInfoType | null;
  isModalVisible: boolean;
  showModal: (
    user: UserInfoType,
    NotificationType: NotificationLabelType,
  ) => void;
  hideModal: () => void;
  onPress?: () => void;
  duration: number;
  NotificationLabel: NotificationLabelType;
};

export const useNotificationStore = create<DefaultProp>((set) => ({
  userInfo: null,
  duration: 4000,
  isModalVisible: false,
  NotificationLabel: "invite notification",
  showModal: (user, NFtype) => {
    set({ isModalVisible: true, userInfo: user, NotificationLabel: NFtype });
  },
  hideModal: () => {
    set({ isModalVisible: false, userInfo: null });
  },
}));
