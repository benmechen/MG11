import { useEffect, useState } from "react";
import { IcButton, IcDialog, IcTypography } from "@ukic/react";
// import { sign } from "jsonwebtoken";
import * as jose from "jose";
import { useAppContext } from "../app-context";

interface IShareIncidentModal {
  id: number;
  open: boolean;
  onClose: () => void;
}

export const ShareIncidentModal = ({
  open,
  id,
  onClose,
}: IShareIncidentModal) => {
  const { incidentService } = useAppContext();
  const [shareLink, setShareLink] = useState<string>("");

  useEffect(() => {
    const generateLink = async () => {
      const incident = await incidentService.findById(id);
      if (!incident) return;
      console.log("Incident for sharing:", incident, typeof incident);
      const secret = new TextEncoder().encode(
        "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2",
      );
      const alg = "HS256";

      const jwt = await new jose.SignJWT({
        ...incident,
      } as unknown as jose.JWTPayload)
        .setProtectedHeader({ alg })
        .sign(secret);

      setShareLink(
        `https://${window.location.hostname}/incidents/${incident?.date}/${incident?.cadNumber}/import?token=${jwt}`,
      );
    };

    if (!open) return;
    generateLink();
  }, [open, id]);

  return (
    <IcDialog
      heading="Share Incident"
      label="Share a copy of this incident"
      open={open}
      onIcDialogClosed={(open && onClose) || undefined}
      hideDefaultControls
    >
      <IcTypography className="max-w-96">
        This link will provide a copy of the incident details as they are at the
        time of sharing. Any subsequent updates to the incident will not be
        reflected in the shared copy.
      </IcTypography>
      <div className="flex justify-center items-end gap-4 pt-2">
        <IcTypography className="border border-ic-architectural-400 p-2 h-5 overflow-x-scroll text-ic-text-field-text ">
          {shareLink}
        </IcTypography>
        <IcButton onClick={() => navigator.clipboard.writeText(shareLink)}>
          Copy
        </IcButton>
      </div>
    </IcDialog>
  );
};
