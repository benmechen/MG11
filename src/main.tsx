import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AppContextType, AppProvider } from "./components/app-context";
import { db } from "./db";
import { IncidentService } from "./services/incident/incident";
import { PersonService } from "./services/person/person";
import { TemplateService } from "./services/template/template";
import { StatementService } from "./services/statement/statement";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    incidentService: undefined!,
    templateService: undefined!,
    personService: undefined!,
    statementService: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppContextValue: AppContextType = {
  incidentService: new IncidentService(db),
  personService: new PersonService(db),
  templateService: new TemplateService(db),
  statementService: new StatementService(db),
};

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppProvider value={AppContextValue}>
        <RouterProvider router={router} context={AppContextValue} />
      </AppProvider>
    </React.StrictMode>
  );
}
