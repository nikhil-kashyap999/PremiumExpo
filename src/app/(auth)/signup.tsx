import CustomStatusBar from "@/components/status-bar";
import AvatarField from "@/components/ui/InputFields/AvatarField";
import InputField from "@/components/ui/InputFields/InputField";
import PasswordField from "@/components/ui/InputFields/PasswordField";
import AvatarModal from "@/components/ui/Modal/AvatarModal";
import useKeyboardVisible from "@/hooks/useKeyboardVisible";
import useSignupForm from "@/hooks/useSignupForm";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ErrorsType = {
  usernameError?: string;
  emailError?: string;
  avatarError?: string;
  passwordError?: string;
};

const SignUpScreen = () => {
  const router = useRouter();
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const isKeyboardVisible = useKeyboardVisible();
  const {
    handleSignUp,
    updateFormData,
    formData,
    errors,
    selectedAvatar,
    onSelectAvatar,
    isLoading,
  } = useSignupForm();

  const toLoginScreen = () => {
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      <CustomStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1">
          {/* Header */}
          <View className="mt-[50px] items-center px-6">
            <Text className="text-center text-3xl dark:text-white">
              Register
            </Text>
            <Text className="mt-2.5 text-center text-base text-gray-500">
              Create your account to continue
            </Text>
          </View>

          {/* Form */}
          <View className="mt-[50px] px-6">
            <InputField
              placeholder="Enter your username"
              value={formData.username}
              iconType="person"
              setValue={(value) => updateFormData("username", value)}
              valueError={errors.usernameError}
              setValueError={() => {}} // Handled by updateFormData
            />

            <InputField
              placeholder="Enter your email"
              value={formData.email}
              iconType="mail"
              setValue={(value) => updateFormData("email", value)}
              valueError={errors.emailError}
              setValueError={() => {}} // Handled by updateFormData
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AvatarField
              icon="image"
              selectedAvatar={selectedAvatar}
              setShowAvatarModal={setShowAvatarModal}
              error={errors.avatarError}
            />

            <PasswordField
              password={formData.password}
              setPassword={(value: string) => updateFormData("password", value)}
              isPasswordVisible={isPasswordVisible}
              passwordError={errors.passwordError}
              setIsPasswordVisible={setIsPasswordVisible}
              setPasswordError={() => {}} // Handled by updateFormData
            />

            <TouchableOpacity
              disabled={isLoading}
              onPress={handleSignUp}
              activeOpacity={0.8}
              className={`mt-10 flex-row items-center justify-center rounded-xl py-4 ${
                isLoading ? "bg-blue-600/70" : "bg-blue-600"
              }`}
            >
              {isLoading && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  className="mr-3"
                />
              )}
              <Text className="text-base font-bold text-white">
                {isLoading ? "Please wait..." : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Footer */}
      {!isKeyboardVisible && (
        <View className="mb-6 mt-auto flex-row items-center justify-center">
          <Text className="text-sm dark:text-white">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={toLoginScreen}>
            <Text className="text-sm font-semibold text-blue-500">Sign In</Text>
          </TouchableOpacity>
        </View>
      )}

      <AvatarModal
        isModalVisible={showAvatarModal}
        prevSelectedAvatar={selectedAvatar}
        onSelectAvatar={onSelectAvatar}
        onClose={() => setShowAvatarModal(false)}
      />
    </SafeAreaView>
  );
};
export default SignUpScreen;
