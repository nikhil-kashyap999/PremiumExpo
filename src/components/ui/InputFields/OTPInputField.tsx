import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

type Props = {
  length?: number;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  error?: boolean;
  autoFocus?: boolean;
};

export default function OtpInput({
  length = 6,
  onChange,
  onComplete,
  error = false,
  autoFocus = false,
}: Props) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const update = (newOtp: string[]) => {
    setOtp(newOtp);
    const code = newOtp.join("");
    onChange?.(code);
    if (code.length === length) onComplete?.(code);
  };

  const handleChange = (text: string, index: number) => {
    const digits = text.replace(/\D/g, ""); // sirf numbers
    const newOtp = [...otp];

    if (!digits) {
      newOtp[index] = "";
      update(newOtp);
      return;
    }

    let i = index;
    for (const d of digits) {
      if (i >= length) break;
      newOtp[i++] = d;
    }
    update(newOtp);
    inputRefs.current[Math.min(i, length - 1)]?.focus();
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key !== "Backspace") return;

    const newOtp = [...otp];
    if (otp[index] !== "") {
      newOtp[index] = "";
      update(newOtp);
    } else if (index > 0) {
      newOtp[index - 1] = "";
      update(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };


  useEffect(() => {
    // Auto focus on first input when component mounts
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <View className="flex-row justify-between gap-2">
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          value={otp[index]}
          maxLength={index === 0 ? length : 1}
          keyboardType="numeric"
          selectTextOnFocus
          autoFocus={autoFocus && index === 0}
          textContentType={index === 0 ? "oneTimeCode" : "none"}
          autoComplete={index === 0 ? "sms-otp" : "off"}
          testID={`otp-input-${index}`}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          className={`h-[55px] w-[45px] rounded-lg border-[1.5px] text-center text-2xl font-bold color-white ${
            error ? "border-red-500" : "border-[#404040]"
          }`}
        />
      ))}
    </View>
  );
}
