import { createFileRoute } from "@tanstack/react-router";
import { IncidentService } from "../../../services/incident/incident";
import { db } from "../../../db";
import {
  IcDataEntity,
  IcBreadcrumb,
  IcBreadcrumbGroup,
  IcButton,
  IcDataRow,
  IcPageHeader,
  IcTypography,
  SlottedSVG,
  IcSectionContainer,
} from "@ukic/react";
import { FormSectionContainer } from "../../../components/statements/new/form-section-container";
import {
  mdiAccount,
  mdiExportVariant,
  mdiFileDocument,
  mdiPlus,
} from "@mdi/js";
import { PersonService } from "../../../services/person/person";

const incidentService = new IncidentService(db);
const personService = new PersonService(db);

export const Route = createFileRoute("/incidents/$date/$incidentId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const incident = await incidentService.findById(
      Number(params.incidentId),
      params.date
    );

    if (!incident) return;

    const people = await personService.findByIncident(incident.id);
    return { ...incident, people };
  },
});

function RouteComponent() {
  const incident = Route.useLoaderData();
  return (
    <div className="h-full bg-ic-architectural-40">
      <IcPageHeader
        heading={`CAD ${incident?.cadNumber}/${incident?.date.replaceAll("-", "")}`}
        subheading={incident?.location ?? "Unknown location"}
        aligned="full-width"
      >
        <IcBreadcrumbGroup slot="breadcrumbs">
          <IcBreadcrumb pageTitle="Home" href="/" />
          <IcBreadcrumb pageTitle="Incidents" href="/incidents" />
          <IcBreadcrumb
            current
            pageTitle={`CAD ${incident?.cadNumber}/${incident?.date.replaceAll("-", "")}`}
            href={`/incidents/${incident?.date}/${incident?.cadNumber}`}
          />
        </IcBreadcrumbGroup>
        <IcButton slot="actions" variant="secondary">
          Export
          <SlottedSVG
            slot="right-icon"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            path={mdiExportVariant}
          />
        </IcButton>
        <IcButton slot="actions" variant="destructive">
          Delete
        </IcButton>
      </IcPageHeader>
      <IcSectionContainer aligned="center" className="w-full">
        <IcTypography variant="h4" className="flex items-center gap-2">
          <SlottedSVG
            height="24"
            viewBox="0 0 24 24"
            width="24"
            path={mdiAccount}
          />
          People
        </IcTypography>

        {incident?.people?.map((person, index) => (
          <div className="bg-ic-architectural-white rounded-lg p-4">
            <IcDataEntity heading={`Person #${index + 1}`} size="small">
              <IcDataRow
                label="Name"
                value={`${person.firstName} ${person.lastName}`}
              />
              <IcDataRow label="Date of birth" value={person.dateOfBirth} />
              <IcDataRow label="Telephone" value={person.phoneNumber} />
              <IcDataRow label="Email" value={person.emailAddress} />
              <IcDataRow label="Address">
                {person.address && (
                  <IcTypography variant="body" slot="value">
                    {person.address?.line1}
                    <br />
                    {person.address?.line2}
                    <br />
                    {person.address?.city}
                    <br />
                    {person.address?.postcode}
                  </IcTypography>
                )}
              </IcDataRow>
            </IcDataEntity>
          </div>
        ))}

        <IcButton variant="tertiary" className="mt-4">
          New Person
          <SlottedSVG path={mdiPlus} slot="icon" />
        </IcButton>
      </IcSectionContainer>
      <FormSectionContainer>
        <IcTypography variant="h4" className="flex items-center gap-2">
          <SlottedSVG
            height="24"
            viewBox="0 0 24 24"
            width="24"
            path={mdiFileDocument}
          />
          Statements
        </IcTypography>
        <IcButton variant="tertiary" className="mt-4">
          New Statement
          <SlottedSVG path={mdiPlus} slot="icon" />
        </IcButton>
      </FormSectionContainer>
    </div>
  );
}
