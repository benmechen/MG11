import { createFileRoute } from "@tanstack/react-router";
import {
  IcTypography,
  IcSectionContainer,
  IcLoadingIndicator,
  IcSelect,
  IcAlert,
} from "@ukic/react";
import { useEffect, useState } from "react";
import { GenericForm } from "../../../../components/incidents/dets/generic-form";
import { VulnerableForm } from "../../../../components/incidents/dets/vulnerable-form";
/*import { useLiveQuery } from "dexie-react-hooks";*/
/*import { useAppContext } from "../../../../components/app-context";*/
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
      incidentService.update(incident.id, {
        dets: {
          ...incident.dets,
          type: detsType,
        },
      });
    }
  }, [incident, detsType]);

  useEffect(() => {
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

  return (
    <IcSectionContainer aligned="center">
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
            />
          )}
          {detsType === "vulnerable" && (
            <VulnerableForm
              id={incident?.id}
              cad={formattedCAD}
              location={incident?.location}
              dets={incident?.dets}
            />
          )}
        </div>
      </FormSectionContainer>
    </IcSectionContainer>
  );
}
