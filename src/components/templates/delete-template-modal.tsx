import { IcDialog, IcTypography } from "@ukic/react";
import { useAppContext } from "../app-context";

interface IDeleteTemplateModal {
  open: boolean;
  id: number;
  name: string;
  onClose: () => void;
}

export const DeleteTemplateModal = ({
  open,
  id,
  name,
  onClose,
}: IDeleteTemplateModal) => {
  const { templateService } = useAppContext();

  const handleDelete = async () => {
    await templateService.delete(id);
    onClose();
  };

  return (
    <IcDialog
      heading="Are you sure?"
      label="Delete Template"
      open={open}
      size="small"
      destructive
      onIcDialogClosed={(open && onClose) || undefined}
      onIcDialogConfirmed={handleDelete}
      onIcDialogCancelled={onClose}
    >
      <IcTypography>
        You are about to delete template{" "}
        <span className="font-bold">{name}</span>. Are you sure you want to
        continue?
      </IcTypography>
    </IcDialog>
  );
};
