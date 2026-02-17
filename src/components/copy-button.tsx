import { mdiContentCopy } from "@mdi/js";
import { IcToastRegion, IcToast, IcButton, SlottedSVG } from "@ukic/react";
import { useRef } from "react";

interface ICopyButtonProps {
  value: string | undefined;
  slot?: string;
  show?: boolean;
}

export const CopyButton = ({ value, slot, show = true }: ICopyButtonProps) => {
  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const toastEl = useRef<HTMLIcToastElement | null>(null);

  const showToast = () => {
    if (toastRegionEl.current && toastEl.current) {
      toastRegionEl.current.openToast = toastEl.current;
    }
  };

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast();
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  if (!show || value === undefined) return null;

  return (
    <div slot={slot}>
      <IcToastRegion ref={toastRegionEl}>
        <IcToast
          heading="Copied to clipboard"
          variant="success"
          dismissMode="automatic"
          ref={toastEl}
        />
      </IcToastRegion>
      <IcButton
        variant="icon-tertiary"
        size="small"
        onClick={() => copyToClipboard(value)}
      >
        <SlottedSVG viewBox="0 0 24 24" path={mdiContentCopy} />
      </IcButton>
    </div>
  );
};
