import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import BackgroundDrop from "../components/BackgroundDrop";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <BackgroundDrop />
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
