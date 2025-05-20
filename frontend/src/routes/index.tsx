import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/Home";
import Navbar from "@/components/Navbar";

export const Route = createFileRoute("/")({
  component: component,
});

function component() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}
