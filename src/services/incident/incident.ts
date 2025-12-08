import { format } from "date-fns";
import { AppDB } from "../../db";
import { PersonService } from "../person/person";
import { PersonDto } from "../person/personDto";
import { IncidentDto } from "./incidentDto";

export class IncidentService {
  private personService: PersonService;

  constructor(private db: AppDB) {
    this.personService = new PersonService(db);
  }

  dateToString(date: Date) {
    return format(date, "dd-MM-yyyy");
  }

  async findById(cadNumber: number, date: string) {
    return this.db.incidents.where({ cadNumber, date }).first();
  }

  /**
   * Create a new incident
   * @param data Incident details, including people involved
   */
  async create({ people, ...data }: IncidentDto & { people?: PersonDto[] }) {
    const incident = await this.db.incidents.add({
      date: this.dateToString(data.date),
      cadNumber: Number(data.cadNumber),
    });

    if (!people) return incident;

    for (const person of people) {
      await this.personService.create({
        ...person,
        incidentId: incident,
      });
    }

    return incident;
  }
}
