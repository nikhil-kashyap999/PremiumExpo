import React, { memo } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

export type IconName = React.ComponentProps<typeof Icon>["name"];

interface InputFieldProps extends Omit<
  TextInputProps,
  "value" | "onChangeText"
> {
  value: string;
  setValue: (text: string) => void;
  iconType?: IconName;
  valueError?: string;
  setValueError?: (err: string) => void;
  customStyles?:string;
}

const InputField = ({
  value,
  setValue,
  iconType,
  valueError,
  setValueError,
  placeholder = "",
  customStyles,
  ...rest
}: InputFieldProps) => {
  const handleChange = (text: string) => {
    if (valueError) setValueError?.("");
    setValue(text);
  };

  return (
    <View style={[styles.inputContainer]} className={`${customStyles}`}>
      <View style={[styles.inputWrapper, !!valueError && styles.inputError]}>
        {iconType && (
          <Icon
            name={iconType}
            size={20}
            color="gray"
            style={styles.inputIcon}
          />
        )}
        <TextInput
          autoCapitalize="none"
          placeholderTextColor="gray"
          {...rest}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChange}
        />
      </View>
      {!!valueError && <Text style={styles.errorText}>{valueError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 20 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#404040",
    backgroundColor: "#171717",
  },
  inputError: { borderColor: "red" },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: "white", fontSize: 16 },
  errorText: { color: "red", fontSize: 12, marginTop: 4, marginLeft: 4 },
});

export default memo(InputField);
