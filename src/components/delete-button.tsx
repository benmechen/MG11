import { mdiDelete } from "@mdi/js";
import { IcButton, SlottedSVG } from "@ukic/react";

export const DeleteButton = ({
  onClick,
}: {
  onClick: () => void | Promise<void>;
}) => (
  <IcButton slot="actions" variant="destructive" onClick={onClick}>
    Delete
    <SlottedSVG
      slot="right-icon"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      path={mdiDelete}
    />
  </IcButton>
);
