import {
  IcButton,
  IcDataList,
  IcDataRow,
  IcStatusTag,
  SlottedSVG,
} from "@ukic/react";
import { mdiDelete, mdiOpenInNew } from "@mdi/js";
import { useEffect, useState } from "react";
import { DeleteStatementModal } from "../../statements/delete-statement-modal";
import { useNavigate } from "@tanstack/react-router";
import { useAppContext } from "../../app-context";
import Person from "../../../db/models/person";

interface IStatementCardProps {
  id: number;
  personId?: number;
  created: Date;
  lastUpdate: Date;
  status: "draft" | "completed";
}
export const StatementCard = ({
  id,
  personId,
  created,
  lastUpdate,
  status,
}: IStatementCardProps) => {
  const { personService } = useAppContext();
  const navigate = useNavigate({ from: "/incidents/$date/$incidentId/overview" });
  const [person, setPerson] = useState<Person>();
  const [showDeleteStatement, setShowDeleteStatement] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      if (!personId) return;
      const person = await personService.getById(personId);
      setPerson(person);
    };

    fetchPerson();
  }, [personId]);

  return (
    <>
      <DeleteStatementModal
        id={id}
        name={`Statement ${id}`}
        open={showDeleteStatement}
        onClose={() => setShowDeleteStatement(false)}
        onDelete={() =>
          navigate({
            to: "/statements",
            search: (prev) => ({ ...prev, statement: undefined }),
          })
        }
      />
      <div className="bg-ic-architectural-white dark:bg-ic-architectural-black rounded-lg p-4 relative">
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <IcButton
            variant="icon-tertiary"
            aria-label="View"
            onClick={() =>
              navigate({
                to: "/statements/$statementId/review",
                params: { statementId: id.toString() },
              })
            }
          >
            <SlottedSVG viewBox="0 0 24 24" path={mdiOpenInNew} />
          </IcButton>
          <IcButton
            variant="icon-destructive"
            aria-label="Delete"
            onClick={() => setShowDeleteStatement(true)}
          >
            <SlottedSVG viewBox="0 0 24 24" path={mdiDelete} />
          </IcButton>
        </div>
        <IcDataList heading={`Statement ${id}`}>
          <IcDataRow
            label="Statement Of"
            value={
              person ? `${person?.firstName} ${person?.lastName}` : "Unknown"
            }
          />
          <IcDataRow label="Created" value={created.toLocaleDateString()} />
          <IcDataRow
            label="Last Updated"
            value={lastUpdate.toLocaleDateString()}
          />
          <IcDataRow label="Status">
            <IcStatusTag
              status={status === "draft" ? "neutral" : "success"}
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              variant="filled"
              slot="value"
            />
          </IcDataRow>
        </IcDataList>
      </div>
    </>
  );
};
