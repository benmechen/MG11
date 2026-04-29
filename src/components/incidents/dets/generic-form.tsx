import { useForm } from "react-hook-form";
import { Textbox } from "./textbox";
import { StatusIndicator } from "./status-indicator";
import { useRhfAutosaveConfig } from "./useRhfAutosaveConfig";

export interface GenericFormFields extends Record<string, string | undefined> {
  generalActions?: string;
  scenes?: string;
  forensic?: string;
  victimsWitnesses?: string;
  suspects?: string;
  otherActions?: string;
  solvability?: string;
  thrive?: string;
}

interface IGenericFormProps<T extends Record<string, string | undefined>> {
  id: number;
  cad?: string;
  location?: string;
  dets?: { [key: string]: string };
  onUpdate: (data: T) => Promise<void>;
}

export const GenericForm = ({
  cad,
  location,
  dets,
  onUpdate,
}: IGenericFormProps<GenericFormFields>) => {
  const form = useForm<GenericFormFields>({
    defaultValues: {
      generalActions:
        dets?.["generalActions"] ||
        `- CAD: ${cad}
- Call sign: 
- Attending Officers: 
- Location: ${location ?? ""}
- Offence: 
- First Aid: 

- Arresting Officer: 
- Time of arrest: 
- Relevant time: 

- Provide a narrative of what happened, when, where, who was involved and why.
- Take care to only record sensitive personal data on relevant person cards.
- Ensure that all officers in attendance are recorded.
- Establish details of all offences alleged.
- What are the points to prove for the offence and are they complete?`,
      scenes:
        dets?.["scenes"] ||
        `- Specify actions taken to identify & preserve crime scenes, and to minimise identified risks and hazards.
- Consider victims route into the scene - where had they been just before?
- Specify positive and negative CCTV enquiries undertaken. (Consider Local Authority, Private CCTV & DashCams)
- Has identified CCTV been viewed? If not, what type of system?`,
      forensic:
        dets?.["forensic"] ||
        `- Specify actions to preserve forensic evidence and prevent cross contamination.
- Consider whether Suspect touched Victim (think Blood, Saliva, trace DNA)
- If evidence is seized, record Exhibit Number and location.
- Was an Early Evidence Kit used?
- Has SOCO been liaised with at scene? Include Forensic Examiner Jobsheet Number, if known.`,
      victimsWitnesses:
        dets?.["victimsWitnesses"] ||
        `- Outline the evidence each can provide and obtain statements.
- Record appearance and clothing for elimination purposes. Identify significant witnesses.
- Where needed, confirm medical consent obtained from the victim and document/photograph injuries.
- Specify positive and negative Local Directed enquiries to locate further witnesses.
- Have victim or witness MG11's been taken?`,
      suspects:
        dets?.["suspects"] ||
        `- Ensure the First Description is recorded and circulated, including any words used and any distinctive elements.
- Document any ID procedures conducted including Drive Round & Street ID / Video Capture in custody.
- Document any arrest enquiries undertaken.
- If suspect arrested - have s18/32 searches been completed?
- Consider photographing / BWV of clothing worn at time of arrest.
- On arrest, were checks completed for Tagging Spray / Smartwater etc.`,
      otherActions:
        dets?.["otherActions"] ||
        `- Such as: Details of any CID officer spoken to
- Details of any Drive Round
- Usage details of stolen cards;
- Ensure victim obtains IMEI from provider or watch serial number
- Details of any tracking software enabled/ activated;
- Any reasons for any late reporting`,
      solvability:
        dets?.["solvability"] ||
        `- Based on my initial assessment of material evidence I request this report is screened in for further investigation.
- Provide rationale why you consider the investigation complete, or which proportionate lines of enquiry justify further investigation.
- Confirm that you have informed the victim of your decision.`,
      thrive:
        dets?.["thrive"] ||
        `- THREAT - Threat is a communicated or perceived intent to inflict harm or loss on another person.
- HARM - Harm is to do or cause harm e.g. to injure, damage, hurt/physical or psychological
- RISK - Risk is the likelihood of the event occurring
- INVESTIGATION - Investigation is the act or process of examining crime, problem or situation and considering what action is required.
- VULNERABILITY - Vulnerability is defined for the purpose of incident management as “a person is vulnerable if as a result of their situation or circumstances they are unable to take care or protect themselves or others from harm or exploitation.
- ENGAGEMENT - Engagement is where organisations and individuals build positive relationships for the benefit of all parties.
- PREVENTION and INTERVENTION - Prevention and intervention is identifying opportunities to prevent further incidents occurring or worsening of threat, risk and harm and allocating the most appropriate resources (Police or Partnership) to intervene before further, more serious police intervention is required.`,
    },
  });

  const { isSaving, hasPendingChanges } =
    useRhfAutosaveConfig<GenericFormFields>(onUpdate, {
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
        label="General Actions"
        helperText="Provide a narrative of what happened, when, where, who was involved and why"
        spellCheck
        autoCapitalize="on"
        rows={16}
        {...register("generalActions")}
      />
      <Textbox
        label="Scenes"
        helperText="Specify actions taken to identify & preserve crime scenes, and to minimise identified risks and hazards"
        spellCheck
        autoCapitalize="on"
        rows={6}
        {...register("scenes")}
      />
      <Textbox
        label="Forensic"
        helperText="Specify actions to preserve forensic evidence and prevent cross contamination"
        spellCheck
        autoCapitalize="on"
        rows={6}
        {...register("forensic")}
      />
      <Textbox
        label="Victims and Witnesses"
        helperText="Outline the evidence each can provide and obtain statements"
        spellCheck
        autoCapitalize="on"
        rows={6}
        {...register("victimsWitnesses")}
      />
      <Textbox
        label="Suspects"
        spellCheck
        autoCapitalize="on"
        rows={6}
        {...register("suspects")}
      />
      <Textbox
        label="Any other investigative details/actions"
        spellCheck
        autoCapitalize="on"
        rows={6}
        {...register("otherActions")}
      />
      <Textbox
        label="Solvability Assessment"
        helperText="Follow Crime Assessment Principles"
        spellCheck
        autoCapitalize="on"
        rows={6}
        {...register("solvability")}
      />
      <Textbox
        label="THRIVE+"
        spellCheck
        autoCapitalize="on"
        rows={15}
        {...register("thrive")}
      />
    </div>
  );
};
