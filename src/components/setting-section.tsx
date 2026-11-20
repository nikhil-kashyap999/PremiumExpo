import { View, Text } from "react-native";
import SectionItem from "./section-item";
import { useRouter } from "expo-router";
import { useTheme } from "@/store/theme-store";

export default function SettingSection({ heading }: { heading?: string }) {
  const isDark = useTheme((s) => s.isDark);
  const router = useRouter();
  const onPressHandler = () => {};
  return (
    <View>
      {heading && (
        <Text
          className={`text-lg font-bold mb-4 ${isDark?"text-white":"text-black"}`}
        >
          {heading}
        </Text>
      )}

      <View className="rounded-2xl mb-4 overflow-hidden bg-neutral-800">
        <SectionItem
          title="Notifications"
          icon={"notifications"}
          subtitle="Notifications related settings"
        />
        <SectionItem
          title="Privacy & Security"
          icon={"security"}
          subtitle="Manage your Privacy and Security settings"
        />
        <SectionItem
          title="Chat Setting"
          icon={"settings"}
          subtitle="Change chat related settings"
        />
        <SectionItem
          title="Help & Support"
          icon={"help"}
          isLast
          subtitle="Contact and help settings"
        />
      </View>
    </View>
  );
}
