import "@/global.css"
import { Stack } from "expo-router";
import Toast from "@/components/toast";
import MessageModal from "@/components/message-modal";
import LoadingModal from "@/components/loadingModal";

export default function AuthLayout() {
  return (
    <>
    <Stack screenOptions={{ headerShown: false }} />
    <Toast/>
    <MessageModal/>
    <LoadingModal/>
    </>
  );
}
