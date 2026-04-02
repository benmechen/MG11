import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/statements/new/header";
import { FormSectionContainer } from "../../../components/statements/new/form-section-container";
import { IcTextField } from "@ukic/react";
import { useFormContext } from "react-hook-form";
import { INewDocumentFields } from "./route";
import { isValidId } from "../../../utils/isValidId";
import { useAppContext } from "../../../components/app-context";

export const Route = createFileRoute("/statements/$statementId/statement")({
  component: RouteComponent,
});

function RouteComponent() {
  const { statementService } = useAppContext();
  const { statementId } = Route.useParams();
  const navigate = useNavigate({ from: "/statements/$statementId/statement" });
  const { register, getValues } = useFormContext<INewDocumentFields>();

  const saveStatement = async () => {
    if (!isValidId(statementId)) return;

    const data = getValues();

    await statementService.update(Number(statementId), {
      person: {
        ...data.witness,
      },
      statement: data.statement,
    });
  };

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        statementId={statementId}
        step={NewDocumentPageHeaderStep.Statement}
        onNext={async () => {
          await saveStatement();
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
      <FormSectionContainer>
        <IcTextField
          label="Statement"
          rows={40}
          resize
          fullWidth
          spellcheck
          {...register("statement")}
        />
      </FormSectionContainer>
    </div>
  );
}
