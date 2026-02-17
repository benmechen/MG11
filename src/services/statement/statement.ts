import { format, parse } from "date-fns";
import { AppDB } from "../../db";
import { PersonService } from "../person/person";
import { IncidentService } from "../incident/incident";
import { StatementDto } from "./statementDto";
import Person from "../../db/models/person";
import Incident from "../../db/models/incident";

export class StatementService {
  private personService: PersonService;
  private incidentService: IncidentService;

  constructor(private db: AppDB) {
    this.personService = new PersonService(db);
    this.incidentService = new IncidentService(db);
  }

  dateToString(date: Date) {
    return format(date, "dd-MM-yyyy");
  }

  stringToDate(string: string) {
    return parse(string, "dd-MM-yyyy", new Date());
  }

  async getById(id: number | string) {
    if (Number.isNaN(Number(id))) {
      throw new Error("Invalid statement ID");
    }
    const statement = await this.db.statements.get(Number(id));

    let person: Person | undefined;
    if (statement?.personId) {
      person = await this.personService.getById(statement.personId);
    }

    let incident: Incident | undefined;
    if (statement?.incidentId) {
      incident = await this.incidentService.findById(statement.incidentId);
    }

    return { ...statement, person, incident };
  }

  /**
   * Create a new statement
   * @param data Statement details
   */
  async create({ person, ...data }: StatementDto) {
    let personId: number | undefined;
    if (person) {
      await this.personService.create(person);
    }

    const statement = await this.db.statements.add({
      ...data,
      created: Date.now(),
      updated: Date.now(),
      personId,
    });

    if (!person) return statement;

    return statement;
  }

  /**
   * Update a statement
   * @param id Statement ID
   * @param updates Partial update
   * @returns Updated statement
   */
  async update(
    id: number,
    { person, incident, ...updates }: Partial<StatementDto>
  ) {
    const statement = await this.getById(id);

    let personId = statement.personId || updates.personId;
    if (person) {
      if (!personId) personId = await this.personService.create(person);
      else await this.personService.update(personId, person);
    }

    let incidentId = statement.incidentId || updates.incidentId;
    if (incident) {
      if (!incidentId) incidentId = await this.incidentService.create(incident);
      else await this.incidentService.update(incidentId, incident);
    }

    return this.db.statements.update(id, {
      ...updates,
      personId,
      incidentId,
      updated: Date.now(),
    });
  }

  /**
   * Delete an incident
   * @param id Incident ID
   */
  async delete(id: number) {
    return this.db.statements.delete(id);
  }
}
