import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export const useGetIncidents = () =>
  useLiveQuery(() => db.incidents.orderBy("id").toArray());
