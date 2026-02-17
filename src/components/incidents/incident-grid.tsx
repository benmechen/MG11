import { IcTypography } from "@ukic/react";
import { useGetIncidents } from "../../hooks/useGetIncidents";
import { IncidentCard } from "./incident-card";
import Incident from "../../db/models/incident";
import { useMemo } from "react";
import { IncidentService } from "../../services/incident/incident";
import { db } from "../../db";
import { compareDesc } from "date-fns";

const incidentService = new IncidentService(db);

interface IIncidentCard {
  onCardClick?: (cadNumber: number, date: string) => void;
}
export const IncidentGrid = ({ onCardClick }: IIncidentCard) => {
  const incidents = useGetIncidents();

  const groupedIncidents = useMemo(
    () =>
      incidents?.reduce<{
        [id: string]: { month: number; year: number; incidents: Incident[] };
      }>((acc, incident) => {
        const date = incidentService.stringToDate(incident.date);

        const key = `${date.getMonth()}-${date.getFullYear()}`;

        if (!acc[key])
          acc[key] = {
            month: date.getMonth(),
            year: date.getFullYear(),
            incidents: [],
          };

        acc[key].incidents.push(incident);

        return acc;
      }, {}),
    [incidents]
  );

  if (!incidents || incidents.length === 0)
    return (
      <div className="">
        <IcTypography>No incidents found</IcTypography>
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groupedIncidents ?? {})
        .sort(([, a], [, b]) => b.year + b.month - (a.year + a.month))
        .map(([key, { month, year, incidents }]) => (
          <div key={key}>
            <IcTypography variant="h3">
              {new Date(0, month).toLocaleString("default", { month: "long" })}{" "}
              {year}
            </IcTypography>
            <div className="flex gap-4 mt-4">
              {incidents
                .sort((a, b) =>
                  a.date != b.date
                    ? compareDesc(
                        incidentService.stringToDate(a.date),
                        incidentService.stringToDate(b.date)
                      )
                    : b.cadNumber - a.cadNumber
                )
                .map((incident) => (
                  <IncidentCard
                    cadNumber={incident.cadNumber}
                    date={incident.date}
                    location={incident.location}
                    onClick={onCardClick}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
