import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import BackgroundDrop from "../components/BackgroundDrop";
import Navbar from "@/components/Navbar";
import { User } from "@/stores/useAuthStore";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/clerk-react";

interface MyRouterContext {
  auth: User | null;
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BackgroundDrop />
        <Navbar />
        <Outlet />
        <TanStackRouterDevtools />
        <Toaster richColors />
      </ClerkProvider>
    </>
  ),
});
