import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiSignatureFreehand,
  mdiDotsVertical,
} from "@mdi/js";
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
import { OptionsDropdown } from "./options-dropdown";
import { UseFormWatch, UseFormGetValues } from "react-hook-form";
import { INewDocumentFields } from "../../../routes/statements/$statementId/route";

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
  watch?: UseFormWatch<INewDocumentFields>;
  getValues?: UseFormGetValues<INewDocumentFields>;
}
export const NewDocumentPageHeader = ({
  statementId,
  step,
  onBack,
  onNext,
  watch,
  getValues,
}: INewDocumentPageHeader) => {
  const navigate = useNavigate();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const handlePopoverToggled = () => setPopoverOpen((value) => !value);

  const getStepState = (
    currentStep: NewDocumentPageHeaderStep,
    targetStep: NewDocumentPageHeaderStep,
  ) =>
    currentStep === targetStep
      ? "current"
      : currentStep > targetStep
        ? "completed"
        : "disabled";

  const showOptionsDropdown = !!(watch && getValues);

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

        {showOptionsDropdown && (
          <IcButton
            slot="actions"
            variant="tertiary"
            id="options-button"
            onClick={handlePopoverToggled}
            aria-expanded={popoverOpen}
          >
            Options
            <SlottedSVG path={mdiDotsVertical} slot="right-icon" />
          </IcButton>
        )}

        {/* <DeleteButton onClick={() => setDeleteModalOpen(true)} /> */}
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
      {showOptionsDropdown && (
        <OptionsDropdown
          statementId={statementId}
          open={popoverOpen}
          onClose={() => setPopoverOpen(false)}
          onDelete={() => setDeleteModalOpen(true)}
          watch={watch}
          getValues={getValues}
        />
      )}
    </>
  );
};
