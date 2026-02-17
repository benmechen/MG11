import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export const useGetIncident = (cadNumber: number, date: string) => {
  return useLiveQuery(() => db.incidents.where({ cadNumber, date }).first());
};
