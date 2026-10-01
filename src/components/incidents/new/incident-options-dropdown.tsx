import { mdiLinkVariant, mdiEmail, mdiText, mdiCreation } from "@mdi/js";
import {
  IcPopoverMenu,
  IcMenuGroup,
  IcMenuItem,
  SlottedSVG,
  IcToastRegion,
  IcToast,
} from "@ukic/react";
import { useRef } from "react";
import { useAppContext } from "../../app-context";
import Incident from "../../../db/models/incident";
import { generateDetsQualityPrompt } from "../../../utils/prompts/detsQualityPrompt";

interface IIncidentOptionsDropdownProps {
  id: string | number;
  open: boolean;
  onClose: () => void;
  onLink?: () => void;
  onEmail?: () => void;
}

export const IncidentOptionsDropdown = ({
  id,
  open,
  onClose,
  onLink,
  onEmail,
}: IIncidentOptionsDropdownProps) => {
  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const aiToastEl = useRef<HTMLIcToastElement | null>(null);

  const { incidentService } = useAppContext();

  const copyAiPrompt = async (
    promptGenerator: (incident: Incident) => string,
  ) => {
    const incident = await incidentService.findById(id);

    if (!incident) {
      console.error("Incident not found");
      return;
    }

    try {
      await navigator.clipboard.writeText(promptGenerator(incident));
      showToast();
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const showToast = () => {
    if (toastRegionEl.current && aiToastEl.current) {
      toastRegionEl.current.openToast = aiToastEl.current;
    }
  };

  return (
    <>
      <IcPopoverMenu
        anchor="export-button"
        aria-label="popover"
        open={open}
        onIcPopoverClosed={onClose}
      >
        <IcMenuGroup label="AI Prompts">
          <IcMenuItem
            label="Quality check dets"
            onClick={() => copyAiPrompt(generateDetsQualityPrompt)}
          >
            <SlottedSVG slot="icon" path={mdiCreation} />
          </IcMenuItem>
        </IcMenuGroup>
        <IcMenuGroup label="Export">
          <IcMenuItem label="Link" onClick={onLink}>
            <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiLinkVariant} />
          </IcMenuItem>
          <IcMenuItem label="Email" onClick={onEmail}>
            <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiEmail} />
          </IcMenuItem>
          <IcMenuItem label="Plain text" href="export">
            <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiText} />
          </IcMenuItem>
        </IcMenuGroup>
      </IcPopoverMenu>
      <IcToastRegion ref={toastRegionEl}>
        <IcToast
          variant="ai"
          heading="Copied"
          message="Copilot prompt copied to clipboard"
          dismissMode="automatic"
          ref={aiToastEl}
        />
      </IcToastRegion>
    </>
  );
};
