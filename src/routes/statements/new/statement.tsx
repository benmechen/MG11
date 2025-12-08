import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/statements/new/header";
import { FormSectionContainer } from "../../../components/statements/new/form-section-container";
import { IcTextField } from "@ukic/react";
import { useFormContext } from "react-hook-form";
import { INewDocumentFields } from "./route";

export const Route = createFileRoute("/statements/new/statement")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/statements/new/statement" });
  const { register } = useFormContext<INewDocumentFields>();

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        step={NewDocumentPageHeaderStep.Statement}
        onNext={() =>
          navigate({ to: "/statements/new/review", search: (prev) => prev })
        }
        onBack={() =>
          navigate({ to: "/statements/new/details", search: (prev) => prev })
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
