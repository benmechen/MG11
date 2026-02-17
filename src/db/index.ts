import Dexie, { EntityTable } from "dexie";
import Statement from "./models/statement";
import Template from "./models/template";
import { populate } from "./populate";
import Incident from "./models/incident";
import Person from "./models/person";

export class AppDB extends Dexie {
  statements!: EntityTable<Statement, "id">;
  templates!: EntityTable<Template, "id">;
  incidents!: EntityTable<Incident, "id">;
  people!: EntityTable<Person, "id">;

  constructor() {
    super("MG11sDB");
    this.version(1).stores({
      statements: "++id, name, created, incidentId",
      templates: "++id, name, created",
      incidents: "++id, cadNumber, date, [cadNumber+date]",
      people:
        "++id, firstName, lastName, dateOfBirth, phoneNumber, emailAddess, incidentId",
    });
    this.statements.mapToClass(Statement);
    this.templates.mapToClass(Template);
    this.incidents.mapToClass(Incident);
    this.incidents.mapToClass(Person);
  }
}

export const db = new AppDB();

// db.delete();
db.on("populate", populate);
