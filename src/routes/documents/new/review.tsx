import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/documents/new/header";
import { FormSectionContainer } from "../../../components/documents/new/form-section-container";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { RenderedDocument } from "../../../components/documents/rendered-document";
import { useFormContext } from "react-hook-form";
import { INewDocumentFields } from "./route";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  IcButton,
  IcDialog,
  IcToast,
  IcToastRegion,
  SlottedSVG,
} from "@ukic/react";
import { mdiDownload, mdiFloppy } from "@mdi/js";

export const Route = createFileRoute("/documents/new/review")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/documents/new/review" });
  const { watch } = useFormContext<INewDocumentFields>();

  const forenames = watch("witness.forenames");
  const surname = watch("witness.surname");
  const dateOfBirth = watch("witness.dateOfBirth");
  const occupation = watch("witness.occupation");
  const statement = watch("statement");

  const sigCanvas = useRef<typeof SignatureCanvas>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [showingSignaturePad, setShowSignaturePad] = useState<boolean>(false);
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const toastRegionEl = useRef<HTMLIcToastRegionElement | null>(null);
  const toastEl = useRef<HTMLIcToastElement | null>(null);

  const clear = () => sigCanvas.current?.clear();

  const trim = () =>
    setTrimmedDataURL(
      sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png")
    );

  const handleDialogClose = () => {
    trim();
    setShowSignaturePad(false);
    showToast();
  };

  const showToast = () => {
    if (toastRegionEl.current && toastEl.current) {
      toastRegionEl.current.openToast = toastEl.current;
    }
  };

  useEffect(() => {
    function updateCanvasWidth() {
      const dialogWidth =
        dialogRef.current?.getBoundingClientRect().width || 400;
      setCanvasWidth(dialogWidth - 35); // Subtracting some padding
    }

    updateCanvasWidth();
    window.addEventListener("resize", updateCanvasWidth);
    return () => window.removeEventListener("resize", updateCanvasWidth);
  }, []);

  const document = (
    <RenderedDocument
      witness={{
        forenames,
        surname,
        dateOfBirth: new Date(dateOfBirth),
        occupation,
      }}
      metadata={{
        createdAt: new Date(),
        signatureUrl: trimmedDataURL,
      }}
      statement={statement}
    />
  );

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        step={NewDocumentPageHeaderStep.Complete}
        onNext={() => setShowSignaturePad(true)}
        onBack={() =>
          navigate({ to: "/documents/new/statement", search: (prev) => prev })
        }
      />
      <FormSectionContainer>
        <IcDialog
          ref={dialogRef}
          heading="Complete your statement"
          label="Witness Signature"
          closeOnBackdropClick={false}
          open={showingSignaturePad}
          onIcDialogClosed={handleDialogClose}
          onIcDialogConfirmed={handleDialogClose}
          onIcDialogCancelled={handleDialogClose}
        >
          <div className="w-full h-36 m-auto">
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                style: {
                  backgroundColor: "#F4F4F5",
                },
                width: canvasWidth,
                height: 150,
              }}
            />
          </div>
          <IcButton slot="dialog-controls" variant="secondary" onClick={clear}>
            Clear
          </IcButton>
          <IcButton slot="dialog-controls" onClick={handleDialogClose}>
            Confirm
          </IcButton>
        </IcDialog>
        <PDFViewer className="min-h-screen h-full w-full">{document}</PDFViewer>
      </FormSectionContainer>
      <IcToastRegion ref={toastRegionEl}>
        <IcToast
          heading="Your statement is complete"
          message="Download the signed statement below"
          variant="success"
          ref={toastEl}
        >
          <PDFDownloadLink
            slot="action"
            fileName={`MG11 ${forenames} ${surname} - ${new Date().toDateString()}`}
            document={document}
          >
            <IcButton>
              Download
              <SlottedSVG path={mdiDownload} slot="right-icon" />
            </IcButton>
          </PDFDownloadLink>
        </IcToast>
      </IcToastRegion>
    </div>
  );
}
