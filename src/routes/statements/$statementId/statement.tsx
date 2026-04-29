import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/statements/new/header";
import { FormSectionContainer } from "../../../components/statements/new/form-section-container";
import { useFormContext } from "react-hook-form";
import { INewDocumentFields } from "./route";
import { isValidId } from "../../../utils/isValidId";
import { useAppContext } from "../../../components/app-context";
import { useRhfAutosaveConfig } from "../../../components/incidents/dets/useRhfAutosaveConfig";
import { StatusIndicator } from "../../../components/incidents/dets/status-indicator";
import { Textbox } from "../../../components/incidents/dets/textbox";

export const Route = createFileRoute("/statements/$statementId/statement")({
  component: RouteComponent,
});

function RouteComponent() {
  const { statementService } = useAppContext();
  const { statementId } = Route.useParams();
  const navigate = useNavigate({ from: "/statements/$statementId/statement" });
  const form = useFormContext<INewDocumentFields>();

  const { register, getValues } = form;

  const delay = (durationMs: number) => {
    return new Promise((resolve) => setTimeout(resolve, durationMs));
  };

  const saveStatement = async (data: INewDocumentFields, autosave = true) => {
    if (!isValidId(statementId)) return;

    await statementService.update(Number(statementId), {
      person: {
        ...data.witness,
      },
      statement: data.statement,
    });
    if (autosave) await delay(250);
  };

  const { isSaving, hasPendingChanges } = useRhfAutosaveConfig(saveStatement, {
    form,
  });

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        statementId={statementId}
        step={NewDocumentPageHeaderStep.Statement}
        onNext={async () => {
          await saveStatement(getValues(), false);
          navigate({
            to: "/statements/$statementId/review",
          });
        }}
        onBack={() =>
          navigate({
            to: "/statements/$statementId/details",
          })
        }
      />
      <StatusIndicator
        isSaving={isSaving}
        hasPendingChanges={hasPendingChanges}
      />
      <FormSectionContainer>
        <Textbox
          label="Statement"
          rows={40}
          // resize
          // fullWidth
          // spellcheck
          {...register("statement")}
        />
      </FormSectionContainer>
    </div>
  );
}
