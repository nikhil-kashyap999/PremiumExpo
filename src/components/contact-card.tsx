import Entypo from "@expo/vector-icons/Entypo";
import { useRef, useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";

type MenuOption = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type PropType = {
  avatarURL: string;
  username: string;
  isActive?: boolean;
  onPress?: () => void;
  customStyle?: {};
  showIcon?: boolean;
  menuOptions?: MenuOption[];
};

const MENU_WIDTH = 170;

export default function ContactCard({
  avatarURL,
  username = "Unknown User",
  isActive = false,
  onPress = () => {},
  customStyle = {},
  showIcon = false,
  menuOptions = [],
}: PropType) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const dotsRef = useRef<View>(null);
  const cardRef = useRef<View>(null);

  const size = 42;
  const dotSize = size * 0.28;

  const openMenu = (ref: React.RefObject<View | null>) => {
    if (menuOptions.length === 0) return;
    ref.current?.measureInWindow((x, y, width, height) => {
      const screenW = Dimensions.get("window").width;
      let left = x + width - MENU_WIDTH;
      left = Math.max(8, Math.min(left, screenW - MENU_WIDTH - 8));
      setMenuPos({ top: y + height, left });
      setMenuVisible(true);
    });
  };

  const closeMenu = () => setMenuVisible(false);

  return (
    <>
      <TouchableOpacity
        ref={cardRef as any}
        activeOpacity={0.8}
        onPress={onPress}
        onLongPress={() => openMenu(cardRef)}
        delayLongPress={300}
        style={[styles.container, customStyle]}
      >
        {/* Left Section: Avatar + Info */}
        <View style={styles.left}>
          <View style={{ width: size, height: size }}>
            <Image
              source={
                avatarURL
                  ? { uri: avatarURL }
                  : require("../../assets/images/default-avatar.png")
              }
              style={[
                styles.avatar,
                { width: size, height: size, borderRadius: size / 2 },
              ]}
            />
            <View
              style={[
                styles.statusDot,
                {
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  backgroundColor: isActive ? "#0ea5e9" : "#9CA3AF",
                },
              ]}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {username}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.status}>
              recent messages will appear here
            </Text>
          </View>
        </View>

        {/* Right Section: Three dots */}
        <View style={styles.right}>
          <TouchableOpacity
            ref={dotsRef as any}
            style={styles.verticalIconCon}
            onPress={() => openMenu(dotsRef)}
          >
            <Entypo name="dots-three-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal
        transparent
        animationType="fade"
        visible={menuVisible}
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.backdrop} onPress={closeMenu}>
          <View style={[styles.menu, { top: menuPos.top, left: menuPos.left }]}>
            {menuOptions.map((opt, index) => (
              <TouchableOpacity
                key={opt.label}
                style={[
                  styles.menuItem,
                  index !== menuOptions.length - 1 && styles.menuDivider,
                ]}
                onPress={() => {
                  closeMenu();
                  opt.onPress();
                }}
              >
                <Text
                  style={[
                    styles.menuText,
                    opt.destructive && { color: "#ef4444" },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 10,
    shadowRadius: 2,
    overflow: "hidden",
  },
  left: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    backgroundColor: "#262626",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "fff",
  },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 16, fontWeight: "600", color: "white" },
  status: {
    fontSize: 13,
    fontWeight: "400",
    color: "gray",
    fontStyle: "italic",
  },
  right: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  verticalIconCon: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  menu: {
    position: "absolute",
    width: MENU_WIDTH,
    backgroundColor: "#262626",
    borderRadius: 10,
    paddingVertical: 4,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  menuItem: { paddingVertical: 12, paddingHorizontal: 16 },
  menuDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#374151",
  },
  menuText: { color: "white", fontSize: 15 },
});
