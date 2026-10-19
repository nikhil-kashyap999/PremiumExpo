import Toast from "@/components/toast";
import { useToast } from "@/store/toast-store";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthSaplash from "../(auth)/authsplash";

export default function TestScreen() {
  const show = useToast(s=>s.createToast);

  return (
    <AuthSaplash/>
  );
}
