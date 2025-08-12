import Loading from "@/components/ui/loading";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <Outlet />,
  pendingComponent: Loading,
  pendingMs: 200,
});
