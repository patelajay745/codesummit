import Dashboard from "@/pages/Dashboard";
import { createFileRoute, redirect } from "@tanstack/react-router";

function RouteComponent() {
  return <Dashboard />;
}

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth) {
      throw redirect({
        to: "/singin",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});
