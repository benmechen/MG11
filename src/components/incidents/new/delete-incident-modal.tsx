import { IcDialog, IcTypography } from "@ukic/react";
import { useAppContext } from "../../app-context";

interface IDeletePersonModal {
  open: boolean;
  id: number;
  formattedCAD: string;
  onClose: () => void;
}

export const DeleteIncidentModal = ({
  open,
  id,
  formattedCAD,
  onClose,
}: IDeletePersonModal) => {
  const { incidentService } = useAppContext();

  const handleDelete = async () => {
    await incidentService.delete(id);
    onClose();
  };

  return (
    <IcDialog
      heading="Are you sure?"
      label="Delete Incident"
      open={open}
      size="small"
      destructive
      onIcDialogClosed={(open && onClose) || undefined}
      onIcDialogConfirmed={handleDelete}
      onIcDialogCancelled={onClose}
    >
      <IcTypography>
        You are about to delete CAD{" "}
        <span className="font-bold">{formattedCAD}</span> and all associated
        data. Are you sure you want to continue?
      </IcTypography>
    </IcDialog>
  );
};
