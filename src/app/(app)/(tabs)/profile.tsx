import { Image } from "expo-image";
import Header from "@/components/header";
import { useAuthStore } from "@/store/auth-store";
import CustomStatusBar from "@/components/status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import SettingSection from "@/components/setting-section";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useLoadingModel } from "@/store/loadingModal-store";

export default function profile() {
  const user = useAuthStore((s) => s.user);
  const logoutMethod = useAuthStore((s) => s.logout);
  const stopLoadingModel = useLoadingModel((s) => s.stopLoadingModel);
  const showLoadingModel = useLoadingModel((s) => s.showLoadingModal);

  const logout = async () => {
    showLoadingModel();
    await logoutMethod();
    stopLoadingModel();
  };

  return (
    <SafeAreaView className="flex-1">
      <CustomStatusBar />
      <Header title="Profile" />
      <View className="px-4">
        <View className="w-full mt-1 max-h-20 py-2 border border-neutral-700 rounded-2xl px-3 flex-row items-center bg-neutral-800 mb-2">
          <Image
            source={{ uri: user?.avatarUrl }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
            contentFit="cover"
            placeholder={require("@/assets/images/default-avatar.png")} // blur-up placeholder
            transition={200} // fade-in animation
          />
          {!user ? (
            <View className="flex-1 h-full px-4 justify-center">
              <TouchableOpacity>
                <Text className="font-bold text-lg text-stone-200 italic">
                  Click to login
                </Text>
              </TouchableOpacity>
              <Text className="font-bold text-sm text-stone-400 italic">
                Login to use app properly
              </Text>
            </View>
          ) : (
            <View className="flex-1 h-full px-4 justify-center">
              <Text className="font-semibold text-stone-200">
                {user.username}
              </Text>
              <Text className="text-stone-200">{user.email}</Text>
              <Text className="font-bold text-sm text-sky-500">online</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-2 mt-4 pb-4"
      >
        <Animated.View
          entering={FadeInDown.duration(800).springify().delay(200)}
        >
          <SettingSection heading="Settings" />
        </Animated.View>

        <View className="w-full px-1">
          <TouchableOpacity
            className="bg-neutral-800 rounded-xl py-4 px-4 flex-row justify-between items-center"
            onPress={logout}
          >
            <Text className="text-center font-bold text-red-600">Logout</Text>
            <Icon name="logout" size={25} color={"red"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
