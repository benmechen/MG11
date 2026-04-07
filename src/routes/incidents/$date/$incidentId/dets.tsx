import { createFileRoute } from "@tanstack/react-router";
import {
  IcTypography,
  IcLoadingIndicator,
  IcSelect,
  IcAlert,
} from "@ukic/react";
import { useEffect, useState } from "react";
import { GenericForm } from "../../../../components/incidents/dets/generic-form";
import { VulnerableForm } from "../../../../components/incidents/dets/vulnerable-form";
import { DomesticForm } from "../../../../components/incidents/dets/domestic-form";
import { FormSectionContainer } from "../../../../components/statements/new/form-section-container";
import { useAppContext } from "../../../../components/app-context";

export const Route = createFileRoute("/incidents/$date/$incidentId/dets")({
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
  const incident = Route.useLoaderData();
  const { incidentService } = useAppContext();

  const [detsType, setDetsType] = useState<
    "generic" | "domestic" | "vulnerable"
  >();

  const options = [
    { label: "Generic Investigation", value: "generic" },
    { label: "Domestic Investigation", value: "domestic" },
    { label: "Vulnerable Person Investigation", value: "vulnerable" },
  ];

  useEffect(() => {
    if (detsType && incident) {
      if (incident.dets) incident.dets.type = detsType;

      incidentService.update(incident.id, {
        dets: {
          ...incident.dets,
          type: detsType,
        },
      });
    }
  }, [incident, detsType]);

  useEffect(() => {
    console.log("Incident:", incident);
    if (incident?.dets) {
      console.log(incident.dets);
      setDetsType(incident.dets.type as "generic" | "domestic" | "vulnerable");
    }
  }, [incident]);

  const showTipAlert = window.localStorage.getItem("hideExportTip") === null;

  if (!incident) return <IcLoadingIndicator fullWidth />;

  const formattedCAD = incident
    ? `${incident.cadNumber.toString()}/${incident.date.replaceAll("-", "")}`
    : "";

  const updateDets = async (data: { [key: string]: string }) => {
    if (!incident) return;
    const updatedDets = Object.entries(data).reduce(
      (acc, curr) => ({ ...acc, [`dets.${curr[0]}`]: curr[1] }),
      {},
    );
    console.log("Autosaving data:", updatedDets);
    await incidentService.update(incident.id, updatedDets as any);
  };

  return (
    <FormSectionContainer>
      <div className="flex flex-col gap-4">
        <IcTypography variant="h2">Investigation Dets</IcTypography>
        {showTipAlert && (
          <IcAlert
            variant="info"
            message="This form is automatically saved to your browser as you type. It can be exported to an email using the 'Export' button at the top of the page."
            dismissible
            onIcDismiss={() =>
              window.localStorage.setItem("hideExportTip", "true")
            }
          />
        )}
        <IcSelect
          placeholder="Select dets template..."
          label="Dets Template"
          options={options}
          value={detsType}
          onIcChange={(event) =>
            setDetsType(
              event.detail.value as "generic" | "domestic" | "vulnerable",
            )
          }
        />

        {detsType === "generic" && (
          <GenericForm
            id={incident?.id}
            cad={formattedCAD}
            location={incident?.location}
            dets={incident?.dets}
            onUpdate={updateDets}
          />
        )}
        {detsType === "vulnerable" && (
          <VulnerableForm
            id={incident?.id}
            cad={formattedCAD}
            location={incident?.location}
            dets={incident?.dets}
            onUpdate={updateDets}
          />
        )}
        {detsType === "domestic" && (
          <DomesticForm
            id={incident?.id}
            cad={formattedCAD}
            location={incident?.location}
            dets={incident?.dets}
            onUpdate={updateDets}
          />
        )}
      </div>
    </FormSectionContainer>
  );
}
