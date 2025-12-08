import { IcTypography } from "@ukic/react";
import { useGetIncidents } from "../../hooks/useGetIncidents";
import { IncidentCard } from "./incident-card";

interface IIncidentCard {
  onCardClick?: (cadNumber: number, date: string) => void;
}
export const IncidentGrid = ({ onCardClick }: IIncidentCard) => {
  const templates = useGetIncidents();

  if (!templates || templates.length === 0)
    return (
      <div className="">
        <IcTypography>No incidents found</IcTypography>
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((incident) => (
        <IncidentCard
          cadNumber={incident.cadNumber}
          date={incident.date}
          location={incident.location}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};
