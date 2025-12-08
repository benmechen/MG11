import { format } from "date-fns";
import { AppDB } from "../../db";
import { PersonDto } from "./personDto";

export class PersonService {
  constructor(private db: AppDB) {}

  dateToString(date: Date) {
    return format(date, "dd/MM/yyyy");
  }

  /**
   * Find people included in an incident
   * @param incidentId [CAD Number, Date]
   * @returns
   */
  async findByIncident(incidentId: number) {
    return this.db.people.where({ incidentId }).toArray();
  }

  /**
   * Create a new incident
   * @param data Incident details, including people involved
   */
  async create(data: PersonDto) {
    return this.db.people.add({
      ...data,
      dateOfBirth: this.dateToString(data.dateOfBirth),
    });
  }
}
