import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import CircularLoader from "./components/ui/snappy-loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

export const queryClient = new QueryClient();

export default function App() {
  const { authUser: auth, checkAuth, isCheckingAuth } = useAuthStore();
  const { isLoaded, userId } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      checkAuth();
    }
  }, [isLoaded, userId, checkAuth]);

  if (isCheckingAuth && !auth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularLoader />
      </div>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />{" "}
    </QueryClientProvider>
  );
}
