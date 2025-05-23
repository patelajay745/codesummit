import AddProblem from "@/pages/AddProblem";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/addproblem")({
  beforeLoad: ({ context }) => {
    if (context.auth?.role !== "ADMIN") {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: AddProblem,
});
