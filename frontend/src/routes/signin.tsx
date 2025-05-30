import { createFileRoute, redirect } from "@tanstack/react-router";
import SignIn from "../pages/SignIn";

export const Route = createFileRoute("/signin")({
  beforeLoad: ({ context }) => {
    if (context.auth) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: SignIn,
});
