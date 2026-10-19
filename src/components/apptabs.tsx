import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
} from "expo-router/ui";
import { forwardRef } from "react";
import { Text, View, Pressable } from "react-native";

const TabButton = forwardRef<View, TabTriggerSlotProps & { label: string }>(
  ({ isFocused, label, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...props}
        className={`flex-1 items-center py-2 ${
          isFocused ? "border-t-2 border-blue-500" : ""
        }`}
      >
        <Text
          className={`text-md font-semibold bg-green-400 w-full text-center ${isFocused ? "text-blue-500" : "text-gray-400"}`}
        >
          {label}
        </Text>
      </Pressable>
    );
  },
);

export default function Layout() {
  return (
    // ❌ className hata diya, style use kar rahe hain
    <Tabs style={{ flex: 1}}>
      <TabSlot style={{ flex: 1}} />

      <TabList style={{ flexDirection: "row", backgroundColor: "", height:80,gap:2 }}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton label="Home" />
        </TabTrigger>
        <TabTrigger name="explore" href="/explore" asChild>
          <TabButton label="Explore" />
        </TabTrigger>
        <TabTrigger name="login" href="/login" asChild>
          <TabButton label="Login" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
