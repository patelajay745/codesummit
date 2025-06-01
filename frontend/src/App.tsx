import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { useAuthStore } from "./stores/useAuthStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/clerk-react";
import useThemeStore from "./stores/useThemeStore";
import { dark } from "@clerk/themes";
import { AuthWatcher } from "./components/AuthWatcher";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export const queryClient = new QueryClient();

export default function App() {
  // const { authUser: auth, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // if (isCheckingAuth && !auth) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <CircularLoader />
  //     </div>
  //   );
  // }

  const auth = useAuthStore((s) => s.authUser);

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: {
          colorPrimary:
            theme === "dark"
              ? "rgba(34, 130, 204, 1)"
              : "rgba(34, 130, 204, 1)",
          colorBackground:
            theme === "dark" ? "rgba(76, 70, 70, .20)" : "#ffffff",
          colorText: theme === "dark" ? "#ffffff" : "#0f172a",
        },
        elements: {
          card: "shadow-xl rounded-2xl",
          formButtonPrimary: "bg-violet-600 hover:bg-violet-700",
          headerTitle: "text-2xl font-bold text-red-500",
        },
      }}
    >
      <AuthWatcher />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ auth }} />{" "}
      </QueryClientProvider>
    </ClerkProvider>
  );
}
