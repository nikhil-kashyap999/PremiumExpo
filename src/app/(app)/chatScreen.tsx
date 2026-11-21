import { useEffect } from "react";
import MessageInput from "@/components/messageInput";
import CustomStatusBar from "@/components/status-bar";
import { dummyContact } from "@/constants/dummyContact";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDown from "@/components/drop-down";
import { useAuthStore } from "@/store/auth-store";
import { ContactStore } from "@/store/contacts-store";
import ChatScreenHeader from "@/components/ui/chatScreen/chatScreenHeader";
import { MessagesContainer } from "@/components/message-container";
import { KeyboardAvoidingView, View } from "react-native";

export default function ChatScreen() {
  const { id }: { id: string } = useLocalSearchParams();
  const contact = ContactStore((s) => s.getContact(id));
  const setParticipentInStore = useAuthStore((s) => s.setParticipant);
  const participant = contact ?? dummyContact;

  useEffect(() => {
    if (contact) setParticipentInStore(contact);
  }, [contact, setParticipentInStore]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <CustomStatusBar />
      <DropDown />
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ChatScreenHeader participant={participant} />
        <View className="flex-1">
          <MessagesContainer />
        </View>
        <MessageInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
