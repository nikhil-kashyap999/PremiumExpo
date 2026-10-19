import { StyleSheet, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useToast } from "@/store/toast-store";

const Toast = () => {
  const isVisible = useToast((s) => s.isVisible);
  const message = useToast((s) => s.message);
  const hideToast = useToast((s) => s.hideToast);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isVisible) return;

    // setMounted(true);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        // setMounted(false);
        hideToast();
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      fadeAnim.stopAnimation();
    };
  }, [isVisible, message]);

  if (!isVisible) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.modal, { opacity: fadeAnim }]}
    >
      <Text style={styles.messageText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modal: {
    top: "5%",
    left: "10%",
    width: "80%",
    zIndex: 1000,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal:4,
    alignItems: "center",
    position: "absolute",
    borderColor: "#404040",
    justifyContent: "center",
    backgroundColor: "#2C2C2C",
  },
  messageText: { color: "white", fontSize: 14, fontWeight: "500",textAlign:"center" },
});

export default Toast;
