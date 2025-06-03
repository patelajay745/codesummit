import Verify from "@/pages/Verify";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/verify/$id")({
  component: Verify,
});
