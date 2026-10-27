import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputField from "@/components/ui/InputFields/InputField";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

type StatusType = "success" | "failed" | "normal";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType>("normal");
  const goBack = () => {
    router.back();
  };
  const onClick = () => {
    setLoading(true);
    setTimeout(() => {
      setStatus("success");
    }, 5000);
  };

  if (status === "success") return <PasswordAndOtpModule />;
  return (
    <View className="h-screen w-screen bg-black">
      <View className="w-full px-2 py-1">
        <TouchableOpacity
          className="h-14 w-14 rounded-full px-3 flex justify-center items-center bg-neutral-700 "
          onPress={goBack}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="w-full px-3 flex-1 justify-center items-center">
        <View className="w-full bg-neutral-900 rounded-2xl border border-neutral-700 p-2">
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
          />
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 flex-row justify-center items-center"
            onPress={onClick}
          >
            {loading && (
              <ActivityIndicator size="small" color="white" className="mr-3" />
            )}
            <Text className="text-white font-bold text-base">
              {loading ? "Please wait..." : "Get recovery otp"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function PasswordAndOtpModule() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <View className="h-screen w-screen bg-black">
      <View className="w-full px-3 flex-1 justify-center items-center">
        <View className="w-full bg-neutral-900 rounded-2xl border border-neutral-700 p-4">
          <View className="mb-6">
            <Text className="text-neutral-300 font-bold">
              Provide with Recovery and New Password
            </Text>
            <Text className="text-sm text-neutral-500">
              Enter recovery otp sent to your registe email and new password
            </Text>
          </View>

          <InputField placeholder="OTP" value="" setValue={() => {}} />
          <InputField placeholder="New Password" value="" setValue={() => {}} />
          <TouchableOpacity className="bg-blue-600 rounded-xl py-4 flex-row justify-center items-center">
            {loading && (
              <ActivityIndicator size="small" color="white" className="mr-3" />
            )}
            <Text className="text-white font-bold text-base">
              {loading ? "Please wait..." : "Set your password"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
