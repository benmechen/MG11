import { mdiCreation } from "@mdi/js";
import {
  IcToastRegion,
  IcToast,
  IcButton,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";
import { useRef } from "react";
import { Textbox } from "./textbox";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { GenericFormFields } from "./generic-form";

const prompt = `You are an experienced UK police officer assisting with incident recording.

Your task is to generate a safeguarding triage using ONLY the information provided below.

Rules:

- Only use information explicitly contained within the investigation details or additional safeguarding concerns.
- Never infer, speculate, exaggerate, diagnose, or invent safeguarding concerns.
- Do not assume vulnerability based on age, offence type, location, circumstances, or other factors unless explicitly stated.
- If no safeguarding concerns are identified, state "No safeguarding concerns identified."
- Use concise, professional UK policing language.
- Use UK English.
- Do not repeat information unnecessarily.
- Focus only on safeguarding considerations, vulnerability, mental health, risk, and appropriate protective measures.
- Do not provide legal advice or general safeguarding guidance.
- Do not include introductions, explanations, conclusions, or commentary.
- Output only the safeguarding triage assessment.

Use the following format exactly, with each heading in bold:

Concerns: 
<Concerns assessment>

Actions Taken: 
<Actions Taken assessment>

Detail: 
<Detail assessment and VAF assessment>

Do not add bullet points.

Guidance for each section:

Concerns:
Describe in full detail what are the specific concerns for the individual

Actions Taken:
Describe in full detail what if any safeguarding actions have taken place

Detail:
Describe in full detail what areas of concerns you are highlighting to the local authority
Use the following format for the detail section:
***VAF***
Appearance: <Physical injuries, hygiene, or immediate surroundings>
Behaviour: <Actions that do not fit the situation, confusion, or distress>
Communication: <Difficulties speaking, understanding, or expressing needs>
Danger: <Whether the individual is at risk of harming themselves or being harmed by others>
Environment: <Where the person is located and if external factors like weather or dangerous people are affecting them>

Additional instructions:

- The DETAILS section must follow the Vulnerability Assessment Framework (VAF) ABCDE format exactly.
- Each VAF letter must appear on its own line.
- Keep each section brief and operationally useful.
- Only include information relevant to safeguarding.
- Distinguish between confirmed facts and unknown information.
- If a VAF category has no relevant information, write "Not identified."
- Do not create safeguarding concerns simply because an offence has occurred.
- Where the user provides additional concerns, incorporate them only if they are relevant and clearly identified as concerns.
- Be objective, factual, proportionate, and suitable for inclusion within a police incident record.

Remember:
- Accuracy is more important than completeness.
- Never fill gaps with assumptions.
- Never invent vulnerability, risk, or safeguarding needs.

Incident Details (as JSON):
`;

export const Safeguarding = ({
  register,
  getValues,
}: {
  register: UseFormRegister<GenericFormFields>;
  getValues: UseFormGetValues<GenericFormFields>;
}) => {
  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const toastEl = useRef<HTMLIcToastElement | null>(null);

  const copyToClipboard = async () => {
    const dets = getValues();

    // Users can add bullet points to this section
    // if (dets.safeguardingDetails) delete dets.safeguardingDetails;
    if (dets.safeguardingActions) delete dets.safeguardingActions;
    if (dets.safeguardingDescription) delete dets.safeguardingDescription;

    try {
      await navigator.clipboard.writeText(prompt + JSON.stringify(dets));
      showToast();
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const showToast = () => {
    if (toastRegionEl.current && toastEl.current) {
      toastRegionEl.current.openToast = toastEl.current;
    }
  };

  return (
    <div>
      <IcToastRegion ref={toastRegionEl}>
        <IcToast
          variant="ai"
          heading="Copied"
          message="Copilot prompt copied to clipboard"
          dismissMode="automatic"
          ref={toastEl}
        />
      </IcToastRegion>
      <div className="flex items-center gap-2">
        <IcTypography variant="h3" className="my-2">
          Safeguarding Triage
        </IcTypography>
        <IcButton
          variant="icon-tertiary"
          className="mb-2"
          aria-label="Copy AI prompt"
          onClick={copyToClipboard}
        >
          <SlottedSVG
            path={mdiCreation}
            slot="left-icon"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          />
        </IcButton>
      </div>
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
