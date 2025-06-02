import { useAuthStore } from "@/stores/useAuthStore";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/logout")({
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/logout" });
  const { logOut } = useAuthStore();

  useEffect(() => {
    try {
      logOut();
      navigate({ to: "/" });
    } catch (error) {}
  }, []);

  return <></>;
}
