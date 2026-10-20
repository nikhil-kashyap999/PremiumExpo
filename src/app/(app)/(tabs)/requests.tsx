import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "@/components/status-bar";
import Header from "@/components/header";
import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback, useState } from "react";
import { axiosApi } from "@/services/axiosApi";
import { useToast } from "@/store/toast-store";
import { isAxiosError } from "axios";
import { useFocusEffect } from "expo-router";
import { useMessageModal } from "@/store/messageModal-store";
import { RequestsSenderType, RequestsType } from "@/types/RequestResultType";

export default function requests() {
  const createToast = useToast((s) => s.createToast);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<RequestsType[]>([]);
  const createMessage = useMessageModal((s) => s.createMessage);

  const onInviteAccept = async (requestid: string) => {
    if (!requestid) return;
    try {
      const res = await axiosApi.post("/api/user/invite-accept", { requestid });
      createToast(res.data?.message);
      await getRequestsFromServer();
    } catch (e) {
      if (isAxiosError(e)) {
        createMessage(e.response?.data.message);
      }
    }
  };

  const onInviteReject = async (requestid: string) => {
    if (!requestid) return;
    try {
      const res = await axiosApi.post("/api/user/invite-reject", { requestid });
      createToast(res.data?.message);
      await getRequestsFromServer();
    } catch (e) {
      if (isAxiosError(e)) {
        createMessage(e.response?.data.message);
      }
    }
  };

  const getRequestsFromServer = async () => {
    setLoading(true);
    try {
      const res = await axiosApi.get("/api/user/requests");
      setResults(res.data.res);
    } catch (e) {
      if (isAxiosError(e)) createToast(e.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getRequestsFromServer();
    }, [createToast]),
  );
  return (
    <SafeAreaView className="flex-1">
      <CustomStatusBar />
      <Header title="requests" />
      {loading && (
        <View className="py-2">
          <Text className="text-neutral-400 font-bold text-center">
            Loading your requests...
          </Text>
        </View>
      )}
      <TouchableOpacity
        className="p-2 bg-neutral-900 border border-neutral-800 rounded-full absolute bottom-16 right-8 flex items-center justify-center z-50"
        onPress={getRequestsFromServer}
      >
        <MaterialIcons name="refresh" size={35} color="gray" />
      </TouchableOpacity>
      {results.length === 0 && !loading && (
        <View className="flex-1 justify-center">
          <Animated.View
            entering={FadeInUp.delay(200).duration(400)}
            className="flex 1 justify-center items-center"
          >
            <MaterialIcons name="person-add-alt-1" size={50} color="gray" />

            <Text className="mt-4 text-lg font-semibold color-[#6B7280] text-center">
              All invite's will be shown here
            </Text>
            <Text className="mt-2 color-[#9CA3AF] text-center">
              Results will appear here
            </Text>
          </Animated.View>
        </View>
      )}
      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(c: RequestsType) => c.sender._id}
          renderItem={({
            item,
            index,
          }: {
            item: RequestsType;
            index: number;
          }) => (
            <Animated.View
              key={item.sender._id}
              entering={FadeInRight.delay(index * 100).springify()}
            >
              <UserCard
                c={item.sender}
                onInviteAccept={() => onInviteAccept(item.requestId)}
                onInviteReject={() => onInviteReject(item.requestId)}
              />
            </Animated.View>
          )}
          className="mt-4"
          contentContainerClassName="gap-y-3"
        />
      )}
    </SafeAreaView>
  );
}

function UserCard({
  c,
  onInviteAccept,
  onInviteReject,
}: {
  c: RequestsSenderType;
  onInviteAccept: () => void;
  onInviteReject: () => void;
}) {
  return (
    <View className="px-4">
      <View className="bg-neutral-800 rounded-xl border border-neutral-700">
        <View className="flex flex-row p-1 items-center px-3">
          <View className="m-2">
            <Image
              source={
                c.avatarUrl
                  ? { uri: c.avatarUrl }
                  : require("@/assets/images/default-avatar.png")
              }
              className="w-11 h-11 rounded-full bg-neutral-500"
            />
          </View>

          <View className="px-2">
            <Text
              className="text-white font-semibold text-lg"
              numberOfLines={1}
            >
              {c.username}
            </Text>
            <Text className="text-sm text-neutral-500">sent you an invite</Text>
          </View>
        </View>

        <View className="px-3 flex flex-row justify-between w-full pb-2 mt-1">
          <TouchableOpacity
            className="bg-neutral-900 p-3 px-6 rounded-lg flex-1 mx-1 items-center"
            onPress={onInviteAccept}
          >
            <Text className="text-blue-500 font-bold">Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-neutral-900 p-3 px-6 rounded-lg flex-1 items-center mx-1"
            onPress={onInviteReject}
          >
            <Text className="text-red-500 font-bold">Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
