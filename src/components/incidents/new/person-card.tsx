import {
  IcButton,
  IcDataList,
  IcDataRow,
  IcTextField,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";
import Person from "../../../db/models/person";
import { mdiCheck, mdiClose, mdiDelete, mdiPencil } from "@mdi/js";
import { useState } from "react";
import { DeletePersonModal } from "./delete-person-modal";
import { useForm } from "react-hook-form";
import { INewPersonForm } from "./new-person-modal";
import { useAppContext } from "../../app-context";
import { IcDateInput } from "@ukic/canary-react";
import { CopyButton } from "../../copy-button";

interface IEditPersonForm extends INewPersonForm {}

interface IPersonCardProps {
  index: number;
  person: Person;
}
export const PersonCard = ({ index, person }: IPersonCardProps) => {
  const { personService } = useAppContext();
  const [editing, setEditing] = useState(false);
  const [showDeletePerson, setShowDeletePerson] = useState(false);
  const { register, handleSubmit, reset } = useForm<IEditPersonForm>({
    defaultValues: {
      firstName: person.firstName,
      lastName: person.lastName,
      dateOfBirth: person.dateOfBirth
        ? personService.stringToDate(person.dateOfBirth)
        : undefined,
      phoneNumber: person.phoneNumber,
      emailAddress: person.emailAddress,
      address: person.address,
    },
  });

  const onSubmit = async (data: IEditPersonForm) => {
    await personService.update(person.id!, {
      ...data,
    });
    setEditing(false);
  };

  return (
    <>
      <DeletePersonModal
        open={showDeletePerson}
        id={person.id}
        firstName={person.firstName ?? "Unknown"}
        onClose={() => setShowDeletePerson(false)}
      />
      <div className="bg-ic-architectural-white dark:bg-ic-architectural-black rounded-lg p-4 relative">
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          {editing ? (
            <>
              <IcButton
                variant="icon-tertiary"
                aria-label="Cancel"
                onClick={() => {
                  reset();
                  setEditing(false);
                }}
              >
                <SlottedSVG viewBox="0 0 24 24" path={mdiClose} />
              </IcButton>
              <IcButton
                variant="icon-primary"
                aria-label="Save"
                onClick={handleSubmit(onSubmit)}
              >
                <SlottedSVG viewBox="0 0 24 24" path={mdiCheck} />
              </IcButton>
            </>
          ) : (
            <>
              <IcButton
                variant="icon-tertiary"
                aria-label="Edit"
                onClick={() => setEditing(true)}
              >
                <SlottedSVG viewBox="0 0 24 24" path={mdiPencil} />
              </IcButton>
              <IcButton
                variant="icon-destructive"
                aria-label="Delete"
                onClick={() => setShowDeletePerson(true)}
              >
                <SlottedSVG viewBox="0 0 24 24" path={mdiDelete} />
              </IcButton>
            </>
          )}
        </div>
        <IcDataList heading={`Person #${index + 1}`} size="small">
          <form onSubmit={handleSubmit(onSubmit)}>
            <IcDataRow label="First Name">
              <IcTextField
                slot="value"
                label="First Name"
                readonly={!editing}
                hideLabel
                fullWidth
                {...register("firstName")}
              />
              <CopyButton
                value={person.firstName}
                show={!editing}
                slot="end-component"
              />
            </IcDataRow>
            <IcDataRow label="Last Name">
              <IcTextField
                slot="value"
                label="Last Name"
                readonly={!editing}
                hideLabel
                fullWidth
                {...register("lastName")}
              />
              <CopyButton
                value={person.lastName}
                show={!editing}
                slot="end-component"
              />
            </IcDataRow>
            <IcDataRow label="Date of birth">
              {!editing ? (
                <>
                  <IcTypography slot="value">{person.dateOfBirth}</IcTypography>
                  <CopyButton
                    value={person.dateOfBirth}
                    show={!editing}
                    slot="end-component"
                  />
                </>
              ) : (
                // @ts-expect-error Generic register issue
                <IcDateInput
                  slot="value"
                  label="Date of birth"
                  hideLabel
                  {...register("dateOfBirth")}
                />
              )}
            </IcDataRow>
            <IcDataRow label="Telephone">
              <IcTextField
                slot="value"
                label="Telephone"
                readonly={!editing}
                hideLabel
                fullWidth
                {...register("phoneNumber")}
              />
              <CopyButton
                value={person.phoneNumber}
                show={!editing}
                slot="end-component"
              />
            </IcDataRow>
            <IcDataRow label="Email">
              <IcTextField
                slot="value"
                label="Email"
                readonly={!editing}
                hideLabel
                fullWidth
                {...register("emailAddress")}
              />
              <CopyButton
                value={person.emailAddress}
                show={!editing}
                slot="end-component"
              />
            </IcDataRow>
            <IcDataRow label="Address">
              <CopyButton
                value={
                  person.address
                    ? Object.values(person.address)
                        .filter((value) => value)
                        .join(", ")
                    : ""
                }
                show={!editing}
                slot="end-component"
              />
              {person.address && (
                <div slot="value" className="flex flex-col gap-1">
                  <IcTextField
                    label="Line 1"
                    placeholder="Line 1"
                    readonly={!editing}
                    hideLabel
                    fullWidth
                    size="small"
                    className={
                      !editing && !person.address?.line1 ? "hidden" : ""
                    }
                    {...register("address.line1")}
                  />
                  <IcTextField
                    label="Line 2"
                    placeholder="Line 2"
                    readonly={!editing}
                    hideLabel
                    fullWidth
                    size="small"
                    className={
                      !editing && !person.address?.line2 ? "hidden" : ""
                    }
                    {...register("address.line2")}
                  />
                  <IcTextField
                    label="City"
                    placeholder="City"
                    readonly={!editing}
                    hideLabel
                    fullWidth
                    size="small"
                    className={
                      !editing && !person.address?.city ? "hidden" : ""
                    }
                    {...register("address.city")}
                  />
                  <IcTextField
                    label="Postcode"
                    placeholder="Postcode"
                    readonly={!editing}
                    hideLabel
                    fullWidth
                    size="small"
                    className={
                      !editing && !person.address?.postcode ? "hidden" : ""
                    }
                    {...register("address.postcode")}
                  />
                </div>
              )}
            </IcDataRow>
          </form>
        </IcDataList>
      </div>
    </>
  );
};
