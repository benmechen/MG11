import { format } from "date-fns";
import Incident from "../db/models/incident";
import { IncidentService } from "../services/incident/incident";

export const templateStatement = (
  template: (context: any) => string,
  incidentService: IncidentService,
  incident?: Incident,
) =>
  template({
    cad: incident ? incidentService.toString(incident) : undefined,
    date: format(new Date(), "EEEE do MMMM yyyy").toUpperCase(),
    location: incident?.location?.toUpperCase(),
  });
