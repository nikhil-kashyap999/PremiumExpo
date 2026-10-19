import ActionContactCard from "@/components/actionContactCard";
import Header from "@/components/header";
import SearchBar from "@/components/search-bar";
import { axiosApi } from "@/services/axiosApi";
import { useToast } from "@/store/toast-store";
import { ReturedContactType } from "@/types/ExploreSearchResultType";
import Feather from "@expo/vector-icons/Feather";
import { isAxiosError } from "axios";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const explore = () => {
  const [error, setError] = useState<string>("");
  const [searchedContacts, setSearchedContacts] = useState<
    ReturedContactType[]
  >([]);
  const createToast = useToast((s) => s.createToast);

  const handleSendInvite = async (receiverId: string) => {
    try {
      const res = await axiosApi.post("/api/user/invite-send", { receiverId });
      createToast(res.data.message ?? "Invite sent");
    } catch (e) {
      if (isAxiosError(e)) {
        createToast(e.response?.data.message ?? "Failed to send invite");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Header title="Explore" />
      <SearchBar onResult={setSearchedContacts} onError={setError} />
      {searchedContacts.length == 0 && !error && (
        <View className="flex-1 justify-center">
          <Animated.View
            entering={FadeInUp.delay(200).duration(400)}
            className="flex 1 justify-center items-center"
          >
            <Feather name="search" size={60} color="gray" />

            <Text className="mt-4 text-lg font-semibold color-[#6B7280] text-center">
              Search for users by their username
            </Text>
            <Text className="mt-2 color-[#9CA3AF] text-center">
              Results will appear here
            </Text>
          </Animated.View>
        </View>
      )}
      {searchedContacts.length > 0 && (
        <FlatList
          data={searchedContacts}
          keyExtractor={(c: ReturedContactType) => c._id}
          renderItem={({
            item,
            index,
          }: {
            item: ReturedContactType;
            index: number;
          }) => (
            <Animated.View
              key={item._id}
              entering={FadeInRight.delay(index * 100).springify()}
            >
              <ActionContactCard
                showActionBtn
                key={item._id}
                contactData={item}
                actionType="invite"
                onAction={() => {
                  handleSendInvite(item._id);
                }}
              />
            </Animated.View>
          )}
          className="mt-4"
        />
      )}
      {error && (
        <View className="mt-4 mx-4 rounded-xl">
          <Text className="text-rose-600 font-semibold text-sm text-center">
            {error}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default explore;
