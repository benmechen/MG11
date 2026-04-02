import { mdiArrowLeft } from "@mdi/js";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { IcButton, IcTypography, SlottedSVG } from "@ukic/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useAppContext } from "../../../../components/app-context";
import { camelCaseToWords } from "../../../../utils/formatEmail";

export const Route = createFileRoute("/incidents/$date/$incidentId/export")({
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
  const { personService } = useAppContext();
  const incident = Route.useLoaderData();
  const router = useRouter();

  const people = useLiveQuery(
    () => incident && personService.findByIncident(incident.id),
  );

  const formattedCAD = incident
    ? `${incident.cadNumber}/${incident.date?.replaceAll("-", "")}`
    : "";

  return (
    <div className="p-4">
      {
        <IcButton onClick={() => router.history.back()} variant="primary">
          <SlottedSVG
            slot="left-icon"
            viewBox="0 0 24 24"
            path={mdiArrowLeft}
          />
          Back
        </IcButton>
      }
      <IcTypography variant="h2" className="mt-6 mb-4">
        Investigation Summary
      </IcTypography>
      <IcTypography>
        <span className="font-bold">CAD Number:</span> {formattedCAD}
      </IcTypography>
      <IcTypography>
        <span className="font-bold">Location:</span> {incident?.location}
      </IcTypography>

      {people && people.length > 0 && (
        <>
          <IcTypography variant="h3" className="mt-6 mb-4">
            People
          </IcTypography>
          {people.map((person) => (
            <>
              <IcTypography>
                <span className="font-bold">Full Name:</span> {person.firstName}{" "}
                {person.lastName?.toUpperCase()}
              </IcTypography>
              <IcTypography>
                <span className="font-bold">Date of Birth:</span>{" "}
                {person.dateOfBirth}
              </IcTypography>
              <IcTypography>
                <span className="font-bold">Email Address:</span>{" "}
                {person.emailAddress}
              </IcTypography>
              <IcTypography>
                <span className="font-bold">Phone Number:</span>{" "}
                {person.phoneNumber}
              </IcTypography>
              <IcTypography>
                <span className="font-bold">Address:</span>{" "}
              </IcTypography>
              <div className="ml-2">
                <IcTypography>{person.address?.line1}</IcTypography>
                <IcTypography>{person.address?.line2}</IcTypography>
                <IcTypography>{person.address?.city}</IcTypography>
                <IcTypography>{person.address?.postcode}</IcTypography>
              </div>
            </>
          ))}
        </>
      )}

      {incident?.dets && (
        <>
          <IcTypography variant="h3" className="mt-6 mb-4">
            Connect Dets
          </IcTypography>
          {Object.entries(incident.dets)
            .filter(([key]) => key !== "type")
            .map(([key, value]) => (
              <div key={key} className="mb-4">
                <IcTypography variant="subtitle-large" className="font-bold">
                  {camelCaseToWords(key)}:
                </IcTypography>
                <IcTypography className="whitespace-pre-line">
                  {value}
                </IcTypography>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
