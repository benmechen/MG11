import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { SideNavigation } from "../components/side-navigation";
import { AppContextType } from "../components/app-context";
import { useEffect } from "react";

export const Route = createRootRouteWithContext<AppContextType>()({
  component: RootComponent,
});

function RootComponent() {
  useEffect(() => {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then((persistent) => {
        if (persistent) {
          console.log(
            "Storage will not be cleared except by explicit user action",
          );
        } else {
          console.log(
            "Storage may be cleared by the UA under storage pressure.",
          );
        }
      });
    }
  }, []);

  return (
    <main className="!flex max-h-screen h-screen w-screen max-w-screen">
      <SideNavigation />
      <div className="max-w-full w-full overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
}
