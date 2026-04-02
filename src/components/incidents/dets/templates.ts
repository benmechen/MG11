// interface TemplateField {
//   id: string;
//   label: string;
//   helperText?: string;
//   defaultValue?: string;
// }

// interface Template {
//   fields: TemplateField;
// }

export default {
  generic: {
    generalActions: {
      id: "generalActions",
      label: "General Actions",
      helperText:
        "Provide a narrative of what happened, when, where, who was involved and why",
      defaultValue: `- CAD: {{ cad }}
- Call sign:
- Attending Officers:
- Location: {{ location }}
- Offence:
- First Aid:

- Arresting Officer:
- Time of arrest:
- Relevant time:

- Provide a narrative of what happened, when, where, who was involved and why.
- Take care to only record sensitive personal data on relevant person cards.
- Ensure that all officers in attendance are recorded.
- Establish details of all offences alleged.
- What are the points to prove for the offence and are they complete?`,
    },
  },
  domestic: {
    generalActions: "",
  },
  vulnerable: {
    generalActions: "",
  },
};
