import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import {
  IcBreadcrumb,
  IcBreadcrumbGroup,
  IcButton,
  IcPageHeader,
  SlottedSVG,
  IcLoadingIndicator,
  IcNavigationItem,
  IcMenuItem,
  IcPopoverMenu,
  IcTypography,
  IcTextField,
} from "@ukic/react";
import {
  mdiCheck,
  mdiContentCopy,
  mdiEmail,
  mdiExportVariant,
  mdiPencil,
  mdiText,
} from "@mdi/js";
import { useRef, useState } from "react";
import { DeleteIncidentModal } from "../../../../components/incidents/new/delete-incident-modal";
import { DeleteButton } from "../../../../components/delete-button";
import { formatEmail } from "../../../../utils/formatEmail";
import { useLiveQuery } from "dexie-react-hooks";
import { useAppContext } from "../../../../components/app-context";

export const Route = createFileRoute("/incidents/$date/$incidentId")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const incident = await context.incidentService.findByCad(
      Number(params.incidentId),
      params.date,
    );

    return incident;
  },
});

function RouteComponent() {
  const { personService, incidentService } = useAppContext();
  const incident = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const [showDeleteIncident, setShowDeleteIncident] = useState(false);
  const [exportPopoverOpen, setExportPopoverOpen] = useState<boolean>(false);
  const [isEditingLocation, setEditingLocation] = useState(false);
  const [location, setLocation] = useState(incident?.location);
  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const toastEl = useRef<HTMLIcToastElement | null>(null);

  const formattedCAD = incident
    ? `${incident.cadNumber.toString().padStart(6, "0")}/${incident.date.replaceAll("-", "")}`
    : "";

  const people = useLiveQuery(
    () => incident && personService.findByIncident(incident.id),
  );

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

  const handlePopoverToggled = () => setExportPopoverOpen((value) => !value);
  const handlePopoverClosed = () => setExportPopoverOpen(false);

  const handleLocationUpdate = () => {
    setEditingLocation(false);
    if (location !== incident?.location && incident) {
      // Update local state immediately for responsiveness
      incident.location = location;
      incidentService.update(incident?.id, { location });
    }
  };

  const openEmail = async () => {
    if (!incident) return;
    // Refetch incident to ensure we have the latest data, including any recent updates to dets or people
    const updatedIncident = await incidentService.findById(incident?.id);

    if (!updatedIncident) return;

    const url = formatEmail(updatedIncident, people ?? []);
    window.open(url, "_blank");
  };

  const matchRoute = useMatchRoute();

  if (!incident) return <IcLoadingIndicator fullWidth />;

  if (matchRoute({ to: "/incidents/$date/$incidentId/export" })) {
    return <Outlet />;
  }

  return (
    <>
      <DeleteIncidentModal
        id={incident.id}
        formattedCAD={formattedCAD}
        open={showDeleteIncident}
        onClose={() => {
          setShowDeleteIncident(false);
          navigate({ to: "/incidents" });
        }}
      />
      <IcPopoverMenu
        anchor="export-button"
        aria-label="popover"
        open={exportPopoverOpen}
        onIcPopoverClosed={handlePopoverClosed}
      >
        <IcMenuItem label="Email" onClick={openEmail}>
          <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiEmail} />
        </IcMenuItem>
        <IcMenuItem label="Plain text" href="export">
          <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiText} />
        </IcMenuItem>
      </IcPopoverMenu>

      <div className="min-h-full bg-ic-architectural-40 dark:bg-ic-architectural-700">
        <IcPageHeader heading={`CAD ${formattedCAD}`} aligned="full-width">
          <IcButton
            slot="heading-adornment"
            variant="icon"
            onClick={copyCADToClipboard}
          >
            <SlottedSVG viewBox="0 0 24 24" path={mdiContentCopy} />
          </IcButton>
          <div slot="subheading" className="flex items-center gap-2">
            {isEditingLocation ? (
              <>
                <IcTextField
                  label="Location"
                  placeholder="Location"
                  size="small"
                  hideLabel
                  value={location}
                  onIcChange={(e) => setLocation(e.detail.value)}
                />
                <IcButton
                  slot="heading-adornment"
                  variant="icon"
                  aria-label="Save"
                  onClick={handleLocationUpdate}
                >
                  <SlottedSVG viewBox="0 0 24 24" path={mdiCheck} />
                </IcButton>
              </>
            ) : (
              <>
                <IcTypography>{location ?? "Unknown location"}</IcTypography>
                <IcButton
                  slot="heading-adornment"
                  variant="icon"
                  aria-label="Edit"
                  onClick={() => setEditingLocation(true)}
                >
                  <SlottedSVG viewBox="0 0 24 24" path={mdiPencil} />
                </IcButton>
              </>
            )}
          </div>
          <IcBreadcrumbGroup slot="breadcrumbs">
            <IcBreadcrumb pageTitle="Home" href="/" />
            <IcBreadcrumb pageTitle="Incidents" href="/incidents" />
            <IcBreadcrumb
              current
              pageTitle={`CAD ${incident?.cadNumber}/${incident?.date.replaceAll("-", "")}`}
              href={`/incidents/${incident?.date}/${incident?.cadNumber}/overview`}
            />
          </IcBreadcrumbGroup>
          <IcButton
            id="export-button"
            slot="actions"
            variant="secondary"
            onClick={handlePopoverToggled}
          >
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
            selected={
              !!matchRoute({
                to: "/incidents/$date/$incidentId/overview",
              })
            }
          />
          <IcNavigationItem
            slot="tabs"
            label="Dets"
            href={`/incidents/${incident?.date}/${incident?.cadNumber}/dets`}
            selected={
              !!matchRoute({
                to: "/incidents/$date/$incidentId/dets",
              })
            }
          />
        </IcPageHeader>
        <Outlet />
      </div>
    </>
  );
}
