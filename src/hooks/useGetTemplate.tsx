import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

export const useGetTemplate = (id: number | undefined) =>
  useLiveQuery(() =>
    db.templates
      .where("id")
      .equals(id ?? -1)
      .first()
  );
