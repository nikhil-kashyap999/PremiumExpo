// import { NativeTabs } from "expo-router/unstable-native-tabs";
// import { useColorScheme } from "react-native";

// import { Colors } from "@/constants/theme";

// export default function AppTabs() {
//   const scheme = useColorScheme();
//   const colors = Colors[scheme === "unspecified" ? "light" : scheme];

//   return (
//     <NativeTabs
//       backgroundColor={colors.background}
//       indicatorColor={colors.backgroundElement}
//       labelStyle={{ selected: { color: "white" } }}
//     >
//       <NativeTabs.Trigger name="chats">
//         <NativeTabs.Trigger.Label>Chats</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon md={"forum"} />
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="requests">
//         <NativeTabs.Trigger.Label>Request's</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon md={"person_add"} />
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="explore">
//         <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon md={"person_search"} />
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="profile">
//         <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon md={"account_circle"} />
//       </NativeTabs.Trigger>
//     </NativeTabs>
//   );
// }


import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "nativewind";

import { Colors } from "@/constants/theme";

export default function AppTabs() {
  const { colorScheme } = useColorScheme();
  const colors = Colors[colorScheme === "dark" ? "dark" : "light"];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      iconColor={colors.textSecondary}
      labelStyle={{
        default: { color: colors.textSecondary },
        selected: { color: colors.text },
      }}
    >
      <NativeTabs.Trigger name="chats">
        <NativeTabs.Trigger.Label>Chats</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="bubble.left.and.bubble.right" md="forum" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="requests">
        <NativeTabs.Trigger.Label>Requests</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.badge.plus" md="person_add" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="person_search" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person.circle" md="account_circle" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}