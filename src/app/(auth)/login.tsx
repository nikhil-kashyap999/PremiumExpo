import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import CustomStatusBar from "@/components/status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/ui/InputFields/InputField";
import PasswordField from "@/components/ui/InputFields/PasswordField";
import { useAuthStore } from "@/store/auth-store";
import { useMessageModal } from "@/store/messageModal-store";
import { useRouter } from "expo-router";
import axios from "axios";
import { useToast } from "@/store/toast-store";

type InputErrorType = {
  usernameFieldError?: string;
  passwordFieldError?: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const createToast = useToast((s) => s.createToast);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const createMessage = useMessageModal((s) => s.createMessage);
  const [errors, setErrors] = useState<InputErrorType>({
    usernameFieldError: "",
    passwordFieldError: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const handleNavigation = {
    toSingup: () => router.replace("/(auth)/signup"),
    toForgetPassword: () => router.push("/(auth)/forget-password"),
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrors({ usernameFieldError: "", passwordFieldError: "" });
    try {
      if (!username && !password) {
        setErrors({
          usernameFieldError: "Username is required",
          passwordFieldError: "Password is required",
        });
        return;
      }
      if (!username) {
        setErrors({ usernameFieldError: "Username is required" });
        return;
      }
      if (!password) {
        setErrors({ passwordFieldError: "Password is required" });
        return;
      }
      const resError = await login(username, password);
      if (resError) createMessage(resError);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        createToast(e.response?.data.message ?? "Falid to sent request");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center dark:bg-black">
      <CustomStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center">
          {/* Header */}
          <View className="items-center px-6">
            <Text className="mb-2 text-[22px] font-semibold dark:text-white text-black">
              Welcome Back
            </Text>
            <Text className="text-center text-base text-gray-500">
              Sign in to your account to continue
            </Text>
          </View>

          {/* Form */}
          <View className="mt-[60px] px-6">
            <InputField
              value={username}
              iconType="person"
              setValue={setUsername}
              placeholder="Enter your username"
              valueError={errors.usernameFieldError}
            />

            <PasswordField
              password={password}
              setPassword={setPassword}
              isPasswordVisible={isPasswordVisible}
              passwordError={errors.passwordFieldError}
              setIsPasswordVisible={setIsPasswordVisible}
            />

            <TouchableOpacity
              className="mb-6 self-end"
              onPress={handleNavigation.toForgetPassword}
            >
              <Text className="text-sm font-semibold dark:text-white text-black">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
              className={`flex-row items-center justify-center rounded-xl py-4 ${
                loading ? "bg-blue-600/70" : "bg-blue-600"
              }`}
            >
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  className="mr-3"
                />
              )}
              <Text className="text-base font-bold text-white">
                {loading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View className="mb-6 mt-auto flex-row items-center justify-center">
        <Text className="text-sm dark:text-white text-black">
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={handleNavigation.toSingup}>
          <Text className="text-sm font-semibold text-blue-500">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
