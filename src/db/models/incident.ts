import { Entity } from "dexie";
import { AppDB } from "..";

export default class Incident extends Entity<AppDB> {
  id!: number;
  cadNumber!: number;
  date!: string;
  location?: string;
}
