import Sheet from "@/pages/Sheet";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sheet")({
  component: Sheet,
});
