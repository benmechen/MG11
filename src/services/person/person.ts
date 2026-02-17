import { format, parse } from "date-fns";
import { AppDB } from "../../db";
import { PersonDto } from "./personDto";

export class PersonService {
  constructor(private db: AppDB) {}

  dateToString(date: Date) {
    return format(date, "dd/MM/yyyy");
  }

  stringToDate(string: string) {
    return parse(string, "dd/MM/yyyy", new Date());
  }

  getById(id: number | string) {
    if (Number.isNaN(Number(id))) {
      throw new Error("Invalid person ID");
    }
    return this.db.people.get(Number(id));
  }

  /**
   * Find people included in an incident
   * @param incidentId [CAD Number, Date]
   * @returns
   */
  async findByIncident(incidentId: number) {
    console.log("Finding people for incident ID:", incidentId);
    return this.db.people.where({ incidentId }).toArray();
  }

  /**
   * Create a new incident
   * @param data Incident details, including people involved
   */
  async create(data: PersonDto) {
    return this.db.people.add({
      ...data,
      dateOfBirth: data.dateOfBirth
        ? this.dateToString(data.dateOfBirth)
        : undefined,
    });
  }

  /**
   * Update a person's details
   * @param id Person ID
   * @param data Fields to change
   * @returns Updated details
   */
  async update(id: number, data: Partial<PersonDto>) {
    return this.db.people.update(id, {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? this.dateToString(data.dateOfBirth)
        : data.dateOfBirth,
    });
  }

  /**
   * Delete a person
   * @param id Person ID
   */
  async delete(id: number) {
    return this.db.people.delete(id);
  }
}
