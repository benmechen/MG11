import { mdiArrowLeft, mdiArrowRight, mdiSignatureFreehand } from "@mdi/js";
import {
  IcPageHeader,
  IcBreadcrumbGroup,
  IcBreadcrumb,
  IcButton,
  SlottedSVG,
  IcStepper,
  IcStep,
} from "@ukic/react";
import { useNavigate } from "@tanstack/react-router";
import { DeleteStatementModal } from "../delete-statement-modal";
import { useState } from "react";
import { DeleteButton } from "../../delete-button";

export enum NewDocumentPageHeaderStep {
  Templates = 0,
  Details = 1,
  WitnessConsent = 2,
  Statement = 3,
  Complete = 4,
}

interface INewDocumentPageHeader {
  statementId?: string;
  step: NewDocumentPageHeaderStep;
  onBack?: () => void;
  onNext: () => void;
}
export const NewDocumentPageHeader = ({
  statementId,
  step,
  onBack,
  onNext,
}: INewDocumentPageHeader) => {
  const navigate = useNavigate();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getStepState = (
    currentStep: NewDocumentPageHeaderStep,
    targetStep: NewDocumentPageHeaderStep
  ) =>
    currentStep === targetStep
      ? "current"
      : currentStep > targetStep
        ? "completed"
        : "disabled";

  return (
    <>
      <DeleteStatementModal
        id={Number(statementId)}
        name={`Statement ${statementId}`}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() =>
          navigate({
            to: "/statements",
            search: (prev) => ({ ...prev, statement: undefined }),
          })
        }
      />
      <IcPageHeader
        heading={
          statementId ? `Edit Statement ${statementId}` : "New Statement"
        }
        subheading={
          statementId
            ? "Make changes to your statement"
            : "Create a new statement"
        }
        aligned="full-width"
        size="small"
      >
        <IcBreadcrumbGroup slot="breadcrumbs">
          <IcBreadcrumb pageTitle="Home" href="/" />
          <IcBreadcrumb pageTitle="Statements" href="/statements" />
          <IcBreadcrumb
            current
            pageTitle="Create Statement"
            href="/statements/new"
          />
        </IcBreadcrumbGroup>

        <IcButton
          slot="actions"
          variant="tertiary"
          disabled={!onBack}
          onClick={onBack}
        >
          Back
          <SlottedSVG path={mdiArrowLeft} slot="left-icon" />
        </IcButton>
        <DeleteButton onClick={() => setDeleteModalOpen(true)} />
        <IcButton slot="actions" variant="primary" onClick={onNext}>
          {step === NewDocumentPageHeaderStep.Complete ? "Sign" : "Next"}
          <SlottedSVG
            path={
              step === NewDocumentPageHeaderStep.Complete
                ? mdiSignatureFreehand
                : mdiArrowRight
            }
            slot="right-icon"
          />
        </IcButton>
        {}
        <IcStepper slot="stepper">
          <IcStep
            heading="Template"
            type={getStepState(step, NewDocumentPageHeaderStep.Templates)}
          />
          <IcStep
            heading="Details"
            type={getStepState(step, NewDocumentPageHeaderStep.Details)}
          />
          <IcStep
            heading="Witness Consent"
            subheading="Currently unavailable"
            // stepType={getStepState(
            //   step,
            //   NewDocumentPageHeaderStep.WitnessConsent
            // )}
            // stepType="disabled"
            type="disabled"
          />
          <IcStep
            heading="Statement"
            type={getStepState(step, NewDocumentPageHeaderStep.Statement)}
          />

          <IcStep
            heading="Complete"
            type={getStepState(step, NewDocumentPageHeaderStep.Complete)}
          />
        </IcStepper>
      </IcPageHeader>
    </>
  );
};
