import { useLoadingModel } from "@/store/loadingModal-store";
import { Modal, View, ActivityIndicator, Text, StyleSheet } from "react-native";

const LoadingModal = () => {
  const label = useLoadingModel(s=>s.label ?? "Loading...")
  const isVisible = useLoadingModel((s) => s.isVisible);
  const stopLoadingModel = useLoadingModel((s) => s.stopLoadingModel);
  if (!isVisible) return;
  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
          <View style={styles.textCon}>
            <Text style={styles.loadingText}>{label}</Text>
            <Text style={styles.subText}>Please wait</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    // backgroundColor: 'white',
    backgroundColor: "#2C2C2C",
    padding: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "70%",
    flexDirection: "row",
  },
  textCon: {
    marginLeft: 20,
  },

  loadingText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#fff",
  },
  subText: {
    // font: 10,
    fontWeight: "100",
    color: "gray",
  },
});

export default LoadingModal;
