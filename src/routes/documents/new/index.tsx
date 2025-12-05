import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/documents/new/header";
import { TemplateGrid } from "../../../components/templates/template-grid";
import { FormSectionContainer } from "../../../components/documents/new/form-section-container";

export const Route = createFileRoute("/documents/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/documents/new" });

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        step={NewDocumentPageHeaderStep.Templates}
        onNext={() =>
          navigate({ to: "/documents/new/details", search: (prev) => prev })
        }
      />
      <FormSectionContainer>
        <TemplateGrid
          onCardClick={(id) =>
            navigate({
              to: "./details",
              search: {
                template: id,
              },
            })
          }
        />
      </FormSectionContainer>
    </div>
  );
}
