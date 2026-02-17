import { IcDialog, IcTypography } from "@ukic/react";
import { PersonService } from "../../../services/person/person";
import { db } from "../../../db";

interface IDeletePersonModal {
  open: boolean;
  id: number;
  firstName: string;
  onClose: () => void;
}

const personService = new PersonService(db);

export const DeletePersonModal = ({
  open,
  id,
  firstName,
  onClose,
}: IDeletePersonModal) => {
  const handleDelete = async () => {
    await personService.delete(id);
    onClose();
  };

  return (
    <IcDialog
      heading="Are you sure?"
      label="Delete Person"
      open={open}
      size="small"
      destructive
      onIcDialogClosed={(open && onClose) || undefined}
      onIcDialogConfirmed={handleDelete}
      onIcDialogCancelled={onClose}
    >
      <IcTypography>
        You are about to delete <span className="font-bold">{firstName}</span>.
        Are you sure you want to continue?
      </IcTypography>
    </IcDialog>
  );
};
