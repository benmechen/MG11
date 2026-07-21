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

Your task is to generate a THRIVE+ assessment using ONLY the information provided below.

Rules:

- Only use information explicitly contained within the incident details.
- Never infer, speculate, exaggerate or invent facts.
- If information for a section is not available, write "Not identified."
- Use concise, operational policing language.
- Each THRIVE+ heading must be on its own line followed by a single short sentence.
- Each section should normally be no more than 15-25 words.
- Do not repeat information unnecessarily between sections.
- Focus on risk assessment and policing decision making rather than retelling the incident.
- Use UK English.
- Do not include introductions, explanations or concluding remarks.
- Output only the THRIVE+ assessment.

Use the following format exactly:

 - THREAT: <Threat assessment>
 - HARM: <Harm assessment>
 - RISK: <Risk assessment>
 - INVESTIGATION: <Investigation opportunities>
 - VICTIM: <Victim considerations>
 - ENGAGEMENT: <Engagement considerations>
 - PREVENTION and INTERVENTION: <Powers, policy, safeguarding or other relevant considerations>

Do not add bullet points, use "-" only to prevent issues with copying into other systems.

Guidance for each section:

T:
Describe any immediate or ongoing threat to people, property or the investigation.

H:
State the actual or potential harm caused or likely to occur.

R:
Identify the overall policing risk requiring management.

I:
Summarise key investigative opportunities or evidential actions already identified.

V:
State any victim welfare, vulnerability or safeguarding considerations.

E:
Describe any engagement required with victims, witnesses, suspects, partner agencies or the public.

+:
Include any relevant policing powers, safeguarding measures, necessity, policy considerations or state "Not identified."

Remember:
- Be objective.
- Be factual.
- Be proportionate.
- Be operationally useful.
- Never create information that has not been provided.

Incident Details (as JSON):
`;

export const Thrive = ({
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

    if (dets.thrive) delete dets.thrive;

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
        <IcTypography variant="label">THRIVE+</IcTypography>
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
        spellCheck
        autoCapitalize="on"
        rows={15}
        {...register("thrive")}
      />
    </div>
  );
};
