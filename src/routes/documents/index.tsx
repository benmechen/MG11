import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  IcBreadcrumb,
  IcBreadcrumbGroup,
  IcButton,
  IcNavigationItem,
  IcPageHeader,
  IcSectionContainer,
  IcTextField,
  SlottedSVG,
} from "@ukic/react";
import { DocumentCard } from "../../components/documents/document-card";
import { mdiPlus } from "@mdi/js";

export const Route = createFileRoute("/documents/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/documents" });

  return (
    <div>
      <IcPageHeader
        heading="Documents"
        subheading="View your created documents"
        aligned="full-width"
      >
        <IcBreadcrumbGroup slot="breadcrumbs">
          <IcBreadcrumb pageTitle="Home" href="/" />
          <IcBreadcrumb current pageTitle="Documents" href="/documents" />
        </IcBreadcrumbGroup>
        <IcButton
          slot="actions"
          variant="primary"
          onClick={() => navigate({ to: "/documents/new" })}
        >
          Create document
          <SlottedSVG path={mdiPlus} slot="right-icon" />
        </IcButton>
        <IcTextField
          slot="input"
          placeholder="Search for documents"
          label="Input"
          hideLabel
        />
        <IcNavigationItem
          slot="tabs"
          label="All Documents"
          href="#all"
          selected
        />
        <IcNavigationItem slot="tabs" label="Completed" href="#completed" />
        <IcNavigationItem slot="tabs" label="Draft" href="#draft" />
      </IcPageHeader>
      <IcSectionContainer className="flex gap-4 p-4">
        <DocumentCard
          name="Document 1"
          created={new Date()}
          lastUpdate={new Date()}
          status="completed"
        />
      </IcSectionContainer>
    </div>
  );
}
