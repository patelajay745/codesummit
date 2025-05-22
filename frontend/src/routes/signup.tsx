import { createFileRoute, redirect } from "@tanstack/react-router";
import SignUp from "../pages/SignUp";

export const Route = createFileRoute("/signup")({
  beforeLoad: ({ context }) => {
    if (context.auth) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: SignUp,
});
