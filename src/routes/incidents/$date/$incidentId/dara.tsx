import { createFileRoute } from "@tanstack/react-router";
import { IcTypography, IcLoadingIndicator } from "@ukic/react";
import { FormSectionContainer } from "../../../../components/statements/new/form-section-container";
import { useAppContext } from "../../../../components/app-context";
import { FormProvider, useForm } from "react-hook-form";
import { useRhfAutosaveConfig } from "../../../../components/incidents/dets/useRhfAutosaveConfig";
import { StatusIndicator } from "../../../../components/incidents/dets/status-indicator";
import { flattenObject } from "react-hook-form-autosave";
import { DaraQuestion } from "../../../../components/incidents/dara/dara-question";
import { daraQuestions } from "../../../../utils/daraQuestions";

type DaraField = {
  rating: string;
  comments?: string;
};

interface DaraFormFields {
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

export const Route = createFileRoute("/incidents/$date/$incidentId/dara")({
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

  const updateDara = async (data: DaraFormFields) => {
    if (!incident) return;
    const updatedDara = flattenObject(data, ".", "dara");
    await incidentService.update(incident.id, updatedDara);
    await delay(250);
  };

  const form = useForm<DaraFormFields>({
    defaultValues: incident?.dara,
  });
  const { isSaving, hasPendingChanges, flush } =
    useRhfAutosaveConfig<DaraFormFields>(updateDara, {
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
          <IcTypography variant="h2">DARA</IcTypography>
          <DaraQuestion
            name="threatsPeoplePetsProperty"
            label={daraQuestions.threatsPeoplePetsProperty}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="callNamesHumiliateDegrade"
            label={daraQuestions.callNamesHumiliateDegrade}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="controlDailyActivities"
            label={daraQuestions.controlDailyActivities}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="denyAccessToMoney"
            label={daraQuestions.denyAccessToMoney}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="monitorPhoneEmailSocialMedia"
            label={daraQuestions.monitorPhoneEmailSocialMedia}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="followStalkContact"
            label={daraQuestions.followStalkContact}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="feelIsolatedNoSupport"
            label={daraQuestions.feelIsolatedNoSupport}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="physicalViolence"
            label={daraQuestions.physicalViolence}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="strangleChokeSuffocateDrown"
            label={daraQuestions.strangleChokeSuffocateDrown}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="useThreatenUseWeapons"
            label={daraQuestions.useThreatenUseWeapons}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="threatenAttemptSuicide"
            label={daraQuestions.threatenAttemptSuicide}
            options={howOftenOptions}
            flush={flush}
          />
          <DaraQuestion
            name="recentlySeparated"
            label={daraQuestions.recentlySeparated}
            options={yesNoOptions}
            flush={flush}
          />
          <DaraQuestion
            name="inDanger"
            label={daraQuestions.inDanger}
            options={yesNoOptions}
            flush={flush}
          />
          <DaraQuestion
            name="abuseWorsening"
            label={daraQuestions.abuseWorsening}
            options={yesNoOptions}
            flush={flush}
          />
          <DaraQuestion
            name="threatenedToKill"
            label={daraQuestions.threatenedToKill}
            options={yesNoOptions}
            flush={flush}
          />
          <DaraQuestion
            name="hurtChildren"
            label={daraQuestions.hurtChildren}
            options={yesNoOptions}
            flush={flush}
          />
          <DaraQuestion
            name="useChildContactArrangements"
            label={daraQuestions.useChildContactArrangements}
            options={yesNoOptions}
            flush={flush}
          />
          <DaraQuestion
            name="pregnant"
            label={daraQuestions.pregnant}
            options={yesNoOptions}
            flush={flush}
          />
          <DaraQuestion
            name="futureInjuryLikelihood"
            label={daraQuestions.futureInjuryLikelihood}
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
          />
        </div>
      </FormSectionContainer>
    </FormProvider>
  );
}
