import { Entity } from "dexie";
import { AppDB } from "..";

export default class Statement extends Entity<AppDB> {
  id!: number;
  created!: number;
  updated!: number;
  status!: "draft" | "completed";
  signature?: string;
  statement?: string;
  incidentId?: number;
  personId?: number;
  templateId?: number;
}
