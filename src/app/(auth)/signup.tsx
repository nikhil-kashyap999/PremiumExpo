import CustomStatusBar from "@/components/status-bar";
import AvatarField from "@/components/ui/InputFields/AvatarField";
import InputField from "@/components/ui/InputFields/InputField";
import PasswordField from "@/components/ui/InputFields/PasswordField";
import AvatarModal from "@/components/ui/Modal/AvatarModal";
import useSignupForm from "@/hooks/useSignupForm";
import { useMessageModal } from "@/store/messageModal-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
  const createMessage = useMessageModal((s) => s.createMessage);
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
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
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View className="flex-1">
          <View style={styles.header}>
            <Text className="text-center text-3xl text-white">Register</Text>
            <Text style={styles.subtitle}>Create your account to continue</Text>
          </View>

          <View style={styles.formContainer}>
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
              // setError={setErrors}
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
              className="bg-blue-600 rounded-xl py-4 flex-row justify-center items-center mt-10"
            >
              {isLoading && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  className="mr-3"
                />
              )}
              <Text className="text-white font-bold text-base">
                {isLoading ? "Please wait..." : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={toLoginScreen}>
          <Text style={styles.signUpText}>Sign In</Text>
        </TouchableOpacity>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 24,
  },

  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  formContainer: {
    marginTop: 50,
    paddingHorizontal: 24,
  },

  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 24,
  },
  footerText: {
    color: "white",
    fontSize: 14,
  },
  signUpText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    width: "100%",
    height: 0.02,
    backgroundColor: "gray",
  },
});
