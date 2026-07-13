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

On {{ date }}...`,
      created: Date.now(),
    },
    {
      name: "Arrest Statement",
      description: "Generic officer arrest statement",
      fields: [],
      statement:
        "This is my statement regarding the arrest of ___________. On {{ date }} I was on duty in full uniform in a marked/unmarked patrol car, callsign CN21E. I attended to CAD {{ cad }} at {{ location }}.",
      created: Date.now(),
    },
  ]);
