import React, { memo } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { View, TextInput, Text, TextInputProps } from "react-native";

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
  customStyles?: string;
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
    <View className={`${customStyles} mb-5`}>
      <View
        className={`flex-row items-center rounded-2xl px-4 border  dark:bg-neutral-900 bg-neutral-300 ${!!valueError ? "border-red-600" : "border-neutral-400 dark:border-neutral-700"}`}
      >
        {iconType && (
          <Icon size={20} color="gray" name={iconType} className="mr-3" />
        )}
        <TextInput
          {...rest}
          value={value}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor="gray"
          onChangeText={handleChange}
          className="flex-1 dark:text-white text-black my-2"
        />
      </View>
      {!!valueError && (
        <Text className="color-red-600 text-sm mt-1 ml-1">{valueError}</Text>
      )}
    </View>
  );
};

export default memo(InputField);
