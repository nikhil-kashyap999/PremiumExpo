import { View, Text } from "react-native";
import SectionItem from "./section-item";

export default function SettingSection({ heading }: { heading?: string }) {
  return (
    <View>
      {heading && (
        <Text className={`text-lg font-bold mb-4 text-black dark:text-white`}>
          {heading}
        </Text>
      )}

      <View
        className={`rounded-2xl mb-4 overflow-hidden bg-neutral-200 dark:bg-neutral-800`}
      >
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
