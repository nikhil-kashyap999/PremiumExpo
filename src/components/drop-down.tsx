import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { DropDownOptionType, useDropDown } from "@/store/dropDown-store";

const DURATION = 250;

enum Verient {
  Destructive = "destructive",
  normal = "normal",
}

export default function DropDown() {
  const isVisible = useDropDown((s) => s.isVisible);
  const dropDownOptions = useDropDown((s) => s.options);
  const hideDropDown = useDropDown((s) => s.hideDropDown);
  // close animation khatam hone tak component mounted rahega
  const [mounted, setMounted] = useState(isVisible);
  const progress = useSharedValue(0); // 0 = band, 1 = khula

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
      progress.value = withTiming(1, {
        duration: DURATION,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = withTiming(0, {
        duration: DURATION,
        easing: Easing.in(Easing.cubic),
      });
      const t = setTimeout(() => setMounted(false), DURATION);
      return () => clearTimeout(t);
    }
    return () => hideDropDown();
  }, [isVisible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const panelStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [-20, 0]) },
      { scale: interpolate(progress.value, [0, 1], [0.95, 1]) },
    ],
  }));

  if (!mounted) return null;

  return (
    <View style={styles.container}>
      {/* Backdrop: bahar tap karne par band */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={hideDropDown} />
      </Animated.View>

      {/* Panel */}
      <Animated.View style={[styles.panel, panelStyle]}>
        {dropDownOptions.map((option) => (
          <DropDownSection
            key={option.id}
            option={option}
            onClose={hideDropDown}
          />
        ))}
      </Animated.View>
    </View>
  );
}

function DropDownSection({
  option,
  onClose,
}: {
  option: DropDownOptionType;
  onClose: () => void;
}) {
  return (
    <TouchableOpacity
      className=" px-2 py-3 rounded-lg"
      onPress={() => {
        onClose();
        if (option.onPress) {
          option.onPress();
        }
      }}
    >
      <Text
        className={`text-base font-bold ${option.destructive ? "text-red-600" : "text-neutral-200"}`}
      >
        {option.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 50,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  panel: {
    width: 150,
    marginTop: 50,
    right: 15,
    // backgroundColor: "#fff",
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    minWidth: 200,
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    position: "absolute",
    rowGap: 5,
  },
});
