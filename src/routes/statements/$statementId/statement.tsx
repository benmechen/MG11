import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/statements/new/header";
import { FormSectionContainer } from "../../../components/statements/new/form-section-container";
import { IcTypography } from "@ukic/react";
import { useFormContext } from "react-hook-form";
import { INewDocumentFields } from "./route";
import { isValidId } from "../../../utils/isValidId";
import { useAppContext } from "../../../components/app-context";
import { useEffect } from "react";
import Editor from "../../../components/statements/new/editor";

export const Route = createFileRoute("/statements/$statementId/statement")({
  component: RouteComponent,
});

function RouteComponent() {
  const { statementService } = useAppContext();
  const { statementId } = Route.useParams();
  const navigate = useNavigate({ from: "/statements/$statementId/statement" });
  const { register, getValues, setValue, watch } =
    useFormContext<INewDocumentFields>();

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

  useEffect(() => {
    register("statement");
  }, []);

  const statement = watch("statement");

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
        <IcTypography variant="label">Statement</IcTypography>
        <Editor
          value={statement}
          onChange={(value) =>
            setValue("statement", value, { shouldValidate: true })
          }
        />
        {/* <div
          spellCheck
          contentEditable
          className="w-full h-full min-h-screen border border-ic-architectural-400 resize-y rounded-xs leading-6 p-2 bg-white dark:bg-ic-architectural-800"
          onInput={(e) =>
            setValue("statement", (e.target as HTMLDivElement).textContent, {
              shouldValidate: true,
            })
          }
          // {...}
        >
          {statement}
        </div> */}
        {/* <IcTextField label="Statement" rows={40} resize fullWidth spellcheck /> */}
      </FormSectionContainer>
    </div>
  );
}
