import { Entity } from "dexie";
import { AppDB } from "..";

export default class Incident extends Entity<AppDB> {
  id!: number;
  cadNumber!: number;
  date!: string;
  location?: string;
  dets?: { [key: string]: string };
  dara?: {
    [key: string]: { rating: string; label: string; comments?: string };
  };
}
