import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export const useGetTemplates = () =>
  useLiveQuery(() => db.templates.orderBy("id").toArray());
