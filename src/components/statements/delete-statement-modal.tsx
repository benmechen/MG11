import { IcDialog, IcTypography } from "@ukic/react";
import { useAppContext } from "../app-context";

interface IDeleteStatementModal {
  open: boolean;
  id: number;
  name: string;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteStatementModal = ({
  open,
  id,
  name,
  onClose,
  onDelete,
}: IDeleteStatementModal) => {
  const { statementService } = useAppContext();

  const handleDelete = async () => {
    if (id !== null && !Number.isNaN(Number(id)))
      await statementService.delete(id);

    onDelete();
  };

  return (
    <IcDialog
      heading="Are you sure?"
      label="Delete Statement"
      open={open}
      size="small"
      destructive
      onIcDialogClosed={(open && onClose) || undefined}
      onIcDialogConfirmed={handleDelete}
      onIcDialogCancelled={onClose}
    >
      <IcTypography>
        You are about to delete <span className="font-bold">{name}</span>. Are
        you sure you want to continue?
      </IcTypography>
    </IcDialog>
  );
};
