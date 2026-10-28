import { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

type Props = ViewProps & {
  delay?: number;      // ms me, stagger ke liye
  duration?: number;   // animation ki length
  distance?: number;   // kitna niche se start ho (px)
  children: React.ReactNode;
};

export default function SlideUpView({
  delay = 0,
  duration = 400,
  distance = 30,
  style,
  children,
  ...rest
}: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * distance }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]} {...rest}>
      {children}
    </Animated.View>
  );
}