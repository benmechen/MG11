import { Outlet, createRootRoute } from "@tanstack/react-router";
import { SideNavigation } from "../components/side-navigation";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main className="flex max-h-screen w-full">
      <SideNavigation />
      <div className="grow w-full overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
}
