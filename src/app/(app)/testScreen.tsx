import Toast from "@/components/toast";
import { useToast } from "@/store/toast-store";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestScreen() {
  const show = useToast(s=>s.createToast);

  return (
    <SafeAreaView className="h-full bg-black w-screen">
      <TouchableOpacity className="absolute px-3 py-1 bg-neutral-700 top-16" onPress={()=>show('hello')}>
        <Text className="color-white bg-green-500 px-4 py-2">Show</Text>
      </TouchableOpacity>
      <Toast />
    </SafeAreaView>
  );
}
