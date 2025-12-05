import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/documents/new/header";
import { FormSectionContainer } from "../../../components/documents/new/form-section-container";
import {
  IcRadioGroup,
  IcRadioOption,
  IcTextField,
  IcTypography,
} from "@ukic/react";

export const Route = createFileRoute("/documents/new/consent")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/documents/new/consent" });

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        step={NewDocumentPageHeaderStep.WitnessConsent}
        onNext={() =>
          navigate({ to: "/documents/new/statement", search: (prev) => prev })
        }
        onBack={() =>
          navigate({
            to: "/documents/new/details",
            search: { template: undefined },
          })
        }
      />
      <FormSectionContainer>
        <div className="flex flex-col gap-4">
          <div>
            <IcTypography variant="h4">Witness Consent</IcTypography>
            <IcTypography variant="caption" className="mb-2">
              For witness completion
            </IcTypography>
          </div>
          <IcRadioGroup
            name="vps-explained"
            label="The Victim Personal Statement scheme has been explained to me"
            helperText="Victims only"
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes" />
            <IcRadioOption value="no" label="No" />
          </IcRadioGroup>

          <IcRadioGroup
            name="vps-leaflet"
            label="I have been given the Victim Personal Statement leaflet"
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes" />
            <IcRadioOption value="no" label="No" />
          </IcRadioGroup>

          <IcRadioGroup
            name="witness-statement-leaflet"
            label="I have been given the leaflet “Giving a witness statement to the police…”"
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes" />
            <IcRadioOption value="no" label="No" />
          </IcRadioGroup>

          <IcRadioGroup
            name="medical-record-access-consent"
            label="I consent to police having access to my medical record(s) in relation to this matter"
            helperText="Obtained in accordance with local practice"
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes" />
            <IcRadioOption value="no" label="No" />
            <IcRadioOption value="na" label="N/A" />
          </IcRadioGroup>

          <IcRadioGroup
            name="medical-record-disclosure-consent"
            label="I consent to my medical record in relation to this matter being disclosed to the defence"
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes" />
            <IcRadioOption value="no" label="No" />
            <IcRadioOption value="na" label="N/A" />
          </IcRadioGroup>

          <IcRadioGroup
            name="statement-disclosure-consent"
            label="I consent to the statement being disclosed for the purposes of civil, or other proceedings if applicable, e.g. child care proceedings, CICA"
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes" />
            <IcRadioOption value="no" label="No" />
            <IcRadioOption value="na" label="N/A" />
          </IcRadioGroup>

          <IcRadioGroup
            name="reporting-restrictions-explained"
            label="I have had the provision regarding reporting restrictions explained to me"
            helperText="Child witness cases only"
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes" />
            <IcRadioOption value="no" label="No" />
            <IcRadioOption value="na" label="N/A" />
          </IcRadioGroup>

          <IcRadioGroup
            name="apply-cps-restrictions"
            label="I would like CPS to apply for reporting restrictions on my behalf"
            helperText="Child witness cases only"
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes" />
            <IcRadioOption value="no" label="No" />
            <IcRadioOption value="na" label="N/A" />
          </IcRadioGroup>

          <IcTypography className="mt-4 italic">
            'I understand that the information recorded above will be passed on
            to the Witness Service, which offers help and support to witnesses
            pre-trial and at court'
          </IcTypography>
          <div className="flex gap-4">
            <IcTextField label="Signature" fullWidth />
            <IcTextField label="Print Name" fullWidth />
          </div>
        </div>
      </FormSectionContainer>
    </div>
  );
}
