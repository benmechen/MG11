import { mdiContentCopy, mdiCreation, mdiDelete, mdiDownload } from "@mdi/js";
import {
  IcPopoverMenu,
  IcMenuGroup,
  IcMenuItem,
  SlottedSVG,
  IcToast,
  IcToastRegion,
} from "@ukic/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { UseFormGetValues, UseFormWatch } from "react-hook-form";
import { INewDocumentFields } from "../../../routes/statements/$statementId/route";
import { generateStatementQualityPrompt } from "../../../utils/prompts/statementQualityPrompt";
import { generateDetsPrompt } from "../../../utils/prompts/generateDetsPrompt";
import { usePDF } from "@react-pdf/renderer";
import { generateDocument } from "../../../routes/statements/$statementId/review";
import { useAppContext } from "../../app-context";
import Statement from "../../../db/models/statement";

interface IOptionsDropdownProps {
  open: boolean;
  statementId?: string;
  onClose: () => void;
  onDelete: () => void;
  watch: UseFormWatch<INewDocumentFields>;
  getValues: UseFormGetValues<INewDocumentFields>;
}

export const OptionsDropdown = ({
  statementId,
  open,
  onClose,
  onDelete,
  watch,
  getValues,
}: IOptionsDropdownProps) => {
  const { statementService } = useAppContext();
  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const aiToastEl = useRef<HTMLIcToastElement | null>(null);
  const copyToastEl = useRef<HTMLIcToastElement | null>(null);

  const [statementData, setStatement] = useState<Partial<Statement> | null>(
    null,
  );

  useEffect(() => {
    const getStatement = async () => {
      if (!statementId) return;
      const statement = await statementService.getById(statementId);
      setStatement(statement);
    };

    getStatement();
  }, [statementId, statementService]);

  const copyStatement = async () => {
    if (!getValues) return;
    const statement = getValues("statement");

    try {
      await navigator.clipboard.writeText(statement);
      showToast("success");
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const copyAiPrompt = async (
    promptGenerator: (statement: string) => string,
  ) => {
    if (!getValues) return;
    const statement = getValues("statement");

    try {
      await navigator.clipboard.writeText(promptGenerator(statement));
      showToast("ai");
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const showToast = (variant: "ai" | "success") => {
    if (toastRegionEl.current) {
      if (variant === "ai" && aiToastEl.current) {
        toastRegionEl.current.openToast = aiToastEl.current;
      } else if (variant === "success" && copyToastEl.current) {
        toastRegionEl.current.openToast = copyToastEl.current;
      }
    }
  };

  const witness = watch?.("witness");
  const statement = watch?.("statement");

  const document = useMemo(
    () =>
      witness && statement
        ? generateDocument({ witness, statement }, statementData?.signature)
        : null,
    [witness, statement, statementData?.signature],
  );

  const [instance] = usePDF({ document: document! });

  return (
    <>
      <IcPopoverMenu
        slot="actions"
        anchor="options-button"
        aria-label="popover"
        open={open}
        onIcPopoverClosed={onClose}
      >
        <IcMenuGroup label="AI Prompts">
          <IcMenuItem
            label="Quality Check"
            onClick={() => copyAiPrompt(generateStatementQualityPrompt)}
          >
            <SlottedSVG slot="icon" path={mdiCreation} />
          </IcMenuItem>
          <IcMenuItem
            label="Generate Dets"
            onClick={() => copyAiPrompt(generateDetsPrompt)}
          >
            <SlottedSVG slot="icon" path={mdiCreation} />
          </IcMenuItem>
        </IcMenuGroup>
        <IcMenuGroup label="Statement Options">
          <IcMenuItem label="Copy" onClick={copyStatement}>
            <SlottedSVG slot="icon" path={mdiContentCopy} />
          </IcMenuItem>
          <IcMenuItem label="Download" href={instance.url ?? ""}>
            <SlottedSVG slot="icon" path={mdiDownload} />
          </IcMenuItem>
          <IcMenuItem label="Delete" variant="destructive" onClick={onDelete}>
            <SlottedSVG slot="icon" path={mdiDelete} />
          </IcMenuItem>
        </IcMenuGroup>
      </IcPopoverMenu>
      <IcToastRegion ref={toastRegionEl}>
        <IcToast
          variant="ai"
          heading="Copied"
          message="Copilot prompt copied to clipboard"
          dismissMode="automatic"
          ref={aiToastEl}
        />
        <IcToast
          variant="success"
          heading="Copied"
          message="Statement copied to clipboard"
          dismissMode="automatic"
          ref={copyToastEl}
        />
      </IcToastRegion>
    </>
  );
};
