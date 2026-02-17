import { IcDialog } from "@ukic/react";
import { NewPersonForm } from "../../people/new/form";
import { useForm } from "react-hook-form";
import { PersonService } from "../../../services/person/person";
import { db } from "../../../db";

interface INewPersonModal {
  open: boolean;
  incidentId?: number;
  onClose: () => void;
}

export interface INewPersonForm {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  emailAddress?: string;
  address?: {
    line1: string;
    line2?: string;
    city?: string;
    postcode: string;
  };
}

const personService = new PersonService(db);

export const NewPersonModal = ({
  open,
  incidentId,
  onClose,
}: INewPersonModal) => {
  const { register, handleSubmit } = useForm<INewPersonForm>();

  const onSubmit = async (data: INewPersonForm) => {
    await personService.create({
      ...data,
      incidentId,
    });
    onClose();
  };

  return (
    <IcDialog
      heading="New Person"
      label="Add a new person to this incident"
      open={open}
      size="medium"
      onIcDialogClosed={(open && onClose) || undefined}
      // @ts-expect-error Types
      onIcDialogConfirmed={handleSubmit(onSubmit)}
      onIcDialogCancelled={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <NewPersonForm
          index={0}
          header={false}
          onClose={onClose}
          register={register}
        />
      </form>
    </IcDialog>
  );
};
