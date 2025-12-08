import Incident from "../../db/models/incident";

export interface IncidentDto
  extends Omit<Incident, "id" | "table" | "db" | "date"> {
  date: Date;
}
