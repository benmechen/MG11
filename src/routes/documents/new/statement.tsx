import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/documents/new/header";
import { FormSectionContainer } from "../../../components/documents/new/form-section-container";
import { IcTextField } from "@ukic/react";
import { useFormContext } from "react-hook-form";
import { INewDocumentFields } from "./route";

export const Route = createFileRoute("/documents/new/statement")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/documents/new/statement" });
  const { register } = useFormContext<INewDocumentFields>();

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        step={NewDocumentPageHeaderStep.Statement}
        onNext={() =>
          navigate({ to: "/documents/new/review", search: (prev) => prev })
        }
        onBack={() =>
          navigate({ to: "/documents/new/details", search: (prev) => prev })
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
