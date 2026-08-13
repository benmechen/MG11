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
import { generateThrivePrompt } from "../../../utils/prompts/generateThrivePrompt";

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
      await navigator.clipboard.writeText(
        generateThrivePrompt(JSON.stringify(dets)),
      );
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
