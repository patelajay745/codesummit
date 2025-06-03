import Dashboard from "@/pages/Dashboard";
import { createFileRoute, redirect } from "@tanstack/react-router";

function RouteComponent() {
  return <Dashboard />;
}

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({
        to: "/signin",
      });
    }
  },
  component: RouteComponent,
});
