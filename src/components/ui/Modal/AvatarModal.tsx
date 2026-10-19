import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { avatars, AvatarType } from "@/utils/avatarsImages.utils";
import { SafeAreaView } from "react-native-safe-area-context";

type Prop = {
  onClose: () => void;
  isModalVisible: boolean;
  prevSelectedAvatar: AvatarType|null;
  onSelectAvatar: (selected: AvatarType) => void;
};

const { height: screenHeight, width } = Dimensions.get("window");
const avatarSize = (width - 60) / 3.1;

const AvatarModal = ({
  onClose,
  isModalVisible,
  onSelectAvatar,
  prevSelectedAvatar,
}: Prop) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [prevAvatar, setPrevAvatar] = useState<AvatarType | null>(
    prevSelectedAvatar,
  );

  // Animation values
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(screenHeight)).current;
  const modalScale = useRef(new Animated.Value(0.9)).current;

  const showModal = () => {
    // Reset initial state before animating in
    modalTranslateY.setValue(screenHeight * 0.3); // start a bit lower, not fully off screen
    modalScale.setValue(0.95);
    backdropOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(modalTranslateY, {
        toValue: 0,
        damping: 15, // controls "bounciness"
        stiffness: 150, // controls speed
        mass: 0.9, // weight of animation
        useNativeDriver: true,
      }),
      Animated.spring(modalScale, {
        toValue: 1,
        damping: 15,
        stiffness: 150,
        mass: 0.9,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const closeModal = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(modalTranslateY, {
        toValue: screenHeight * 0.3,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 0.95,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedAvatar(null);
      onClose?.();
    });
  };

  // Animate open/close
  useEffect(() => {
    setPrevAvatar(prevSelectedAvatar);
    // Stop ongoing animations
    backdropOpacity.stopAnimation();
    modalTranslateY.stopAnimation();
    modalScale.stopAnimation();

    if (isModalVisible) {
      showModal();
    }
  }, [isModalVisible]);

  // Handle avatar selection
  const handleSelectAvatar = (avatarItem: any) => {
    setPrevAvatar(null);
    setSelectedAvatar(avatarItem.id);
  };

  // Confirm selection
  const handleConfirm = () => {
    if (selectedAvatar) {
      const selected = avatars.find((avatar) => avatar.id === selectedAvatar);
      if (selected) {
        onSelectAvatar(selected);
        setPrevAvatar(null);
        closeModal();
      }
    }
  };

  const renderItem = ({ item }: { item: AvatarType }) => (
    <TouchableOpacity
      style={[
        styles.avatarItem,
        prevAvatar && prevAvatar.id === item.id && styles.selectedAvatarItem,
        selectedAvatar === item.id && styles.selectedAvatarItem,
      ]}
      onPress={() => handleSelectAvatar(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.avatarSrc }}
        style={styles.avatarImage}
        resizeMode="cover"
      />
      {prevAvatar && prevAvatar.id === item.id && (
        <View style={styles.selectedOverlay}>
          <Text style={styles.checkmark}>Selected</Text>
        </View>
      )}

      {selectedAvatar === item.id && (
        <View style={styles.selectedOverlay}>
          <Text style={styles.checkmark}>select</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isModalVisible}
      animationType="none" // avoid conflict with custom animation
      transparent={true}
      onRequestClose={() => onClose?.()}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Backdrop */}
        <Animated.View
          style={[styles.modalContainer, { opacity: backdropOpacity }]}
        >
          {/* Modal Content */}
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [
                  { translateY: modalTranslateY },
                  { scale: modalScale },
                ],
              },
            ]}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Select Avatar</Text>
              <Text className="text-sm text-neutral-400">Pick an avatar for your profile</Text>
            </View>

            <FlatList
              data={avatars}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              // contentContainerStyle={styles.avatarGrid}
            />

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => closeModal()}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  !selectedAvatar && styles.disabledButton,
                ]}
                onPress={handleConfirm}
                disabled={!selectedAvatar}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedAvatar
                      ? styles.confirmButtonText
                      : styles.disabledText,
                  ]}
                  className="bgneu"
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "60%",
    backgroundColor: "#404040",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "semibold",
  },
  avatarItem: {
    width: avatarSize,
    height: avatarSize,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#404040",
  },
  selectedAvatarItem: {
    borderWidth: 2,
    borderColor: "#b1b1b1ff",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  selectedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(66, 68, 71, 0.34)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#f7f7f7ff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#404040",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "blue",
  },
  cancelButtonText: {
    color: "red",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "gray",
    opacity: 0.7,
  },

  disabledText: {
    color: "white",
  },
  confirmButtonText: {
    color: "white",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AvatarModal;
