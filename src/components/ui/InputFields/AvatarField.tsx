import React, { memo } from "react";
import { IconName } from "./InputField";
import Icon from "@expo/vector-icons/Ionicons";
import { AvatarType } from "@/utils/avatarsImages.utils";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

type Prop = {
  icon: IconName;
  selectedAvatar: AvatarType | null;
  setShowAvatarModal: (fun: any) => void;
  error?: string;
};

const AvatarField = ({
  icon,
  selectedAvatar,
  setShowAvatarModal,
  error,
}: Prop) => {
  return (
    <>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[
            styles.container,
            error && styles.inputError,
          ]}
          onPress={() => setShowAvatarModal((prev: boolean) => !prev)}
        >
          <View style={styles.leftContainer}>
            {icon ? <Icon name={icon} size={20} color="gray" /> : null}
            {selectedAvatar ? (
              <Text style={[styles.placeholderText, { color: "#3B82F6" }]}>
                Selected
              </Text>
            ) : (
              <Text style={styles.placeholderText}>Choose your avatar</Text>
            )}
          </View>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={styles.avatarSelector}
              onPress={() => setShowAvatarModal((prev: boolean) => !prev)}
            >
              {selectedAvatar ? (
                <Image
                  source={{ uri: selectedAvatar.avatarSrc }}
                  style={styles.avatarImage}
                />
              ) : (
                <Text>?</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </>
  );
};

export default memo(AvatarField);

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  container: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderColor: "#404040",
    backgroundColor: "#171717",
    justifyContent: "space-between",
  },
  iconStyle: {
    marginRight: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  inputError: {
    borderColor: "red",
  },
  avatarContainer: {
    margin: 2,
    alignItems: "center",
  },
  avatarSelector: {
    minWidth: 50,
    width: "auto",
    height: "100%",
    borderRadius: 60,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  avatarImage: {
    width: 40,
    height: "80%",
  },
  placeholderText: {
    fontSize: 16,
    color: "gray",
    marginLeft: 15,
  },
  leftContainer: {
    flexDirection: "row",
  },
});
