import { db } from ".";

export const populate = async () =>
  db.templates.bulkAdd([
    {
      name: "Generic Statement",
      description: "Generic witness statement",
      fields: [],
      statement: "this is my statement",
      created: Date.now(),
    },
    {
      name: "Arrest Statement",
      description: "Generic officer arrest statement",
      fields: [],
      statement: "this is my statement",
      created: Date.now(),
    },
    {
      name: "Assualt",
      description: "Common assualt, ABH and GBH level assualts",
      fields: [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
        },
      ],
      statement: "",
      created: Date.now(),
    },
    {
      name: "Theft",
      description: "All types of theft",
      fields: [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
        },
      ],
      statement: "",
      created: Date.now(),
    },
  ]);
