import {
  View,
  Text,
  Platform,
  StyleSheet,
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

type InputErrorType = {
  usernameFieldError?: string;
  passwordFieldError?: string;
};

const LoginScreen = () => {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const createMessage = useMessageModal((s) => s.createMessage);
  const [errors, setErrors] = useState<InputErrorType>({
    usernameFieldError: "",
    passwordFieldError: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const toSignupScreen = () => {
    router.replace("/(auth)/signup");
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
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View className="flex-1 justify-center">
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to your account to continue
            </Text>
          </View>

          <View style={styles.formContainer}>
            <InputField
              value={username}
              iconType={"person"}
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

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-blue-600 rounded-xl py-4 flex-row justify-center items-center"
            >
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  className="mr-3"
                />
              )}
              <Text className="text-white font-bold text-base">
                {loading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={toSignupScreen}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 0,
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBackground: {
    width: "auto",
    padding: 8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 25,
    letterSpacing: 20,
    fontWeight: "900",
    color: "gray", // Changed from neutral_300 to main text color
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "white", // Changed from neutral_300 to main text color
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "gray", // Changed from hardcoded #737373 to theme lightText
    textAlign: "center",
  },
  formContainer: {
    marginTop: 60,
    paddingHorizontal: 24,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "white", // Changed from hardcoded #737373
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
    color: "white", // Changed from hardcoded #737373
    fontSize: 14,
  },
  signUpText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "600",
  },
});
