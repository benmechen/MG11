import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { INewPersonForm } from "../../../components/incidents/new/new-person-modal";
import { isValidId } from "../../../utils/isValidId";
import Handlebars from "handlebars";
import { useMemo } from "react";
import Incident from "../../../db/models/incident";
import { templateStatement } from "../../../utils/statementTemplate";

export interface INewDocumentFields {
  witness: INewPersonForm & {
    occupation?: string;
  };
  incident?: string;
  statement: string;
}

export const Route = createFileRoute("/statements/$statementId")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    if (!isValidId(params.statementId)) return {};

    const statement = await context.statementService.getById(
      params.statementId!,
    );

    if (!statement.templateId) return { statement };

    const template = await context.templateService.getById(
      statement.templateId!,
    );

    let incident: Incident | undefined;
    if (statement.incidentId)
      incident = await context.incidentService.findById(statement.incidentId!);

    return {
      template,
      statement,
      incident,
    };
  },
});

function RouteComponent() {
  const { template, statement, incident } = Route.useLoaderData();
  const { incidentService } = Route.useRouteContext();

  const statementTemplate = useMemo(
    () => Handlebars.compile(statement?.statement || template?.statement || ""),
    [statement, template],
  );

  const methods = useForm<INewDocumentFields>({
    defaultValues: {
      witness: {
        ...statement?.person,
        phoneNumber: statement?.person?.phoneNumber || "+44 ",
        dateOfBirth:
          statement?.person?.dateOfBirth &&
          statement?.person?.dateOfBirth.length > 0
            ? new Date(statement.person.dateOfBirth)
            : undefined,
        over18: !statement?.person?.dateOfBirth,
      },
      statement: templateStatement(
        statementTemplate,
        incidentService,
        incident,
      ),
      incident: statement?.incident
        ? `${statement.incident.cadNumber}/${statement.incident.date}`
        : undefined,
    },
  });

  const onSubmit = (data: INewDocumentFields) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
        <Outlet />
      </form>
    </FormProvider>
  );
}
