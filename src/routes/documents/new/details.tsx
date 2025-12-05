import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/documents/new/header";
import { FormSectionContainer } from "../../../components/documents/new/form-section-container";
import {
  IcButton,
  IcRadioGroup,
  IcRadioOption,
  IcSelect,
  IcTextField,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";
import { IcDateInput } from "@ukic/canary-react";
import { mdiChevronRight } from "@mdi/js";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { INewDocumentFields } from "./route";

export const Route = createFileRoute("/documents/new/details")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/documents/new/details" });
  const { register } = useFormContext<INewDocumentFields>();
  const [showAlternativeContacts, setShowAlternativeContacts] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        step={NewDocumentPageHeaderStep.Details}
        onNext={() =>
          navigate({ to: "/documents/new/statement", search: (prev) => prev })
        }
        onBack={() => navigate({ to: "/documents/new" })}
      />
      <FormSectionContainer>
        <div className="flex flex-col gap-4">
          <IcTypography variant="h4" className="mb-2">
            Witness Details
          </IcTypography>
          <div className="flex gap-4">
            <IcTextField
              label="Forename"
              helperText="All first and middle names"
              fullWidth
              required
              {...register("witness.forenames")}
            />
            <IcTextField
              label="Surname"
              helperText="Last name or family name"
              fullWidth
              required
              {...register("witness.surname")}
            />
          </div>
          <div className="flex gap-4">
            <IcTextField
              label="Home Address"
              placeholder="Line 1, Line 2, City, County"
              fullWidth
              {...register("witness.homeAddress")}
            />
            <IcTextField
              label="Postcode"
              placeholder="SW1 123"
              fullWidth
              className="w-44"
              {...register("witness.postcode")}
            />
          </div>
          <IcDateInput
            label="Date of Birth"
            required
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(register("witness.dateOfBirth") as any)}
          />
          <IcTextField
            label="Occupation"
            helperText="Current or former occupation"
            required
            {...register("witness.occupation")}
          />
          <IcTypography variant="subtitle-large" className="mt-2">
            Contact Details
          </IcTypography>
          <div className="flex gap-4">
            <IcTextField
              label="Email Address"
              placeholder="example@email.com"
              type="email"
              fullWidth
              {...register("witness.email")}
            />
            <IcTextField
              label="Mobile Number"
              type="tel"
              fullWidth
              {...register("witness.mobileNumber")}
            />
          </div>
          <IcButton
            variant="tertiary"
            size="small"
            onClick={() => setShowAlternativeContacts((open) => !open)}
          >
            <SlottedSVG
              slot="left-icon"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              path={mdiChevronRight}
              className={`transition-transform duration-200 ${showAlternativeContacts ? "rotate-90" : "rotate-0"}`}
            />
            Alternative contacts
          </IcButton>

          <div
            className={`flex gap-4 transition-all duration-200 ${showAlternativeContacts ? "max-h-96 overflow-visible" : "max-h-0 overflow-hidden"}`}
          >
            <IcTextField
              label="Home Telephone Number"
              type="tel"
              fullWidth
              {...register("witness.homeTelephoneNumber")}
            />
            <IcTextField
              label="Work Telephone Number"
              type="tel"
              fullWidth
              {...register("witness.workTelephoneNumber")}
            />
          </div>
          <IcSelect
            label="Preferred Contact Method"
            options={[
              {
                label: "Email",
                value: "Email",
                recommended: true,
              },
              {
                label: "Mobile",
                value: "Mobile",
                recommended: true,
              },
              {
                label: "Home Telephone",
                value: "Home Telephone",
              },
              {
                label: "Work Telephone",
                value: "Work Telephone",
              },
            ]}
            {...register("witness.preferredContactMethod")}
          />
        </div>
        <div className="flex flex-col gap-4 mt-10">
          <IcTypography variant="h4" className="mb-2">
            Witness Care
          </IcTypography>
          <IcRadioGroup
            name="attend-court"
            label="Is the witness willing to attend court?"
            helperText="If 'No', include reason(s) on form MG6"
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes" />
            <IcRadioOption value="no" label="No" />
          </IcRadioGroup>

          <IcRadioGroup
            name="special-measures-assessment"
            label="Does the witness require a Special Measures Assessment as a vulnerable or intimidated witness?"
            helperText="Youth under 18, witness with mental disorder, learning or physical disability; or witness in fear of giving evidence or witness is the complainant in a sexual offence case. If 'Yes' submit MG2 with file in anticipated not guilty, contested or indictable only cases."
            orientation="horizontal"
          >
            <IcRadioOption value="yes" label="Yes"></IcRadioOption>
            <IcRadioOption value="no" label="No" />
          </IcRadioGroup>

          <IcRadioGroup
            name="special-measures-assessment"
            label="Does the witness have any particular needs?"
            helperText="Disability, healthcare, childcare, transport, disability, language difficulties, visually impaired, restricted mobility or other concerns"
          >
            <IcRadioOption
              value="yes"
              label="Yes"
              additionalFieldDisplay="dynamic"
            >
              <IcTextField
                slot="additional-field"
                label="What are they?"
                placeholder="Disability, healthcare, childcare, transport, disability, language difficulties, visually impaired, restricted mobility or other concerns"
              />
            </IcRadioOption>
            <IcRadioOption value="no" label="No" />
          </IcRadioGroup>
          <IcTextField label="What can be done to ensure attendance?" />
        </div>
      </FormSectionContainer>
    </div>
  );
}
