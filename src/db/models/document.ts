import { Entity } from "dexie";
import { AppDB } from "..";

export default class Document extends Entity<AppDB> {
  id!: number;
  name!: string;
  created!: number;
}
