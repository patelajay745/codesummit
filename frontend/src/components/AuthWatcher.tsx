import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthStore } from "@/stores/useAuthStore";

export const AuthWatcher = () => {
  const { isSignedIn } = useAuth();
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    if (isSignedIn) {
      checkAuth();
    } else {
      useAuthStore.getState().logOut();
    }
  }, [isSignedIn]);

  return null;
};
