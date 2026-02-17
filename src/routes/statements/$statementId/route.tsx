import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { INewPersonForm } from "../../../components/incidents/new/new-person-modal";
import { isValidId } from "../../../utils/isValidId";

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
      params.statementId!
    );

    if (!statement.templateId) return { statement };

    const template = await context.templateService.getById(
      statement.templateId!
    );

    return {
      template,
      statement,
    };
  },
});

function RouteComponent() {
  const { template, statement } = Route.useLoaderData();

  const methods = useForm<INewDocumentFields>({
    defaultValues: {
      witness: {
        ...statement?.person,
        phoneNumber: statement?.person?.phoneNumber || "+44 ",
        dateOfBirth: statement?.person?.dateOfBirth
          ? new Date(statement.person.dateOfBirth)
          : undefined,
      },
      statement: statement?.statement || template?.statement || "",
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
