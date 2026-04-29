import { IcCardVertical, IcStatusTag } from "@ukic/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../app-context";

interface IDocumentCard {
  name: string;
  personId?: number;
  incidentId?: number;
  template?: string;
  created: Date;
  lastUpdate: Date;
  status: "draft" | "completed";
  onClick: () => void;
}
export const DocumentCard = ({
  name,
  personId,
  incidentId,
  status,
  onClick,
}: IDocumentCard) => {
  const { personService, incidentService } = useAppContext();
  const [personName, setPersonName] = useState<string>();
  const [cad, setCad] = useState<string>();

  useEffect(() => {
    const getName = async () => {
      if (!personId) return;

      const person = await personService.getById(personId);
      if (!person) return;

      setPersonName(`${person?.firstName} ${person?.lastName}`);
    };

    getName();
  }, [personId]);

  useEffect(() => {
    const getCad = async () => {
      if (!incidentId) return;

      const incident = await incidentService.findById(incidentId);
      if (!incident) return;

      setCad(incidentService.toString(incident));
    };

    getCad();
  }, [incidentId]);

  return (
    <IcCardVertical
      heading={name}
      subheading={personName}
      message={cad ? `CAD ${cad}` : ""}
      clickable
      onClick={onClick}
    >
      {status === "completed" ? (
        <IcStatusTag slot="adornment" label="Completed" status="success" />
      ) : (
        <IcStatusTag slot="adornment" label="Draft" status="neutral" />
      )}
    </IcCardVertical>
  );
};
