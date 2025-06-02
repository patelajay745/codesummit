import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export const AuthWatcher = () => {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return null;
};
