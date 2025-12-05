import { createFileRoute, Outlet, useSearch } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useGetTemplate } from "../../../hooks/useGetTemplate";
import { useEffect } from "react";

export interface INewDocumentFields {
  witness: {
    forenames: string;
    surname: string;
    homeAddress: string;
    postcode: string;
    dateOfBirth: string;
    email: string;
    mobileNumber: string;
    homeTelephoneNumber: string;
    workTelephoneNumber: string;
    preferredContactMethod: string;
    occupation: string;
  };
  statement: string;
}

export const Route = createFileRoute("/documents/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const { template: templateId } = useSearch({
    from: "/documents/new",
  });

  const template = useGetTemplate(templateId);

  const methods = useForm<INewDocumentFields>({
    defaultValues: {
      witness: {
        mobileNumber: "+44 ",
        homeTelephoneNumber: "+44 ",
        workTelephoneNumber: "+44 ",
      },
    },
  });

  useEffect(() => {
    if (template?.statement) methods.setValue("statement", template.statement);
  }, [template]);

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
        <Outlet />
      </form>
    </FormProvider>
  );
}
