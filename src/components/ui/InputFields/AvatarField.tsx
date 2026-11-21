import { memo } from "react";
import { IconName } from "./InputField";
import Icon from "@expo/vector-icons/Ionicons";
import { AvatarType } from "@/utils/avatarsImages.utils";
import { Text, View, Image, TouchableOpacity } from "react-native";

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
      <View className="mb-5">
        <TouchableOpacity
          className={`border rounded-2xl flex-row items-center justify-between px-4  bg-neutral-300 dark:bg-neutral-900 h-16 ${error ? "border-red-600" : "border-neutral-400 dark:border-neutral-700"}`}
          onPress={() => setShowAvatarModal((prev: boolean) => !prev)}
        >
          <View className="flex-row">
            {icon ? <Icon name={icon} size={20} color="gray" /> : null}
            {selectedAvatar ? (
              <Text className="color-[#3B82F6] ml-4">Selected</Text>
            ) : (
              <Text className="color-neutral-500 ml-4">Choose your avatar</Text>
            )}
          </View>
          <View className="m-[2px] items-center">
            <TouchableOpacity
              onPress={() => setShowAvatarModal((prev: boolean) => !prev)}
              className="min-w-[50px] h-full rounded-full overflow-hidden justify-center items-center border-dashed border"
            >
              {selectedAvatar ? (
                <Image
                  className="w-10 h-[80%]"
                  source={{ uri: selectedAvatar.avatarSrc }}
                />
              ) : (
                <Text>?</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {error ? (
          <Text className="color-red-600 mt-1 ml-1 text-sm">{error}</Text>
        ) : null}
      </View>
    </>
  );
};

export default memo(AvatarField);
