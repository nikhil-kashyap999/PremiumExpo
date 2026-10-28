import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputField from "@/components/ui/InputFields/InputField";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { validateEmail } from "@/utils/SignupForm.utils";
import { axiosApi } from "@/services/axiosApi";
import { useToast } from "@/store/toast-store";
import axios from "axios";
import { TokenStorage } from "@/utils/secure-storage.utils";
import ResetPasswordScreen from "@/components/ui/ForgetPasswordScreen/ResetPasswordScreen";

type StatusType = "success" | "failed" | "normal";

export default function ForgetPassword() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const createToast = useToast((s) => s.createToast);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType>("normal");

  const handleSubmissition = async () => {
    setError("");
    if (!email.trim()) {
      setError("Provide email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Provide a Valid email");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axiosApi.post("/api/auth/forget-password", {
        Email: email,
      });
      console.log(data);
      await TokenStorage.setAccessToken(data?.token);
      createToast(data.message);
      if (data.success) setStatus("success");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        createToast(e.response?.data.message ?? "Failed to get recovery code");
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") return <ResetPasswordScreen />;
  return (
    <View className="h-screen w-screen bg-black">
      <View className="w-full px-2 py-1">
        <TouchableOpacity
          className="h-14 w-14 rounded-full px-3 flex justify-center items-center bg-neutral-800"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="w-full px-3 flex-1 mt-5 items-center">
        <View className="w-full rounded-2xl p-3">
          <View className="mb-6">
            <Text className="text-neutral-300 font-bold">
              Provide your registered Email
            </Text>
            <Text className="text-sm text-neutral-500">
              A recovery otp will be sent to your registered email
            </Text>
          </View>
          <InputField
            placeholder="abc@email.com"
            value={email}
            setValue={setEmail}
            customStyles="mb-0"
            valueError={error}
          />
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 flex-row justify-center items-center"
            onPress={handleSubmissition}
          >
            {loading && (
              <ActivityIndicator size="small" color="white" className="mr-3" />
            )}
            <Text className="text-white font-bold text-base">
              {loading ? "Please wait..." : "Get recovery code"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
