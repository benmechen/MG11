import { Entity } from "dexie";
import { AppDB } from "..";
import { HTMLInputTypeAttribute } from "react";

export default class Template extends Entity<AppDB> {
  id!: number;
  name!: string;
  description!: string;
  created!: number;
  fields!: {
    name: string;
    label: string;
    type: HTMLInputTypeAttribute;
  }[];
  statement!: string;
}
