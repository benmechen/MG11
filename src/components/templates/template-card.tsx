import { mdiFileDocumentOutline } from "@mdi/js";
import { IcCardVertical, SlottedSVG } from "@ukic/react";

interface ITemplateCard {
  id: number;
  name: string;
  description?: string;
  onClick?: (id?: number) => void;
}
export const TemplateCard = ({
  id,
  name,
  description,
  onClick,
}: ITemplateCard) => (
  <IcCardVertical
    heading={name}
    message={description}
    onClick={() => onClick?.(id)}
    clickable
    fullWidth
  >
    <SlottedSVG
      slot="icon"
      path={mdiFileDocumentOutline}
      viewBox="0 0 24 24"
      width="24"
      height="24"
    />
  </IcCardVertical>
);
