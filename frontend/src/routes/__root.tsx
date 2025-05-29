import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import BackgroundDrop from "../components/BackgroundDrop";
import Navbar from "@/components/Navbar";
import { User } from "@/stores/useAuthStore";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import useThemeStore from "@/stores/useThemeStore";

interface MyRouterContext {
  auth: User | null;
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: myComponent,
});

function myComponent() {
  const { theme } = useThemeStore();
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          variables: {
            colorPrimary:
              theme === "dark"
                ? "rgba(34, 130, 204, 1)"
                : "rgba(76, 70, 70, 1)", // Example: violet / indigo
            // colorBackground: theme === "dark" ? "#0f172a" : "#ffffff",
            colorText: theme === "dark" ? "#f1f5f9" : "#0f172a",
          },
          elements: {
            card: "shadow-xl rounded-2xl", // tailwind-like classes
            formButtonPrimary: "bg-violet-600 hover:bg-red-500",
            headerTitle: "text-2xl font-bold",
          },
        }}
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
      >
        <BackgroundDrop />
        <Navbar />
        <Outlet />
        <TanStackRouterDevtools />
        <Toaster richColors />
      </ClerkProvider>
    </>
  );
}
