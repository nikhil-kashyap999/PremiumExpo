import * as SecureStorage from "expo-secure-store";

export const TokenStorage = {
  async setTokens(accessToken: string, refreshToken: string) {
    await SecureStorage.setItemAsync("accessToken", accessToken);
    await SecureStorage.setItemAsync("refreshToken", refreshToken);
  },
  async getAccessToken() {
    return SecureStorage.getItemAsync("accessToken");
  },
  async getRefreshToken() {
    return SecureStorage.getItemAsync("refreshToken");
  },
  async clearTokens() {
    await SecureStorage.deleteItemAsync("accessToken");
    await SecureStorage.deleteItemAsync("refreshToken");
  },
};
