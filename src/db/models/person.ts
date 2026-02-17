import { Entity } from "dexie";
import { AppDB } from "..";

export default class Person extends Entity<AppDB> {
  id!: number;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  emailAddress?: string;
  address?: {
    line1: string;
    line2?: string;
    city?: string;
    postcode: string;
  };
  ocupation?: string;
  incidentId?: number;
}
