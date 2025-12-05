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

export enum NewDocumentPageHeaderStep {
  Templates = 0,
  Details = 1,
  WitnessConsent = 2,
  Statement = 3,
  Complete = 4,
}

interface INewDocumentPageHeader {
  step: NewDocumentPageHeaderStep;
  onBack?: () => void;
  onNext: () => void;
}
export const NewDocumentPageHeader = ({
  step,
  onBack,
  onNext,
}: INewDocumentPageHeader) => {
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
    <IcPageHeader
      heading="Create Document"
      subheading="Create a new document from a template"
      aligned="full-width"
      size="small"
    >
      <IcBreadcrumbGroup slot="breadcrumbs">
        <IcBreadcrumb pageTitle="Home" href="/" />
        <IcBreadcrumb pageTitle="Documents" href="/documents" />
        <IcBreadcrumb
          current
          pageTitle="Create Document"
          href="/documents/new"
        />
      </IcBreadcrumbGroup>

      <IcButton
        slot="actions"
        variant="tertiary"
        disabled={!onBack}
        onClick={onBack}
      >
        Back
        <SlottedSVG path={mdiArrowLeft} slot="icon" />
      </IcButton>
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
          stepTitle="Template"
          stepType={getStepState(step, NewDocumentPageHeaderStep.Templates)}
        />
        <IcStep
          stepTitle="Details"
          stepType={getStepState(step, NewDocumentPageHeaderStep.Details)}
        />
        <IcStep
          stepTitle="Witness Consent"
          stepSubtitle="Currently unavailable"
          // stepType={getStepState(
          //   step,
          //   NewDocumentPageHeaderStep.WitnessConsent
          // )}
          stepType="disabled"
        />
        <IcStep
          stepTitle="Statement"
          stepType={getStepState(step, NewDocumentPageHeaderStep.Statement)}
        />

        <IcStep
          stepTitle="Complete"
          stepType={getStepState(step, NewDocumentPageHeaderStep.Complete)}
        />
      </IcStepper>
    </IcPageHeader>
  );
};
