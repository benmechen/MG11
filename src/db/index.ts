import Dexie, { EntityTable } from "dexie";
import Document from "./models/document";
import Template from "./models/template";
import { populate } from "./populate";

export class AppDB extends Dexie {
  documents!: EntityTable<Document, "id">;
  templates!: EntityTable<Template, "id">;

  constructor() {
    super("MG11sDB");
    this.version(1).stores({
      documents: "++id, name, created",
      templates: "++id, name, created",
    });
    this.documents.mapToClass(Document);
    this.templates.mapToClass(Template);
  }
}

export const db = new AppDB();

// db.delete();
db.on("populate", populate);
