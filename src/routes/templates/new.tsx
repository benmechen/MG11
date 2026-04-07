import { mdiArrowLeft, mdiCheck } from "@mdi/js";
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import {
  IcPageHeader,
  IcBreadcrumbGroup,
  IcBreadcrumb,
  IcButton,
  SlottedSVG,
  IcSectionContainer,
  IcTypography,
  IcTextField,
} from "@ukic/react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../components/app-context";

export interface INewTemplateFields {
  name: string;
  statement: string;
  description?: string;
}

export const Route = createFileRoute("/templates/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const { templateService } = useAppContext();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { register, handleSubmit } = useForm<INewTemplateFields>();

  const onSubmit = async (data: INewTemplateFields) => {
    await templateService.create({
      name: data.name,
      statement: data.statement,
      description: data.description,
    });
    router.navigate({ to: "/templates" });
  };

  return (
    <div className="h-full flex flex-col">
      <IcPageHeader
        heading="Create Template"
        subheading="Create a new statement template"
        aligned="full-width"
        size="small"
        sticky
      >
        <IcBreadcrumbGroup slot="breadcrumbs">
          <IcBreadcrumb pageTitle="Home" href="/" />
          <IcBreadcrumb pageTitle="Templates" href="/templates" />
          <IcBreadcrumb
            current
            pageTitle="Create Template"
            href="/templates/new"
          />
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
          variant="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
          <SlottedSVG path={mdiCheck} slot="right-icon" />
        </IcButton>
      </IcPageHeader>
      <div className="grow p-4 bg-ic-architectural-40 dark:bg-ic-architectural-700 flex flex-col gap-4 items-center">
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
  );
}
