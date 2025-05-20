import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import BackgroundDrop from "../components/BackgroundDrop";
import Navbar from "@/components/Navbar";

interface MyRouterContext {
  auth: null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <BackgroundDrop />
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
