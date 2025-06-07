import CircularLoader from "@/components/ui/snappy-loader";
import { useFullFillCheckout } from "@/queries/paymentQuires";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/success")({
  component: RouteComponent,
});

function RouteComponent() {
  const search = useSearch({ strict: false });
  const sessionId = search.session_id;
  const { mutate: fullfillOut, isPending: isLoading } = useFullFillCheckout();

  useEffect(() => {
    fullfillOut(sessionId);
  }, [sessionId]);

  if (isLoading) return <CircularLoader />;
  
  return <div>Hello {sessionId}</div>;
}
