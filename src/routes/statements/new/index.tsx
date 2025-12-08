import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/statements/new/header";
import { TemplateGrid } from "../../../components/templates/template-grid";
import { FormSectionContainer } from "../../../components/statements/new/form-section-container";

export const Route = createFileRoute("/statements/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/statements/new" });

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        step={NewDocumentPageHeaderStep.Templates}
        onNext={() =>
          navigate({ to: "/statements/new/details", search: (prev) => prev })
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
