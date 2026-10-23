import "@/global.css";
import { useEffect } from "react";
import { db } from "@/db/client";
import AuthSaplash from "./(auth)/authsplash";
import { useAuthStore } from "@/store/auth-store";
import migrations from "../../drizzle/migrations";
import { Slot, useRouter, useSegments } from "expo-router";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useToast } from "@/store/toast-store";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const createToast = useToast((s) => s.createToast);
  const isLoading = useAuthStore((s) => s.isLoading);
  const { success, error } = useMigrations(db, migrations);
  const restoreSession = useAuthStore((s) => s.restoreSession);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    restoreSession();
  }, []);

  useEffect(() => {
    if (error) createToast(`Failed to process DB migrations`);
  }, [error]);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/auth");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(app)/(tabs)/contacts");
    }
  }, [isLoading, isAuthenticated, segments]);

  if (isLoading || !success) return <AuthSaplash />;
  return <Slot />;
}
