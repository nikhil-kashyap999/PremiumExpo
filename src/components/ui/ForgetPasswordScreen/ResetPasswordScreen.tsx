import { axiosApi } from "@/services/axiosApi";
import { useToast } from "@/store/toast-store";
import { TokenStorage } from "@/utils/secure-storage.utils";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Animated from "react-native-reanimated";
import OtpInput from "../InputFields/OTPInputField";
import InputField from "../InputFields/InputField";
import SlideUpView from "./SlideUpView";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [OTP, setOTP] = useState<string>("");
  const createToast = useToast((s) => s.createToast);
  const [loading, setLoading] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmissition = async () => {
    if (!OTP || !newPassword) return;
    try {
      setLoading(true);
      const { data } = await axiosApi.post("/api/auth/reset-password", {
        OTP,
        newPassword,
      });
      createToast(data.message);
      await TokenStorage.clearAccessToken();
      if (data.success) router.replace("/(auth)/login");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        createToast(e.response?.data.message ?? "Falied to submit request");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 h-screen w-screen bg-black"
    >
      <View className="w-full px-3 flex-1 items-center mt-16">
        {/* Poora card niche se slide-up hoga */}
        <SlideUpView>
          <View className="mb-6">
            <Text className="text-neutral-300 font-bold">
              Provide with Recovery and New Password
            </Text>
            <Text className="text-sm text-neutral-500">
              Enter recovery otp sent to your registered email and new password
            </Text>
          </View>

          {/* Inner modules ek ek karke upar aayenge */}
          <Animated.View className="px-1 mb-4">
            <Text className="mb-2 text-xl text-white">Enter OTP</Text>
            <OtpInput
              length={6}
              autoFocus
              onChange={setOTP}
              onComplete={(c) => console.log(c)}
            />
          </Animated.View>

          <Animated.View>
            <InputField
              placeholder="New Password"
              value={newPassword}
              setValue={setNewPassword}
            />
          </Animated.View>

          <Animated.View>
            <TouchableOpacity
              className="bg-blue-600 rounded-xl py-4 flex-row justify-center items-center"
              onPress={handleSubmissition}
            >
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  className="mr-3"
                />
              )}
              <Text className="text-white font-bold text-base">
                {loading ? "Please wait..." : "Set your password"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </SlideUpView>
      </View>
    </KeyboardAvoidingView>
  );
}
