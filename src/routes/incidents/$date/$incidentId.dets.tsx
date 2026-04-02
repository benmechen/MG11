import { createFileRoute } from "@tanstack/react-router";
import {
  IcBreadcrumb,
  IcBreadcrumbGroup,
  IcButton,
  IcPageHeader,
  IcTypography,
  SlottedSVG,
  IcSectionContainer,
  IcToast,
  IcToastRegion,
  IcLoadingIndicator,
  IcNavigationItem,
  IcSelect,
  IcAlert,
} from "@ukic/react";
import {
  mdiContentCopy,
  mdiExportVariant,
} from "@mdi/js";
import { useRef, useState } from "react";
import { NewPersonModal } from "../../../components/incidents/new/new-person-modal";
import { GenericForm } from "../../../components/incidents/dets/generic-form";
/*import { useLiveQuery } from "dexie-react-hooks";*/
import { DeleteIncidentModal } from "../../../components/incidents/new/delete-incident-modal";
import { DeleteButton } from "../../../components/delete-button";
/*import { useAppContext } from "../../../components/app-context";*/
import { FormSectionContainer } from "../../../components/statements/new/form-section-container";

export const Route = createFileRoute("/incidents/$date/$incidentId/dets")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const incident = await context.incidentService.findByCad(
      Number(params.incidentId),
      params.date
    );

    return incident;
  },
});

function RouteComponent() {
  /*const { personService, statementService } = useAppContext();*/
  const incident = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const [showNewPerson, setShowNewPerson] = useState(false);
  const [showDeleteIncident, setShowDeleteIncident] = useState(false);
  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const toastEl = useRef<HTMLIcToastElement | null>(null);

  const [detsType, setDetsType] = useState<"generic" | "domestic" | "vulnerable">()

  const options = [
    { label: "Generic Investigation", value: "generic" },
    { label: "Domestic Investigation", value: "domestic" },
    { label: "Vulnerable Person Investigation", value: "vulnerable" },
  ];

  /*const people = useLiveQuery(
    () => incident && personService.findByIncident(incident.id)
  );*/

  const formattedCAD = incident
    ? `${incident.cadNumber.toString().padStart(6, "0")}/${incident.date.replaceAll("-", "")}`
    : "";

  const showToast = () => {
    if (toastRegionEl.current && toastEl.current) {
      toastRegionEl.current.openToast = toastEl.current;
    }
  };

  const copyCADToClipboard = async () => {
    if (!incident) return;
    try {
      await navigator.clipboard.writeText(formattedCAD);
      showToast();
    } catch (err) {
      console.error("Failed to copy CAD to clipboard:", err);
    }
  };

  if (!incident) return <IcLoadingIndicator fullWidth />;

  return (
    <>
      <IcToastRegion ref={toastRegionEl}>
        <IcToast
          heading="Copied to clipboard"
          variant="success"
          dismissMode="automatic"
          ref={toastEl}
        />
      </IcToastRegion>
      <NewPersonModal
        incidentId={incident?.id}
        open={showNewPerson}
        onClose={() => setShowNewPerson(false)}
      />
      <DeleteIncidentModal
        id={incident.id}
        formattedCAD={formattedCAD}
        open={showDeleteIncident}
        onClose={() => {
          setShowDeleteIncident(false);
          navigate({ to: "/incidents" });
        }}
      />
      <div className="h-full bg-ic-architectural-40 dark:bg-ic-architectural-700">
        <IcPageHeader
          heading={`CAD ${formattedCAD}`}
          subheading={incident?.location ?? "Unknown location"}
          aligned="full-width"
        >
          <IcButton
            slot="heading-adornment"
            variant="icon"
            onClick={copyCADToClipboard}
          >
            <SlottedSVG viewBox="0 0 24 24" path={mdiContentCopy} />
          </IcButton>
          <IcBreadcrumbGroup slot="breadcrumbs">
            <IcBreadcrumb pageTitle="Home" href="/" />
            <IcBreadcrumb pageTitle="Incidents" href="/incidents" />
            <IcBreadcrumb
              current
              pageTitle={`CAD ${incident?.cadNumber}/${incident?.date.replaceAll("-", "")}`}
              href={`/incidents/${incident?.date}/${incident?.cadNumber}`}
            />
          </IcBreadcrumbGroup>
          <IcButton slot="actions" variant="secondary">
            Export
            <SlottedSVG
              slot="right-icon"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiExportVariant}
            />
          </IcButton>
          <DeleteButton onClick={() => setShowDeleteIncident(true)} />
          <IcNavigationItem 
            slot="tabs" 
            label="Overview" 
            href={`/incidents/${incident?.date}/${incident?.cadNumber}/overview`} 
          />
          <IcNavigationItem 
            slot="tabs" 
            label="Dets" 
            href={`/incidents/${incident?.date}/${incident?.cadNumber}/dets`}
            selected
          />
        </IcPageHeader>
        <IcSectionContainer aligned="center">
          <FormSectionContainer>
            <div className="flex flex-col gap-4">
              <IcTypography variant="h2">Investigation Dets</IcTypography>
              <IcAlert
                variant="info"
                heading="Did you know?"
                message="This form is automatically saved to your browser as you type"
              />              
              <IcSelect
                placeholder="Select dets template..." 
                label="Dets Template"
                options={options}
                onIcChange={(event) => setDetsType(event.detail.value as "generic" | "domestic" | "vulnerable")}
              />

              {detsType === "generic" && (<GenericForm />)}
            </div>
          </FormSectionContainer>
        </IcSectionContainer>
      </div>
    </>
  );
}
