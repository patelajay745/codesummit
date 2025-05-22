import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/addproblem")({
  beforeLoad: ({ context }) => {
    if (!context.auth) {
      throw redirect({
        to: "/singin",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/addproblem"!</div>;
}
