import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import {
  IcBreadcrumb,
  IcBreadcrumbGroup,
  IcButton,
  IcPageHeader,
  IcSectionContainer,
  IcTextField,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";
import { useAppContext } from "../../components/app-context";
import { mdiArrowLeft, mdiCheck, mdiDelete } from "@mdi/js";
import { INewTemplateFields } from "./new";
import { useState } from "react";
import { DeleteTemplateModal } from "../../components/templates/delete-template-modal";

export interface ITemplateFormFields {
  name: string;
  statement: string;
  description?: string;
}

export const Route = createFileRoute("/templates/$templateId")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const template = await context.templateService.getById(params.templateId);
    return template;
  },
});

function RouteComponent() {
  const { templateService } = useAppContext();
  const template = Route.useLoaderData();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const [showDeleteTemplate, setShowDeleteTemplate] = useState(false);

  const { register, handleSubmit } = useForm<INewTemplateFields>({
    defaultValues: {
      name: template?.name,
      statement: template?.statement,
      description: template?.description,
    },
  });

  const onSubmit = async (data: INewTemplateFields) => {
    if (!template) return;

    await templateService.update(template.id, {
      name: data.name,
      statement: data.statement,
      description: data.description,
    });
  };

  if (!template) {
    return (
      <div className="p-4">
        <IcTypography variant="h3">Template not found</IcTypography>
      </div>
    );
  }

  return (
    <>
      <DeleteTemplateModal
        open={showDeleteTemplate}
        id={template.id}
        name={template.name}
        onClose={() => {
          setShowDeleteTemplate(false);
          router.navigate({ to: "/templates" });
        }}
      />
      <div className="h-full flex flex-col">
        <IcPageHeader
          heading={`Edit Template: "${template?.name}"`}
          subheading="Edit your statement template"
          aligned="full-width"
          size="small"
          sticky
        >
          <IcBreadcrumbGroup slot="breadcrumbs">
            <IcBreadcrumb pageTitle="Home" href="/" />
            <IcBreadcrumb pageTitle="Templates" href="/templates" />
            <IcBreadcrumb current pageTitle={""} href="/templates/new" />
          </IcBreadcrumbGroup>

          {canGoBack ? (
            <IcButton
              slot="actions"
              variant="tertiary"
              onClick={() => router.history.back()}
            >
              Back
              <SlottedSVG path={mdiArrowLeft} slot="icon" />
            </IcButton>
          ) : null}
          <IcButton
            slot="actions"
            variant="destructive"
            onClick={() => setShowDeleteTemplate(true)}
          >
            Delete
            <SlottedSVG path={mdiDelete} slot="right-icon" />
          </IcButton>
          <IcButton
            slot="actions"
            variant="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Save
            <SlottedSVG path={mdiCheck} slot="right-icon" />
          </IcButton>
        </IcPageHeader>
        <div className="grow w-full p-4 bg-ic-architectural-40 dark:bg-ic-architectural-700 flex flex-col gap-4 items-center">
          <IcSectionContainer
            className="w-2/3 bg-ic-architectural-white dark:bg-ic-background-primary rounded-lg p-4"
            aligned="center"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="h-full flex flex-col gap-4"
            >
              <IcTypography variant="h4" className="mb-2">
                Template Details
              </IcTypography>
              <IcTextField
                label="Name"
                helperText="Template name"
                required
                {...register("name")}
              />
              <IcTextField
                label="Description"
                helperText="Template description"
                {...register("description")}
              />
              <IcTextField
                label="Statement Template"
                rows={40}
                resize
                fullWidth
                spellcheck
                required
                {...register("statement")}
              />
            </form>
          </IcSectionContainer>
        </div>
      </div>
    </>
  );
}
