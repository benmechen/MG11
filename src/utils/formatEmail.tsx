import Incident from "../db/models/incident";
import Person from "../db/models/person";

export const camelCaseToWords = (s: string) =>
  s.replace(/([A-Z])/g, " $1").toUpperCase();

export const formatEmail = (incident: Partial<Incident>, people: Person[]) => {
  const formattedCAD = `${incident.cadNumber}/${incident.date?.replaceAll("-", "")}`;
  console.log(incident.dets);
  const body = `CAD Number: ${formattedCAD}
Location: ${incident?.location ?? "Unknown location"}\n\n--------------------------------\n${
    people.length > 0
      ? `\nPEOPLE:${people
          .map(
            (person) => `
Name: ${person.firstName} ${person.lastName?.toUpperCase()}
Date of Birth: ${person.dateOfBirth}
Email: ${person.emailAddress}
Phone: ${person.phoneNumber}
Address: ${person.address?.line1}, ${person.address?.line2 ? person.address.line2 + ", " : ""}${person.address?.city}, ${person.address?.postcode}`,
          )
          .join("\n")}\n\n--------------------------------\n`
      : ""
  }
${Object.entries(incident.dets ?? {})
  .filter(([key]) => key !== "type")
  .map(
    ([key, value]) =>
      `${camelCaseToWords(key)}:\n${value}\n\n--------------------------------\n`,
  )
  .join("\n")}
`;

  return new URL(
    `mailto:?subject=${encodeURIComponent(`CAD ${formattedCAD}`)}&body=${encodeURIComponent(body)}`,
  );
};
