import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../components/statements/new/header";
import { TemplateGrid } from "../../components/templates/template-grid";
import { FormSectionContainer } from "../../components/statements/new/form-section-container";
import { useAppContext } from "../../components/app-context";

export const Route = createFileRoute("/statements/new")({
  component: RouteComponent,
  validateSearch: (search) => ({
    incidentId: search.incidentId ? Number(search.incidentId) : undefined,
  }),
});

function RouteComponent() {
  const { statementService } = useAppContext();
  const navigate = useNavigate({ from: "/statements/new" });
  const { incidentId } = Route.useSearch();

  const createNewStatement = async (templateId?: number) => {
    const statementId = await statementService.create({
      templateId,
      incidentId,
      status: "draft",
    });

    navigate({
      to: "/statements/$statementId/details",
      params: { statementId: statementId.toString() },
    });
  };

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        step={NewDocumentPageHeaderStep.Templates}
        onNext={() => createNewStatement()}
      />
      <FormSectionContainer>
        <TemplateGrid onCardClick={(id) => createNewStatement(id)} />
      </FormSectionContainer>
    </div>
  );
}
