import { createFileRoute } from "@tanstack/react-router";
import { IcTypography, IcLoadingIndicator } from "@ukic/react";
import { FormSectionContainer } from "../../../../components/statements/new/form-section-container";
import { useAppContext } from "../../../../components/app-context";
import { FormProvider, useForm } from "react-hook-form";
import { useRhfAutosaveConfig } from "../../../../components/incidents/dets/useRhfAutosaveConfig";
import { StatusIndicator } from "../../../../components/incidents/dets/status-indicator";
import { flattenObject } from "react-hook-form-autosave";
import { FormQuestion } from "../../../../components/incidents/form/form-question";
import { hateCrimeQuestions } from "../../../../utils/124hQuestions";

type DaraField = {
  rating: string;
  comments?: string;
};

interface HateCrimeFormFields {
  threatsPeoplePetsProperty?: DaraField;
  callNamesHumiliateDegrade?: DaraField;
  controlDailyActivities?: DaraField;
  denyAccessToMoney?: DaraField;
  monitorPhoneEmailSocialMedia?: DaraField;
  followStalkContact?: DaraField;
  feelIsolatedNoSupport?: DaraField;
  physicalViolence?: DaraField;
  strangleChokeSuffocateDrown?: DaraField;
  useThreatenUseWeapons?: DaraField;
  threatenAttemptSuicide?: DaraField;
  recentlySeparated?: DaraField;
  inDanger?: DaraField;
  abuseWorsening?: DaraField;
  threatenedToKill?: DaraField;
  hurtChildren?: DaraField;
  useChildContactArrangements?: DaraField;
  pregnant?: DaraField;
  futureInjuryLikelihood?: DaraField;
}

const howOftenOptions = [
  { label: "All the time", value: "allTheTime" },
  { label: "Often", value: "often" },
  { label: "Occasionally", value: "occasionally" },
  { label: "Never", value: "never" },
  { label: "Not Stated", value: "notStated", hideAdditionalComments: true },
];

const yesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Not Stated", value: "notStated", hideAdditionalComments: true },
];

export const Route = createFileRoute("/incidents/$date/$incidentId/124h")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const incident = await context.incidentService.findByCad(
      Number(params.incidentId),
      params.date,
    );

    return incident;
  },
});

function RouteComponent() {
  const incident = Route.useLoaderData();
  const { incidentService } = useAppContext();

  const delay = (durationMs: number) => {
    return new Promise((resolve) => setTimeout(resolve, durationMs));
  };

  const update124h = async (data: HateCrimeFormFields) => {
    if (!incident) return;
    const updated124h = flattenObject(data, ".", "124h");
    await incidentService.update(incident.id, updated124h);
    await delay(250);
  };

  const form = useForm<HateCrimeFormFields>({
    defaultValues: incident?.dara,
  });
  const { isSaving, hasPendingChanges, flush } =
    useRhfAutosaveConfig<HateCrimeFormFields>(update124h, {
      form,
    });

  if (!incident) return <IcLoadingIndicator fullWidth />;

  return (
    <FormProvider {...form}>
      <FormSectionContainer>
        <StatusIndicator
          isSaving={isSaving}
          hasPendingChanges={hasPendingChanges}
        />
        <div className="flex flex-col gap-4">
          <IcTypography variant="h2">124H</IcTypography>
          <FormQuestion
            name="incident"
            label={hateCrimeQuestions.incident}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="vulnerability"
            label={hateCrimeQuestions.vulnerability}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="onlineHateCrime"
            label={hateCrimeQuestions.onlineHateCrime}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="escalation"
            label={hateCrimeQuestions.escalation}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="associations"
            label={hateCrimeQuestions.associations}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="barriers"
            label={hateCrimeQuestions.barriers}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="communityTensions"
            label={hateCrimeQuestions.communityTensions}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="otherInformation"
            label={hateCrimeQuestions.otherInformation}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="support"
            label={hateCrimeQuestions.support}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="supervisor"
            label={hateCrimeQuestions.supervisor}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="safeguardingActionsAdvice"
            label={hateCrimeQuestions.safeguardingActionsAdvice}
            options={howOftenOptions}
            flush={flush}
          />
          <FormQuestion
            name="riskAssessment"
            label={hateCrimeQuestions.riskAssessment}
            options={yesNoOptions}
            flush={flush}
          />
          {/* <FormQuestion
            name="hurtChildren"
            label={hateCrimeQuestions.hurtChildren}
            options={yesNoOptions}
            flush={flush}
          /> */}
          {/* <FormQuestion
            name="futureInjuryLikelihood"
            label={hateCrimeQuestions.futureInjuryLikelihood}
            options={[
              ...Array.from({ length: 11 }, (_, i) => ({
                label: i.toString(),
                value: i.toString(),
              })),
              {
                label: "Not Stated",
                value: "notStated",
                hideAdditionalComments: true,
              },
            ]}
            flush={flush}
          /> */}
        </div>
      </FormSectionContainer>
    </FormProvider>
  );
}
