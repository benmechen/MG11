import {
  createFileRoute,
  useRouter,
  useCanGoBack,
} from "@tanstack/react-router";
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
import { mdiArrowLeft, mdiCheck, mdiPlus } from "@mdi/js";
import { useFieldArray, useFormContext } from "react-hook-form";
import { INewIncidentFields, NewIncidentContext } from "./route";
import { IcDatePicker } from "@ukic/canary-react";
import { NewPersonForm } from "../../../components/people/new/form";
import { useContext } from "react";

export const Route = createFileRoute("/incidents/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { onSubmit } = useContext(NewIncidentContext);
  const canGoBack = useCanGoBack();
  const { register, setValue, handleSubmit } =
    useFormContext<INewIncidentFields>();
  const { fields, append, remove } = useFieldArray({
    name: "people",
  });

  return (
    <div className="h-full flex flex-col">
      <IcPageHeader
        heading="Create Incident"
        subheading="Create a new incident folder"
        aligned="full-width"
        size="small"
        sticky
      >
        <IcBreadcrumbGroup slot="breadcrumbs">
          <IcBreadcrumb pageTitle="Home" href="/" />
          <IcBreadcrumb pageTitle="Incidents" href="/incidents" />
          <IcBreadcrumb
            current
            pageTitle="Create Incident"
            href="/incidents/new"
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
        <IcNavigationItem 
          slot="tabs" 
          label="Overview" 
          href="#" 
          selected 
        />
        <IcNavigationItem 
          slot="tabs" 
          label="Dets" 
          href="#" 
        />
      </IcPageHeader>
      <div className="grow w-full p-4 bg-ic-architectural-40 dark:bg-ic-architectural-700 flex flex-col gap-4 items-center">
        <IcSectionContainer
          className="w-2/3 bg-ic-architectural-white dark:bg-ic-background-primary rounded-lg p-4"
          aligned="center"
        >
          <div className="flex flex-col gap-4">
            <IcTypography variant="h4" className="mb-2">
              Incident Details
            </IcTypography>
            <IcTextField
              label="ID"
              helperText="CAD incident number"
              required
              placeholder="000000"
              {...register("cadNumber")}
            />
            <div className="flex items-end gap-2">
              {/* @ts-expect-error Incorrect typing between ICDS and react-hook-form */}
              <IcDatePicker
                label="Date"
                helperText="CAD incident date"
                required
                {...register("date")}
              />
              <IcButton
                variant="tertiary"
                onClick={() => setValue("date", new Date())}
              >
                Today
              </IcButton>
            </div>
            <IcTextField
              label="Location"
              helperText="House, road, post code"
              placeholder="123 Upper Street, N1"
              {...register("location")}
            />
          </div>
        </IcSectionContainer>

        {fields.map((field, index) => (
          <IcSectionContainer
            key={field.id}
            className="w-2/3 bg-ic-architectural-white dark:bg-ic-background-primary rounded-lg p-4"
            aligned="center"
          >
            <NewPersonForm
              index={index}
              fieldPrefix={`people.${index}.`}
              register={register}
              onClose={() => remove(index)}
            />
          </IcSectionContainer>
        ))}

        <div className="w-2/3">
          <IcButton variant="tertiary" onClick={() => append({})}>
            Add Person
            <SlottedSVG path={mdiPlus} slot="icon" />
          </IcButton>
        </div>
      </div>
    </div>
  );
}
