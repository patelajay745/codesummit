import Premium from "@/pages/Premium";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/premium")({
  component: Premium,
});
