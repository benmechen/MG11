import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export const useGetStatements = () =>
  useLiveQuery(() => db.statements.orderBy("id").toArray());
