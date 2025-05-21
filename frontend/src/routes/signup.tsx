import { createFileRoute, redirect } from "@tanstack/react-router";
import SignUp from "../pages/SignUp";

export const Route = createFileRoute("/signup")({
  beforeLoad: ({ context, location }) => {
    if (context.auth) {
      throw redirect({
        to: "/dashboard",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: SignUp,
});
