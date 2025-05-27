import UpdateProblem from "@/pages/UpdateProblem";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/updateproblem/$Id")({
  component: UpdateProblem,
});
