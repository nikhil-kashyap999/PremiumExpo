import { useMessageModal } from "@/store/messageModal-store";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Easing,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
function MessageModal() {
  const {
    isModalVisible: isMessage,
    hideMessageModal,
    message,
  } = useMessageModal();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isMessage) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      setShowContent(true);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
      ]).start();
    }
  }, [isMessage]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.5, // shrink down a bit more
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowContent(false); // hide content only after animation ends
      hideMessageModal(); // update global modal state
    });
  };
  if (!showContent) return;
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.messageCon}>
          <View style={styles.modalHeading}>
            <Text style={styles.modalHeadingStyle}>Message</Text>
          </View>
          <Text style={styles.message} className="textne">
            {message || "message modal example"}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            activeOpacity={0.7}
            onPress={handleClose}
          >
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },
  modal: {
    paddingHorizontal: 15,
    paddingTop: 15,
    zIndex: 40,
    width: width * 0.85,
    maxWidth: 340,
    borderRadius: 14,
    backgroundColor: "#2c2c2c",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    minHeight: 180,
    justifyContent: "space-between",
  },
  messageCon: {
    width: "100%",
    height: "auto",
    marginBottom: 25,
  },
  modalHeading: {
    borderBottomColor: "#525252",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginBottom: 16,
  },
  modalHeadingStyle: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
    color: "#e5e5e5",
  },
  message: {
    fontSize: 15,
    color: "#a3a3a3",
    fontWeight: "semibold",
    textAlign: "center",
    lineHeight: 22,
  },
  btnContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "#525252",
    paddingVertical: 2,
    marginBottom: 5,
  },
  closeBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "center",
  },
  btnText: {
    color: "#e11d48",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MessageModal;
