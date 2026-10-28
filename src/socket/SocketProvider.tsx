import { socket } from "./socket";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { registerSocketListners } from "./registersListeners";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) return;
    const cleanup = registerSocketListners(socket);
    socket.connect();

    return () => {
      cleanup();
      socket.disconnect();
    };
  }, [isAuthenticated]);
  return <>{children}</>;
}
