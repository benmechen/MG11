import { IcDivider, IcTypography, SlottedSVG } from "@ukic/react";
import Person from "../../../db/models/person";
import { IcCardHorizontal } from "@ukic/canary-react";
import { mdiAccount } from "@mdi/js";
import { UseFormSetValue } from "react-hook-form";
import { INewDocumentFields } from "../../../routes/statements/$statementId/route";

export const PeopleSelection = ({
  people,
  setValue,
  setPersonId,
}: {
  people: Person[];
  setValue: UseFormSetValue<INewDocumentFields>;
  setPersonId: (id: number) => void;
}) => {
  if (people.length === 0) return <></>;

  return (
    <>
      <IcTypography variant="subtitle-large">
        {people.length} {people.length > 1 ? "people" : "person"} found
      </IcTypography>
      {people.map((person) => (
        <IcCardHorizontal
          key={person.id}
          clickable
          heading={`${person.firstName} ${person.lastName}`}
          onClick={() => {
            setPersonId(person.id);
            setValue("witness", {
              firstName: person.firstName ?? "",
              lastName: person.lastName ?? "",
              dateOfBirth: person.dateOfBirth
                ? new Date(person.dateOfBirth)
                : undefined,
              address: person.address,
              emailAddress: person.emailAddress!,
              phoneNumber: person.phoneNumber!,
            });
          }}
        >
          <SlottedSVG
            path={mdiAccount}
            slot="icon"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          />
        </IcCardHorizontal>
      ))}
      <IcDivider label="Or create a new person" />
    </>
  );
};
