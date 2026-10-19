import axios from "axios";
import { create } from "zustand";
import { useToast } from "./toast-store";
import { axiosApi } from "@/services/axiosApi";

type DefaultProp = {
  sendInvite: (receiverId: string) => Promise<void>;
};
const url = "/api/user/invite-send";

export const useExploreStore = create<DefaultProp>(() => ({
  sendInvite: async (receiverId) => {
    try {
      const res = await axiosApi.post("/api/user/invite-send");
      return res.data?.message;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data.message);
        useToast.getState().createToast(e.response?.data.message ?? "Error while sending invite");
      }
    }
  },
}));
