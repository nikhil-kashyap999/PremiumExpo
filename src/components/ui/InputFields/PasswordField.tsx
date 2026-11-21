import Icon from "@expo/vector-icons/build/Ionicons";
import { memo } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

type Prop = {
  password: string;
  setPassword: (password: string) => void;
  passwordError?: string;
  setPasswordError?: (err: string) => void;
  isPasswordVisible: boolean;
  setIsPasswordVisible: (arg: any) => void;
  placeholder?: string;
};
const PasswordField = ({
  password,
  setPassword,
  passwordError,
  setPasswordError,
  isPasswordVisible,
  setIsPasswordVisible,
  placeholder = "Enter your password",
}: Prop) => {
  return (
    <View className="mb-5">
      <View
        className={`flex-row items-center rounded-2xl px-4 border dark:bg-neutral-900 bg-neutral-300 ${passwordError ? "border-red-600" : "border-neutral-400 dark:border-neutral-700"}`}
      >
        <Icon size={20} color="gray" name="lock-closed" className="mr-3" />
        <TextInput
          value={password}
          placeholder={placeholder}
          placeholderTextColor="gray"
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={!isPasswordVisible}
          className="flex-1 dark:text-white text-black my-2"
        />
        <TouchableOpacity
          className="p-1"
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Text className="text-blue-600 text-sm font-bold">
            {isPasswordVisible ? "hide" : "show"}
          </Text>
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text className="color-red-600 mt-1 ml-1 text-sm">{passwordError}</Text>
      ) : null}
    </View>
  );
};

export default memo(PasswordField);
