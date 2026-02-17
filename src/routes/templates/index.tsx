import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  IcPageHeader,
  IcBreadcrumbGroup,
  IcBreadcrumb,
  IcButton,
  IcSectionContainer,
} from "@ukic/react";
import { TemplateGrid } from "../../components/templates/template-grid";

export const Route = createFileRoute("/templates/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/templates" });

  return (
    <div>
      <IcPageHeader
        heading="Templates"
        subheading="Manage your statement templates"
        aligned="full-width"
      >
        <IcBreadcrumbGroup slot="breadcrumbs">
          <IcBreadcrumb pageTitle="Home" href="/" />
          <IcBreadcrumb current pageTitle="Templates" href="/templates" />
        </IcBreadcrumbGroup>
        <IcButton
          slot="actions"
          variant="primary"
          onClick={() => navigate({ to: "new" })}
        >
          Create template
        </IcButton>
      </IcPageHeader>
      <IcSectionContainer className="py-4 px-6" aligned="full-width">
        <TemplateGrid
          onCardClick={(id) =>
            navigate({
              to: `${id}`,
            })
          }
        />
      </IcSectionContainer>
    </div>
  );
}
