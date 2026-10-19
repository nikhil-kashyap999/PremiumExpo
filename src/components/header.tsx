import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type PropType = {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: any;
};

export default function Header({
  title = "title",
  showBackButton = false,
  onBackPress,
  rightComponent,
}: PropType) {
  return (
    <View className="flex flex-row justify-between items-center py-3 px-3">
      <Text className="text-3xl text-sky-400 font-extrabold tracking-wide">{title}</Text>
      {/* <TouchableOpacity
        onPress={handleShowOptionModule}
        style={styles.threeDotContainer}
      >
        <Icon name="ellipsis-vertical" size={22} color={titleColor} />
      </TouchableOpacity> */}
    </View>
  );
}
