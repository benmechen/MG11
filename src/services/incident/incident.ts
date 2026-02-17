import { format, parse } from "date-fns";
import { AppDB } from "../../db";
import { PersonService } from "../person/person";
import { PersonDto } from "../person/personDto";
import { IncidentDto } from "./incidentDto";
import Incident from "../../db/models/incident";
import { isValidId } from "../../utils/isValidId";

export class IncidentService {
  private personService: PersonService;

  constructor(private db: AppDB) {
    this.personService = new PersonService(db);
  }

  dateToString(date: Date) {
    return format(date, "ddMMMyy").toUpperCase();
  }

  stringToDate(string: string) {
    return parse(string, "ddMMMyy", new Date());
  }

  toString(incident: Incident) {
    const dateObject = this.stringToDate(incident.date);
    return `${incident.cadNumber}/${format(dateObject, "ddMMMyy").toUpperCase()}`;
  }

  async findById(id: number | string) {
    if (!isValidId(id)) {
      throw new Error("Invalid incident ID");
    }
    return this.db.incidents.get(Number(id));
  }

  async findByCad(cadNumber: number, date: string) {
    return this.db.incidents
      .where({ cadNumber, date: date.toUpperCase() })
      .first();
  }

  async getAll() {
    return this.db.incidents.toArray();
  }

  /**
   * Create a new incident
   * @param data Incident details, including people involved
   */
  async create({ people, ...data }: IncidentDto & { people?: PersonDto[] }) {
    let incident = (
      await this.findByCad(data.cadNumber, this.dateToString(data.date))
    )?.id;

    if (!incident)
      incident = await this.db.incidents.add({
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

  async update(
    id: number,
    { people, ...data }: Partial<IncidentDto> & { people?: PersonDto[] }
  ) {
    const incident = await this.db.incidents.get(id);
    if (!incident) throw new Error("Incident not found");

    // let personIds: number[] = [];
    // if (people) {
    //   for (const person of people) {
    //     if (!person.id) {
    //       const personId = await this.personService.create({
    //         ...person,
    //         incidentId: id,
    //       });
    //       personIds.push(personId);
    //     } else {
    //       personIds.push(person.id);
    //       await this.personService.update(person.id, person);
    //     }
    //   }
    // }

    return this.db.incidents.update(id, {
      ...data,
      date: data.date ? this.dateToString(data.date) : incident.date,
      cadNumber: data.cadNumber ?? incident.cadNumber,
    });
  }

  /**
   * Delete an incident
   * @param id Incident ID
   */
  async delete(id: number) {
    return this.db.incidents.delete(id);
  }
}
