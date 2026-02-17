import React, { createContext, useContext, ReactNode } from "react";
import { IncidentService } from "../services/incident/incident";
import { PersonService } from "../services/person/person";
import { TemplateService } from "../services/template/template";
import { StatementService } from "../services/statement/statement";

export interface AppContextType {
  incidentService: IncidentService;
  personService: PersonService;
  templateService: TemplateService;
  statementService: StatementService;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  value: AppContextType;
  children: ReactNode;
}> = ({ value, children }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
