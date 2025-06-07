import Profile from "@/pages/Profile";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({
        to: "/signin",
      });
    }
  },
  component: Profile,
});
