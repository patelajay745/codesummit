import Dashboard from "@/pages/Dashboard";
import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return <Dashboard />;
}

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});
