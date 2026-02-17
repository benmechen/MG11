import { mdiCalendar } from "@mdi/js";
import { IcCardVertical, SlottedSVG } from "@ukic/react";
import { useAppContext } from "../app-context";
import { format } from "date-fns";

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
}: IIncidentCard) => {
  const { incidentService } = useAppContext();
  const dateObject = incidentService.stringToDate(date);

  return (
    <IcCardVertical
      heading={`${cadNumber}/${format(dateObject, "ddMMMyy").toUpperCase()}`}
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
    </IcCardVertical>
  );
};
