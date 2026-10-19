import { Stack } from "expo-router";
import Toast from "@/components/toast";
import LoadingModal from "@/components/loadingModal";
import MessageModal from "@/components/message-modal";
import { SocketProvider } from "@/socket/SocketProvider";
import NotificationCard from "@/components/ui/Notification/NotificationCard";

export default function AppLayout() {
  return (
    <>
      <SocketProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="chatScreen" />
        </Stack>
        <Toast />
        <LoadingModal />
        <NotificationCard />
        <MessageModal/>
      </SocketProvider>
    </>
  );
}
