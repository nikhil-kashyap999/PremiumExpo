import axios from "axios";
import { create } from "zustand";
import { Alert } from "react-native";
import { SOCKET_URL } from "@/config/socket";
import { axiosApi } from "@/services/axiosApi";
import { TokenStorage } from "@/utils/secure-storage";
import { SignUpFormDataType } from "@/hooks/useSignupForm";
import { ContactType } from "@/hooks/useFetchContacts";

type User = { id: string; username: string; email: string; avatarUrl: string };

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  participant?: ContactType | null;
  setParticipant: (participant: ContactType) => void;
  login: (username: string, password: string) => Promise<string | undefined>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  signup: (
    formData: SignUpFormDataType,
  ) => Promise<{ isSuccess: boolean; message: string } | undefined>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  participant: null,

  setParticipant: (participant: ContactType) =>
    set({ participant: participant }),

  login: async (
    username: string,
    password: string,
  ): Promise<string | undefined> => {
    try {
      const { data } = await axios.post(
        `${SOCKET_URL}/api/auth/login`,
        {
          username,
          password,
        },
        { headers: { "X-Client-Type": "mobile" } },
      );
      const user: User = {
        id: data.user._id,
        username: data.user.username,
        email: data.user.email,
        avatarUrl: data.user.avatarUrl,
      };
      await TokenStorage.setTokens(data.accessToken, data.refreshToken);
      set({ user: user, isAuthenticated: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data?.message;
      }
    }
  },

  logout: async () => {
    try {
      await axiosApi.post("/api/auth/logout");
      await TokenStorage.clearTokens();
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Alert.alert(
          err.response?.data.message || "Error while in logout process",
        );
      }
    }
  },

  restoreSession: async () => {
    try {
      const token = await TokenStorage.getAccessToken();
      if (!token) {
        set({ isLoading: false });
        return;
      }
      const { data } = await axiosApi.get("/api/auth/me");
      const user: User = {
        id: data.data._id,
        username: data.data.username,
        email: data.data.email,
        avatarUrl: data.data.avatarUrl,
      };
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  signup: async (
    formData: SignUpFormDataType,
  ): Promise<{ isSuccess: boolean; message: string } | undefined> => {
    try {
      const { data } = await axios.post(
        `${SOCKET_URL}/api/auth/register`,
        formData,
        { headers: { "X-Client-Type": "mobile" } },
      );
      await TokenStorage.setTokens(data.accessToken, data.refreshToken);
      return { isSuccess: true, message: data.message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { isSuccess: false, message: error.response?.data?.message };
      }
    }
  },
}));
