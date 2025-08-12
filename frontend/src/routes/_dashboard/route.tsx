import Nav from "@/components/layout/nav";
import { getToken } from "@/store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const token = getToken();
    console.log("Dashboard route beforeLoad", token);
    if (!token) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-rose-100 to-teal-100">
      <Nav />
      <main className="flex-1 py-4">
        <Outlet />
      </main>
    </div>
  );
}
