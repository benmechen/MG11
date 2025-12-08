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
import { DocumentCard } from "../../components/statements/document-card";
import { mdiPlus } from "@mdi/js";

export const Route = createFileRoute("/statements/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/statements" });

  return (
    <div>
      <IcPageHeader
        heading="Statements"
        subheading="View your created statements"
        aligned="full-width"
      >
        <IcBreadcrumbGroup slot="breadcrumbs">
          <IcBreadcrumb pageTitle="Home" href="/" />
          <IcBreadcrumb current pageTitle="Statements" href="/statements" />
        </IcBreadcrumbGroup>
        <IcButton
          slot="actions"
          variant="primary"
          onClick={() =>
            navigate({
              to: "/statements/new",
              search: { template: undefined },
            })
          }
        >
          Create statements
          <SlottedSVG path={mdiPlus} slot="right-icon" />
        </IcButton>
        <IcTextField
          slot="input"
          placeholder="Search for statements"
          label="Input"
          hideLabel
        />
        <IcNavigationItem
          slot="tabs"
          label="All Statements"
          href="#all"
          selected
        />
        <IcNavigationItem slot="tabs" label="Completed" href="#completed" />
        <IcNavigationItem slot="tabs" label="Draft" href="#draft" />
      </IcPageHeader>
      <IcSectionContainer className="flex gap-4 p-4">
        <DocumentCard
          name="Statements 1"
          created={new Date()}
          lastUpdate={new Date()}
          status="completed"
        />
      </IcSectionContainer>
    </div>
  );
}
