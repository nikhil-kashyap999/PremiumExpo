import { FlatList, RefreshControl, Text, TextInput, View } from "react-native";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import Header from "@/components/header";
import ContactCard from "@/components/contact-card";
import CustomStatusBar from "@/components/status-bar";
import { filterContacts } from "@/services/contactService";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchContacts, { ContactType } from "@/hooks/useFetchContacts";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";
import { useToast } from "@/store/toast-store";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";

export default function ContactsScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { loadingContacts, fetchContacts, contacts } = useFetchContacts();

  const clickable = useRef<boolean>(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onContactClick = (id: string) => {
    if (!clickable.current) return;
    clickable.current = false;
    router.push({ pathname: "/chatScreen", params: { id } });
    timer.current = setTimeout(() => {
      clickable.current = true;
    }, 1000);
  };

  const filteredContacts = filterContacts(searchQuery, contacts);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContacts();
    setRefreshing(false);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <CustomStatusBar />
      <Header title="Contacts" />
      <Animated.View
        entering={FadeInDown.duration(400)}
        className={"py-2 px-2"}
      >
        <View className="rounded-xl py-1 px-4  shadow-neutral-300 shadow-lg z-10 border border-neutral-800 bg-neutral-900 flex-row items-center">
          <Feather name="search" size={25} color="gray" />
          <TextInput
            className="color-white ml-2 flex-1"
            placeholder="Search contacts..."
            placeholderTextColor="#A3A3A3"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </Animated.View>
      <IfContactEmpty show={contacts.length === 0 ? true : false} />
      {contacts && (
        <FlatList
          data={filteredContacts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(contact: ContactType) => contact._id}
          renderItem={({
            item,
            index,
          }: {
            item: ContactType;
            index: number;
          }) => (
            <Animated.View
              key={item._id}
              entering={FadeInRight.delay(index * 100).springify()}
            >
              <ContactCard
                key={item._id}
                username={item.username}
                avatarURL={item.avatarUrl}
                isActive={item.isActive}
                onPress={() => onContactClick(item._id)}
                menuOptions={[
                  {
                    label: "Clear chat",
                    onPress: () =>
                      useToast.getState().createToast("In development"),
                  },
                  {
                    label: "Remove",
                    onPress: () =>
                      useToast.getState().createToast("In development"),
                    destructive: true,
                  },
                ]}
              />
            </Animated.View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
            />
          }
          className="mt-3"
        />
      )}
      {loadingContacts && <ContactLoadingAnimation />}
    </SafeAreaView>
  );
}

function ContactLoadingAnimation() {
  return (
    <>
      <View className="w-full h-full items-center mt-2">
        <Text className="text-center font-semibold text-neutral-400 italic">
          Loading Contacts...
        </Text>
      </View>
    </>
  );
}

function IfContactEmpty({ show }: { show: boolean }) {
  if (!show) return;
  return (
    <View className="flex-1 justify-center">
      <Animated.View
        entering={FadeInUp.delay(200).duration(400)}
        className="flex 1 justify-center items-center"
      >
        <MCI name="contacts" size={60} color="gray" />

        <Text className="mt-4 font-semibold color-[#6B7280] text-center px-3">
          It seems you are new on the app, explore and search new users and add
          them to your contacts
        </Text>
        <Text className="mt-2 color-[#9CA3AF] text-center">
          Go to explore section to add new contact.
        </Text>
      </Animated.View>
    </View>
  );
}
