import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { ReturedContactType } from "@/types/ExploreSearchResultType";

type ActionType = "add" | "invite" | "pending";

type Props = {
  showActionBtn: boolean;
  actionType: ActionType;
  contactData: ReturedContactType;
  onAction: (contact: ReturedContactType) => Promise<void> | void;
};

const ACTION_LABEL: Record<ActionType, string> = {
  add: "Add",
  invite: "Invite",
  pending: "Pending",
};

export default function ActionContactCard({
  showActionBtn = true,
  contactData,
  actionType,
  onAction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const disabled = loading || actionType === "pending";

  const handlePress = async () => {
    if (!showActionBtn || !onAction) return;
    try {
      setLoading(true);
      await onAction(contactData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full px-2 mb-2">
      <View className="w-full py-3 flex-row items-center px-3 bg-neutral-800 rounded-2xl border border-neutral-700">
        {/* Avatar + active dot */}
        <View>
          <Image
            source={{
              uri:
                contactData.avatarUrl ??
                require("../../assets/images/default-avatar.png"),
            }}
            className="w-11 h-11 rounded-full bg-neutral-500"
          />
          {contactData.isActive && (
            <View className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-neutral-600" />
          )}
        </View>

        <View className="flex-1 ml-3">
          <View className="flex-row items-center">
            <Text className="text-white font-semibold" numberOfLines={1}>
              {contactData.username}
            </Text>
          </View>
          <Text className="text-neutral-300 text-xs capitalize">
            {contactData.role}
          </Text>
        </View>

        {/* Action button */}
        <TouchableOpacity
          onPress={handlePress}
          disabled={disabled}
          activeOpacity={0.7}
          className={`px-4 py-2 rounded-full min-w-[80px] items-center ${
            actionType === "pending" ? "bg-neutral-500" : "bg-blue-600"
          }`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-sm font-medium">
              {actionType && ACTION_LABEL[actionType]}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
