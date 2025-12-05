import { IcCard, IcStatusTag, SlottedSVG } from "@ukic/react";

interface IDocumentCard {
  name: string;
  template?: string;
  created: Date;
  lastUpdate: Date;
  status: "draft" | "completed";
}
export const DocumentCard = ({ name, status }: IDocumentCard) => (
  <IcCard heading={name} clickable>
    {status === "completed" ? (
      <IcStatusTag slot="adornment" label="Completed" status="success" />
    ) : (
      <IcStatusTag slot="adornment" label="Draft" status="neutral" />
    )}
    <SlottedSVG slot="image-mid" viewBox="0 0 1600 1250">
      <rect fill="#ff7700" width="1600" height="1600" y="-350" />
      <polygon fill="#cc0000" points="957 450 539 900 1396 900" />
      <polygon fill="#aa0000" points="957 450 872.9 900 1396 900" />
      <polygon fill="#c50022" points="-60 900 398 662 816 900" />
      <polygon fill="#a3001b" points="337 900 398 662 816 900" />
      <polygon fill="#be0044" points="1203 546 1552 900 876 900" />
      <polygon fill="#9c0036" points="1203 546 1552 900 1162 900" />
      <polygon fill="#b80066" points="641 695 886 900 367 900" />
      <polygon fill="#960052" points="587 900 641 695 886 900" />
      <polygon fill="#b10088" points="1710 900 1401 632 1096 900" />
      <polygon fill="#8f006d" points="1710 900 1401 632 1365 900" />
      <polygon fill="#aa00aa" points="1210 900 971 687 725 900" />
      <polygon fill="#880088" points="943 900 1210 900 971 687" />
    </SlottedSVG>
  </IcCard>
);
