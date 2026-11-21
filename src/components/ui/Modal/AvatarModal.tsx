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
  prevSelectedAvatar: AvatarType | null;
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
  const renderItem = ({ item }: { item: AvatarType }) => {
    const isPrev = prevAvatar && prevAvatar.id === item.id;
    const isSelected = selectedAvatar === item.id;

    return (
      <TouchableOpacity
        className={`m-[5px] overflow-hidden rounded-[10px] ${
          isPrev || isSelected
            ? "border-2 border-neutral-400"
            : "border border-neutral-700"
        }`}
        style={{ width: avatarSize, height: avatarSize }}
        onPress={() => handleSelectAvatar(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: item.avatarSrc }}
          className="h-full w-full"
          resizeMode="cover"
        />

        {isPrev && (
          <View className="absolute inset-0 items-center justify-center bg-[rgba(66,68,71,0.34)]">
            <Text className="overflow-hidden rounded-[10px] bg-neutral-100 px-4 text-xs text-black">
              Selected
            </Text>
          </View>
        )}

        {isSelected && (
          <View className="absolute inset-0 items-center justify-center bg-[rgba(66,68,71,0.34)]">
            <Text className="overflow-hidden rounded-[10px] bg-neutral-100 px-4 text-xs text-black">
              select
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="none" // avoid conflict with custom animation
      transparent
      onRequestClose={() => onClose?.()}
    >
      <SafeAreaView className="flex-1">
        {/* Backdrop */}
        <Animated.View
          className="flex-1 items-center justify-center bg-black/50"
          style={{ opacity: backdropOpacity }}
        >
          {/* Modal Content */}
          <Animated.View
            className="max-h-[60%] w-[90%] overflow-hidden rounded-[10px] bg-neutral-700 shadow-lg shadow-black"
            style={{
              elevation: 5,
              transform: [
                { translateY: modalTranslateY },
                { scale: modalScale },
              ],
            }}
          >
            {/* Header */}
            <View className="items-center p-[15px]">
              <Text className="text-lg font-semibold text-white">
                Select Avatar
              </Text>
              <Text className="text-sm text-neutral-400">
                Pick an avatar for your profile
              </Text>
            </View>

            <FlatList
              data={avatars}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
            />

            {/* Footer */}
            <View className="flex-row justify-between p-[15px]">
              <TouchableOpacity
                className="min-w-[100px] items-center rounded-[5px] px-5 py-2.5"
                onPress={() => closeModal()}
              >
                <Text className="font-bold text-red-500">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`min-w-[100px] items-center rounded-[5px] px-5 py-2.5 ${
                  selectedAvatar ? "bg-blue-600" : "bg-gray-500 opacity-70"
                }`}
                onPress={handleConfirm}
                disabled={!selectedAvatar}
              >
                <Text className="font-bold text-white">Confirm</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};
export default AvatarModal;
