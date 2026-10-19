import axios from "axios";
import { axiosApi } from "@/services/axiosApi";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dispatch, SetStateAction, useState } from "react";
import { ReturedContactType } from "@/types/ExploreSearchResultType";
import {
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const SearchBar = ({
  onResult,
  onError,
}: {
  onResult: Dispatch<SetStateAction<ReturedContactType[]>>;
  onError: Dispatch<SetStateAction<string>>;
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const SearchForUser = async (
    username: string,
  ): Promise<any[] | undefined> => {
    if (!username.trim()) return;
    try {
      const res = await axiosApi.get(`/api/user/search?q=${username}`);
      onError("");
      onResult(res.data.res);
      return res.data.res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        onResult([]);
        onError(error.response?.data?.message);
      }
    }
  };
  const handleClearSearch = () => {
    onResult([]);
    setQuery("");
    onError("");
  };
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      onResult([]);
      onError("");
      setQuery("");
      return;
    }
    setQuery(query);
    let timer: number;
    timer = setTimeout(async () => {
      clearTimeout(timer);
      setLoading(true);
      SearchForUser(query).finally(() => setLoading(false));
    }, 300);
  };

  return (
    <View>
      <Animated.View
        entering={FadeInDown.delay(100).duration(400)}
        className={
          "mt-4 flex flex-row items-center rounded-2xl overflow-hidden mx-2 border border-neutral-800 bg-neutral-900"
        }
      >
        <View className="flex-1 h-14 flex-row flex items-center px-3">
          <Feather name="search" size={20} color="#3B82F6" className="mr-2" />
          <TextInput
            placeholder="Enter username to search"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={(text) => handleSearch(text)}
            returnKeyType="search"
            autoCapitalize="none"
            className="flex-1 h-full text-white"
          />
        </View>
        {query.length > 0 ? (
          <TouchableOpacity onPress={handleClearSearch} className="p-4">
            <AntDesign name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="h-14 px-4 rounded-lg justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="blue" size="small" />
            ) : (
              <Feather name="search" size={24} color="#3B82F6" />
            )}
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

export default SearchBar;
