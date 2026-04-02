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
} from "@ukic/react";
import {
  mdiAccount,
  mdiContentCopy,
  mdiExportVariant,
  mdiFileDocument,
  mdiPlus,
} from "@mdi/js";
import { PersonCard } from "../../../components/incidents/new/person-card";
import { useRef, useState } from "react";
import { NewPersonModal } from "../../../components/incidents/new/new-person-modal";
import { useLiveQuery } from "dexie-react-hooks";
import { DeleteIncidentModal } from "../../../components/incidents/new/delete-incident-modal";
import { DeleteButton } from "../../../components/delete-button";
import { useAppContext } from "../../../components/app-context";
import { StatementCard } from "../../../components/incidents/new/statement-card";

export const Route = createFileRoute("/incidents/$date/$incidentId")({
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
  const { personService, statementService } = useAppContext();
  const incident = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const [showNewPerson, setShowNewPerson] = useState(false);
  const [showDeleteIncident, setShowDeleteIncident] = useState(false);
  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const toastEl = useRef<HTMLIcToastElement | null>(null);

  const people = useLiveQuery(
    () => incident && personService.findByIncident(incident.id)
  );

  const statements = useLiveQuery(
    () => incident && statementService.findByIncident(incident.id)
  );

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
      <div className="h-fit bg-ic-architectural-40 dark:bg-ic-architectural-700">
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
            selected 
          />
          <IcNavigationItem 
            slot="tabs" 
            label="Dets" 
            href={`/incidents/${incident?.date}/${incident?.cadNumber}/dets`} 
          />
        </IcPageHeader>
        <IcSectionContainer aligned="center">
          <IcTypography variant="h4" className="flex items-center gap-2">
            <SlottedSVG
              height="24"
              viewBox="0 0 24 24"
              width="24"
              path={mdiAccount}
            />
            People
          </IcTypography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {people?.map((person, index) => (
              
              <PersonCard key={person.id} person={person} index={index} />
            ))}
            <div
              className="min-h-96 h-full w-full rounded border-dashed text-ic-action-default border-ic-architectural-400 cursor-pointer flex flex-col items-center justify-center hover:border-ic-action-default hover:bg-button-default-background-hover transition-colors duration-100"
              onClick={() => setShowNewPerson(true)}
            >
              <SlottedSVG
                path={mdiPlus}
                height="24"
                width="24"
                viewBox="0 0 24 24"
                color="currentColor"
                className="text-ic-action-default"
              />
              New Person
            </div>
          </div>
        </IcSectionContainer>
        <IcSectionContainer aligned="center">
          <IcTypography variant="h4" className="flex items-center gap-2">
            <SlottedSVG
              height="24"
              width="24"
              viewBox="0 0 24 24"
              path={mdiFileDocument}
            />
            Statements
          </IcTypography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statements?.map((statement) => (
              <StatementCard
                key={statement.id}
                id={statement.id}
                personId={statement.personId}
                created={new Date(statement.created)}
                lastUpdate={new Date(statement.updated)}
                status={statement.status}
              />
            ))}
            <div
              className="min-h-96 h-full w-full rounded border-dashed text-ic-action-default border-ic-architectural-400 cursor-pointer flex flex-col items-center justify-center hover:border-ic-action-default hover:bg-button-default-background-hover transition-colors duration-100"
              onClick={() =>
                navigate({
                  to: "/statements/new",
                  search: { incidentId: incident?.id },
                })
              }
            >
              <SlottedSVG
                path={mdiPlus}
                height="24"
                width="24"
                viewBox="0 0 24 24"
                color="currentColor"
                className="text-ic-action-default"
              />
              New Statement
            </div>
          </div>
        </IcSectionContainer>
      </div>
    </>
  );
}
