import { useForm } from "react-hook-form";
import { useRhfAutosave } from "react-hook-form-autosave";
import { IcTypography } from "@ukic/react";
import { Textbox } from "./textbox";
import { useAppContext } from "../../app-context";

interface DomesticFormFields {
  generalActions?: string;
  scenes?: string;
  forensic?: string;
  victimsWitnesses?: string;
  suspects?: string;
  otherActions?: string;
  checks?: string;
  thrive?: string;
  safeguardingDetails?: string;
  safeguardingActions?: string;
  safeguardingDescription?: string;
}

interface IDomesticFormProps {
  id: number;
  cad?: string;
  location?: string;
  dets?: { [key: string]: string };
}

export const DomesticForm = ({ id, cad, location, dets }: IDomesticFormProps) => {
  const { incidentService } = useAppContext();

  const form = useForm<DomesticFormFields>({
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
      checks:
        dets?.["checks"] ||
        `- Expand here on any risk identified from the DARA assessment and 5 year history search.
- Document any safety planning advice or actions undertaken.
- RARA - Action taken to...
...remove the risk	
...avoid the risk	
...reduce the risk	
...accept the risk
*see 124D risk management page for suggested actions: If you write the same thing in more than one box, you are doing it wrong! Sometimes none is the right action to take.`,
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

  useRhfAutosave({
    form,
    transport: async (data) => {
      console.log("Autosaving data:", data);
      await incidentService.update(id, {
        dets: { ...dets, ...(data as { [key: string]: string }) },
      });
      return {
        ok: true,
      };
    },
  });

  const { register } = form;

  return (
    <div className="flex flex-col gap-4">
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
        label="Checks"
        helperText="Risk, RARA and 5 Year Checks"
        spellCheck
        autoCapitalize="on"
        rows={8}
        {...register("checks")}
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
