import { db } from ".";

export const populate = async () =>
  db.templates.bulkAdd([
    {
      name: "Generic Statement",
      description: "Generic witness statement",
      fields: [],
      statement: `This is my statement regarding...
      
In this statement I will refer to the following people;

In this statement I will refer to the following locations;

On DAY DATE TIME PLACE...`,
      created: Date.now(),
    },
    {
      name: "Arrest Statement",
      description: "Generic officer arrest statement",
      fields: [],
      statement: "This is my statement regarding the arrest of...",
      created: Date.now(),
    },
  ]);
