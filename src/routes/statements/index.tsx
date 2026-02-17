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
import { useGetStatements } from "../../hooks/useGetStatements";

export const Route = createFileRoute("/statements/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/statements" });
  const statements = useGetStatements();

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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              search: (prev: any) => prev,
            })
          }
        >
          Create statement
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
      <IcSectionContainer className="flex flex-wrap gap-4 p-4">
        {statements?.map((statement) => (
          <DocumentCard
            key={statement.id}
            name={`Statement ${String(statement.id).trim()}`}
            created={new Date(statement.created)}
            lastUpdate={new Date(statement.updated)}
            status={statement.status}
            onClick={() =>
              navigate({
                to: "/statements/$statementId/review",
                params: {
                  statementId: statement.id.toString(),
                },
              })
            }
          />
        ))}
      </IcSectionContainer>
    </div>
  );
}
