import { useLoadingModel } from "@/store/loadingModal-store";
import { useMessageModal } from "@/store/messageModal-store";
import { useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { isAxiosError } from "axios";
import { axiosApi } from "@/services/axiosApi";
import { TokenStorage } from "@/utils/secure-storage";
import { useToast } from "@/store/toast-store";

type Prop = { onVerify: () => void; length: number; autoSubmit: boolean };
const RESEND_SECONDS = 30;

const OtpVerification = ({ onVerify, length = 6, autoSubmit = true }: Prop) => {
  const router = useRouter();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const stopLoading = useLoadingModel((s) => s.stopLoadingModel);
  const setIsLoading = useLoadingModel((s) => s.showLoadingModal);
  const createMessage = useMessageModal((s) => s.createMessage);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [countDown, setCountdown] = useState<number>(0);
  const createToast = useToast((s) => s.createToast);
  const PRODUCTION_EMAIL = process.env.pEXPO_PUBLIC_PRODUCTION_EMAIL;

  const isComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
    // Auto focus on first input when component mounts
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Check if OTP is complete and autoSubmit is enabled
    if (autoSubmit && isComplete) {
      handleVerify();
    }
  }, [otp, autoSubmit]);

  useEffect(() => {
    if (countDown <= 0) return;

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countDown]);

  const handleChange = (text: string, index: number) => {
    // Only allow numbers
    if (/^[0-9]$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input if available
      if (index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      } else {
        // Close keyboard if last input
        Keyboard.dismiss();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index] !== "") {
        // Just clear the current box
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous and clear it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    setIsLoading();
    try {
      const otpValue = otp.join("");
      if (otpValue.length === length) {
        const res = await axiosApi.post("/api/auth/verify-otp", {
          OTP: String(otpValue),
        });
        await TokenStorage.clearTokens();
        router.replace("/(auth)/login");
        createMessage(res.data.message);
      }
    } catch (e) {
      if (isAxiosError(e)) {
        createMessage(e.response?.data?.message);
      }
    } finally {
      stopLoading();
    }
  };
  const handleOnResend = async () => {
    if (countDown > 0) return;

    setIsLoading();
    try {
      const res = await axiosApi.get("/api/auth/resend-otp");
      createToast(res.data.message ?? "We've sent you a new OTP.");
      setCountdown(RESEND_SECONDS);
    } catch (e) {
      if (isAxiosError(e)) {
        createMessage(e.response?.data.message ?? "Error while resending OTP");
      }
    }finally{stopLoading()}
  };
  return (
    <View className="h-full bg-black">
      <View className="h-[90%] flex items-center justify-center px-5">
        <Text className="mb-2 text-center text-2xl font-bold color-white">
          Enter Verification Code
        </Text>
        <Text className="mb-[30px] text-center text-base text-[#666]">
          We've sent a OTP to your Email
        </Text>

        <View className="mb-[30px] w-full flex-row justify-between">
          {Array(length)
            .fill(0)
            .map((_, index) => (
              <TextInput
                key={index}
                maxLength={1}
                selectTextOnFocus
                value={otp[index]}
                keyboardType="numeric"
                className="h-[55px] w-[45px] rounded-lg border-[1.5px] border-[#404040] text-center text-2xl font-bold color-white"
                testID={`otp-input-${index}`}
                onKeyPress={(e) => handleKeyPress(e, index)}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                onChangeText={(text) => handleChange(text, index)}
              />
            ))}
        </View>

        <TouchableOpacity
          className={`mb-[15px] w-full items-center rounded-lg px-10 py-3.5 ${
            isComplete ? "bg-neutral-900" : "bg-neutral-800"
          }`}
          onPress={handleVerify}
          disabled={!isComplete}
        >
          <Text className="text-base font-bold text-white">Verify</Text>
        </TouchableOpacity>

        <View className="flex-row p-2.5">
          <Text className="text-sm text-[#666]">Didn't receive code? </Text>

          <TouchableOpacity onPress={handleOnResend} disabled={countDown > 0}>
            <Text className="font-semibold text-white text-sm">
              {countDown > 0 ? `Resend OTP in ${countDown}s` : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-[50px] w-full rounded-lg p-3 bg-neutral-900">
          <View className="max-w-full flex-row items-center">
            <Entypo
              name="info-with-circle"
              size={13}
              color="gray"
              style={{ maxWidth: "30%" }}
            />
            <Text className="ml-2 text-[11px] italic text-[#808080]">
              Important
            </Text>
          </View>
          <Text className="mt-2 text-sm leading-5 text-neutral-400">
            Please check your email’s Spam or Junk folder for the OTP. It was
            sent from{" "}
            <Text className="font-bold text-[#519ad9]">
              {PRODUCTION_EMAIL ?? "marstech79@gmail.com"}
            </Text>
            .
          </Text>
          <View className="bg"></View>
        </View>
      </View>
    </View>
  );
};

export default OtpVerification;
