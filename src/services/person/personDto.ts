import Person from "../../db/models/person";

export interface PersonDto
  extends Omit<Person, "table" | "db" | "dateOfBirth"> {
  dateOfBirth: Date;
}
