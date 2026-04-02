import { createFileRoute } from "@tanstack/react-router";
import {
  IcPageHeader,
  IcBreadcrumbGroup,
  IcBreadcrumb,
  IcButton,
  IcSectionContainer,
} from "@ukic/react";
import { IncidentGrid } from "../../components/incidents/incident-grid";

export const Route = createFileRoute("/incidents/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  return (
    <div>
      <IcPageHeader
        heading="Incidents"
        subheading="Manage your incidents"
        aligned="full-width"
      >
        <IcBreadcrumbGroup slot="breadcrumbs">
          <IcBreadcrumb pageTitle="Home" href="/" />
          <IcBreadcrumb current pageTitle="Incidents" href="/incidents" />
        </IcBreadcrumbGroup>
        <IcButton
          slot="actions"
          variant="primary"
          onClick={() => navigate({ to: "/incidents/new" })}
        >
          New Incident
        </IcButton>
      </IcPageHeader>
      <IcSectionContainer className="py-4 px-6" aligned="full-width">
        <IncidentGrid
          onCardClick={(cadNumber, date) =>
            navigate({
              to: "/incidents/$date/$incidentId/overview",
              params: {
                incidentId: String(cadNumber),
                date,
              },
            })
          }
        />
      </IcSectionContainer>
    </div>
  );
}
