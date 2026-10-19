import Icon from "@expo/vector-icons/build/Ionicons";
import React, { memo } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#404040",
    backgroundColor:"#171717"
  },
  inputError: {
    borderColor: "red",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  eyeIcon: {
    padding: 4,
  },
});
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
    <View style={styles.inputContainer}>
      <View
        style={[styles.inputWrapper, passwordError ? styles.inputError : null]}
      >
        <Icon
          name="lock-closed"
          size={20}
          color="gray"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="gray"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Text className="text-blue-600 text-sm font-bold">
            {isPasswordVisible ? "hide" : "show"}
          </Text>
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
    </View>
  );
};

export default memo(PasswordField);
