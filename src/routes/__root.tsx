import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { SideNavigation } from "../components/side-navigation";
import { AppContextType } from "../components/app-context";

export const Route = createRootRouteWithContext<AppContextType>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <main className="!flex max-h-screen h-screen w-screen max-w-screen">
      <SideNavigation />
      <div className="max-w-full w-full overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
}
