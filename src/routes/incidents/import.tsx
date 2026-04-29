import { createFileRoute } from "@tanstack/react-router";
import { IcLoadingIndicator, IcSectionContainer } from "@ukic/react";
import { useEffect } from "react";
import * as jose from "jose";
import Incident from "../../db/models/incident";
import { secret } from "../../components/incidents/share-incident-modal";
import { useAppContext } from "../../components/app-context";

export const Route = createFileRoute("/incidents/import")({
  component: RouteComponent,
  validateSearch: (search) => ({
    token: String(search.token) || "",
  }),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { token } = Route.useSearch();
  const { incidentService } = useAppContext();

  useEffect(() => {
    const decodeToken = async () => {
      const decodedToken = await jose.jwtVerify(token, secret);
      const incident = decodedToken.payload as unknown as Incident;

      const existingIncident = await incidentService.findByCad(
        incident.cadNumber,
        incident.date,
      );

      if (!existingIncident) {
        await incidentService.create({
          ...incident,
          date: new Date(incident.date),
        });
      } else {
        await incidentService.update(existingIncident.id, {
          ...incident,
          date: new Date(incident.date),
        });
      }

      setTimeout(
        () =>
          navigate({
            to: "/incidents/$date/$incidentId/overview",
            params: {
              date: incident.date,
              incidentId: String(incident.cadNumber),
            },
          }),
        1000,
      );
    };

    if (!token) return;
    decodeToken();
  }, [token]);

  return (
    <IcSectionContainer fullHeight className="py-40">
      <IcLoadingIndicator type="circular" label="Importing..." />
    </IcSectionContainer>
  );
}
