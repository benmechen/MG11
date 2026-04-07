import { useForm } from "react-hook-form";
import { useRhfAutosave } from "react-hook-form-autosave";
import { IcTypography } from "@ukic/react";
import { Textbox } from "./textbox";
import { useAppContext } from "../../app-context";

interface VulnerableFormFields {
  generalActions?: string;
  safeguardingDetails?: string;
  safeguardingActions?: string;
  safeguardingDescription?: string;
  thrive?: string;
}

interface IVulnerableFormProps {
  id: number;
  cad?: string;
  location?: string;
  dets?: { [key: string]: string };
  onUpdate: (data: { [key: string]: string }) => Promise<void>
}

export const VulnerableForm = ({ id, cad, location, dets, onUpdate }: IVulnerableFormProps) => {
  const { incidentService } = useAppContext();

  const form = useForm<VulnerableFormFields>({
    defaultValues: {
      generalActions:
        dets?.["generalActions"] ||
        `- CAD: ${cad}
- Call sign: 
- Attending Officers: 
- Location: ${location ?? ""}

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

  useRhfAutosave({
    form,
    transport: async (data) => {
      await onUpdate(data);
      
      return {
        ok: true,
      };
    },
  });

  const { register } = form;

  return (
    <div className="flex flex-col gap-4">
      <Textbox
        label="Circumstances / Actions"
        helperText="Provide a narrative of what happened, when, where, who was involved and why"
        spellCheck
        autoCapitalize="on"
        rows={16}
        {...register("generalActions")}
      />
      <Textbox
        label="THRIVE+"
        spellCheck
        autoCapitalize="on"
        rows={15}
        {...register("thrive")}
      />
      <IcTypography variant="h3" className="my-2">Safeguarding Triage</IcTypography>
      <Textbox
        label="Concerns"
        helperText="Describe in full detail what are the specific concerns for the individual"
        spellCheck
        autoCapitalize="on"
        rows={6}
        {...register("safeguardingDetails")}
      />
      <Textbox
        label="Actions Taken"
        helperText="Describe in full detail what if any safeguarding actions have taken place"
        spellCheck
        autoCapitalize="on"
        rows={6}
        {...register("safeguardingActions")}
      />
      <Textbox
        label="Detail"
        helperText="Describe in full detail what areas of concerns you are highlighting to the local authority"
        spellCheck
        autoCapitalize="on"
        rows={7}
        {...register("safeguardingDescription")}
      />
    </div>
  );
};
