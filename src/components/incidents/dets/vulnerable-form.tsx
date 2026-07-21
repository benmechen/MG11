import { useForm } from "react-hook-form";
import { Textbox } from "./textbox";
import { useRhfAutosaveConfig } from "./useRhfAutosaveConfig";
import { StatusIndicator } from "./status-indicator";
import { Thrive } from "./thrive";
import { Safeguarding } from "./safeguarding";

interface VulnerableFormFields extends Record<string, string | undefined> {
  generalActions?: string;
  safeguardingDetails?: string;
  safeguardingActions?: string;
  safeguardingDescription?: string;
  thrive?: string;
}

interface IVulnerableFormProps<T extends Record<string, string | undefined>> {
  id: number;
  cad?: string;
  date?: string;
  location?: string;
  dets?: { [key: string]: string };
  onUpdate: (data: T) => Promise<void>;
}

export const VulnerableForm = ({
  cad,
  date,
  location,
  dets,
  onUpdate,
}: IVulnerableFormProps<VulnerableFormFields>) => {
  const form = useForm<VulnerableFormFields>({
    defaultValues: {
      generalActions:
        dets?.["generalActions"] ||
        `- CAD: ${cad}
- Call sign: 
- Attending Officers: 
- Location: ${location ?? ""}

On ${date ?? ""} at 00:00 hours inside/outside ${location?.toUpperCase() ?? ""}...

- Provide a narrative of what happened, when, where, who was involved and why.
- Take care to only record sensitive personal data on relevant Person Cards.
- Ensure that all officers in attendance are recorded.
- Document any police action or intervention.`,
      thrive:
        dets?.["thrive"] ||
        `- THREAT - Threat is a communicated or perceived intent to inflict harm or loss on another person.
- HARM - Harm is to do or cause harm e.g. to injure, damage, hurt/physical or psychological
- RISK - Risk is the likelihood of the event occurring
- INVESTIGATION - Investigation is the act or process of examining crime, problem or situation and considering what action is required.
- VULNERABILITY - Vulnerability is defined for the purpose of incident management as “a person is vulnerable if as a result of their situation or circumstances they are unable to take care or protect themselves or others from harm or exploitation.
- ENGAGEMENT - Engagement is where organisations and individuals build positive relationships for the benefit of all parties.
- PREVENTION and INTERVENTION - Prevention and intervention is identifying opportunities to prevent further incidents occurring or worsening of threat, risk and harm and allocating the most appropriate resources (Police or Partnership) to intervene before further, more serious police intervention is required.`,
      safeguardingDetails:
        dets?.["safeguardingDetails"] ||
        ` Please provide full detail of specific concerns`,
      safeguardingActions:
        dets?.["safeguardingActions"] ||
        `Please describe safeguarding actions taken`,
      safeguardingDescription:
        dets?.["safeguardingDescription"] ||
        `***VAF***
Appearance: 
Behaviour: 
Communication: 
Danger: 
Environment: `,
    },
  });

  const { isSaving, hasPendingChanges } = useRhfAutosaveConfig(onUpdate, {
    form,
  });

  const { register } = form;

  return (
    <div className="flex flex-col gap-4">
      <StatusIndicator
        isSaving={isSaving}
        hasPendingChanges={hasPendingChanges}
      />
      <Textbox
        label="Circumstances / Actions"
        helperText="Provide a narrative of what happened, when, where, who was involved and why"
        spellCheck
        autoCapitalize="on"
        rows={16}
        {...register("generalActions")}
      />
      <Thrive register={register} getValues={form.getValues} />
      <Safeguarding register={register} getValues={form.getValues} />
    </div>
  );
};
