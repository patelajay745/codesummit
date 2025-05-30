import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAllProblems } from "@/queries/problemQueries";

export const Route = createFileRoute("/sync")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { authUser, checkAuth } = useAuthStore();
  const { isFetched, refetch } = useAllProblems();

  useEffect(() => {
    const sync = async () => {
      await checkAuth();

      if (!authUser) {
        navigate({ to: "/signin" });
        return;
      }

      if (!isFetched) {
        const { data } = await refetch();
        if (!data || data.length === 0) {
          return;
        }
      }

      navigate({ to: "/dashboard" });
    };

    sync();
  }, [authUser]);

  return <div>Syncing...</div>;
}
