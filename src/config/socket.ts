import Constants from "expo-constants";
import { Platform } from "react-native";

const getSocketUrl = ()=>{
    if(__DEV__){
        const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
        if(Platform.OS === "android" && !debuggerHost) return "http://10.0.2.2:3000";
        return `http://${debuggerHost}:3001`;
    }
};

export const SOCKET_URL = getSocketUrl();