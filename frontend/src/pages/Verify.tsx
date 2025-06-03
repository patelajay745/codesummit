import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

const Verify = () => {
  const { id } = useParams({ strict: false });
  const { verify } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    verify(id);
    navigate({ to: "/dashboard" });
  }, [id]);

  return <div>{id}</div>;
};

export default Verify;
