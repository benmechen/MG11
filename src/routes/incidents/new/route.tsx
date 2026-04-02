import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { createContext } from "react";
import { IncidentService } from "../../../services/incident/incident";
import { db } from "../../../db";
import { PersonDto } from "../../../services/person/personDto";

export interface INewIncidentFields {
  cadNumber: number;
  date: Date;
  location?: string;
  people?: PersonDto[];
}

interface IncidentRouteContext {
  onSubmit: (data: INewIncidentFields) => void;
}

export const NewIncidentContext = createContext<IncidentRouteContext>({
  onSubmit: () => console.log("No onSubmit provided"),
});

export const Route = createFileRoute("/incidents/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const incidentService = new IncidentService(db);
  const methods = useForm<INewIncidentFields>();
  const navigate = useNavigate();

  const onSubmit = async (data: INewIncidentFields) => {
    await incidentService.create({
      cadNumber: data.cadNumber,
      date: data.date,
      location: data.location,
      people: data.people,
    });
    navigate({
      to: "/incidents/$date/$incidentId",
      params: {
        date: incidentService.dateToString(data.date),
        incidentId: String(data.cadNumber),
      },
    });
  };

  return (
    <NewIncidentContext.Provider value={{ onSubmit }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
          <Outlet />
        </form>
      </FormProvider>
    </NewIncidentContext.Provider>
  );
}
