import Dexie, { EntityTable } from "dexie";
import Document from "./models/document";
import Template from "./models/template";
import { populate } from "./populate";
import Incident from "./models/incident";
import Person from "./models/person";

export class AppDB extends Dexie {
  documents!: EntityTable<Document, "id">;
  templates!: EntityTable<Template, "id">;
  incidents!: EntityTable<Incident, "id">;
  people!: EntityTable<Person, "id">;

  constructor() {
    super("MG11sDB");
    this.version(1).stores({
      documents: "++id, name, created",
      templates: "++id, name, created",
      incidents: "++id, cadNumber, date",
      people:
        "++id, firstName, lastName, dateOfBirth, phoneNumber, emailAddess, incidentId",
    });
    this.documents.mapToClass(Document);
    this.templates.mapToClass(Template);
    this.incidents.mapToClass(Incident);
    this.incidents.mapToClass(Person);
  }
}

export const db = new AppDB();

// db.delete();
db.on("populate", populate);
