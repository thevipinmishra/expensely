import Loading from "@/components/ui/loading";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
  pendingComponent: Loading,
  pendingMs: 200,
});
