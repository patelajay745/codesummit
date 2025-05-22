import AddProblem from "@/pages/AddProblem";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/addproblem")({
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({
        to: "/singin",
      });
    }
  },
  component: AddProblem,
});
