import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import { Loader } from "lucide-react";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

export default function App() {
  const { authUser: auth, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !auth) {
    return (
      <div className="flex itmes-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return <RouterProvider router={router} context={{ auth }} />;
}
