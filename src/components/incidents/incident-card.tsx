import { mdiCalendar } from "@mdi/js";
import { IcCard, SlottedSVG } from "@ukic/react";

interface IIncidentCard {
  cadNumber: number;
  date: string;
  location?: string;
  onClick?: (cadNumber: number, date: string) => void;
}
export const IncidentCard = ({
  cadNumber,
  date,
  location,
  onClick,
}: IIncidentCard) => (
  <IcCard
    heading={`${cadNumber}/${date.replaceAll("-", "")}`}
    message={location}
    onClick={() => onClick?.(cadNumber, date)}
    clickable
  >
    <SlottedSVG
      slot="icon"
      path={mdiCalendar}
      viewBox="0 0 24 24"
      width="24"
      height="24"
    />
  </IcCard>
);
