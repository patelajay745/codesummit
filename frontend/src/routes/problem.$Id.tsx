import Problem from "@/pages/Problem";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/problem/$Id")({
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({
        to: "/singin",
      });
    }
  },
  component: Problem,
});
