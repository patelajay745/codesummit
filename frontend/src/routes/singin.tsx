import { createFileRoute, redirect } from "@tanstack/react-router";
import SignIn from "../pages/SignIn";

export const Route = createFileRoute("/singin")({
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
  component: SignIn,
});
