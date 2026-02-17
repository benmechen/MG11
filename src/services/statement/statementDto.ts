import Statement from "../../db/models/statement";
import { IncidentDto } from "../incident/incidentDto";
import { PersonDto } from "../person/personDto";

export interface StatementDto
  extends Omit<Statement, "id" | "table" | "db" | "created" | "updated"> {
  person?: PersonDto;
  incident?: IncidentDto;
}
