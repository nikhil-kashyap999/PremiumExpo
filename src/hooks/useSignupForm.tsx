import { useState } from "react";
import { AvatarType } from "@/utils/avatarsImages.utils";
import { ErrorsType } from "@/app/(auth)/signup";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@/store/toast-store";
import { useRouter } from "expo-router";
import { validateEmail } from "@/utils/SignupForm.utils";

export type SignUpFormDataType = {
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
};

export default function useSignupForm() {
  const [formData, setFormData] = useState<SignUpFormDataType>({
    username: "",
    password: "",
    email: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState<ErrorsType>({
    usernameError: "",
    emailError: "",
    passwordError: "",
    avatarError: "",
  });
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);
  const createToast = useToast((s) => s.createToast);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(null);


  const validateForm = () => {
    setErrors({});
    if (
      !formData.username.trim() &&
      !selectedAvatar &&
      !formData.email.trim() &&
      !formData.password.trim()
    ) {
      setErrors({
        usernameError: "Username is required",
        avatarError: "Avatar is required",
        emailError: "Please enter a valid email address",
        passwordError: "Password is required",
      });
      return;
    }

    if (!formData.username.trim()) {
      setErrors((prev) => ({ usernameError: "Username is required", ...prev }));
    }

    if (!selectedAvatar) {
      setErrors((prev) => ({ avatarError: "Avatar is required", ...prev }));
    }

    if (!formData.email.trim()) {
      setErrors((prev) => ({ emailError: "Email is required", ...prev }));
    } else if (formData.email.trim() && !validateEmail(formData.email.trim())) {
      setErrors((prev) => ({
        emailError: "Please enter a valid email address",
        ...prev,
      }));
    }

    if (!formData.password.trim()) {
      setErrors((prev) => ({ passwordError: "Password is required", ...prev }));
    } else if (formData.password.trim() && formData.password.length < 4) {
      setErrors((prev) => ({
        passwordError: "Password must be at least 4 characters",
        ...prev,
      }));
    }
    return true;
  };
  const updateFormData = (
    field: keyof SignUpFormDataType | "avatar",
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors?.[field as keyof ErrorsType]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  const handleSignUp = async () => {
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      if (formData && selectedAvatar) {
        const res = await signup({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          avatarUrl: selectedAvatar.avatarSrc.trim(),
        });
        if (res?.isSuccess) {
          createToast(res?.message ?? "Form submitted successfully");
          router.replace("/(auth)/otp-verification");
        } else {
          createToast(res?.message ?? "Failed to perform action");
        }
      }
    } catch (error) {
      console.log("error while signup, ", error);
      createToast("Error in register");
    } finally {
      setIsLoading(false);
    }
  };
  const onSelectAvatar = (choosedAvatar: AvatarType) => {
    if (choosedAvatar && errors["avatarError"]) {
      setErrors((prev) => ({ ...prev, avatarError: "" }));
    }
    setSelectedAvatar(choosedAvatar);
  };
  return {
    validateForm,
    updateFormData,
    handleSignUp,
    selectedAvatar,
    setSelectedAvatar,
    formData,
    errors,
    onSelectAvatar,
    isLoading,
    setIsLoading,
  };
}
