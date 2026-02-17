import {
  mdiAccount,
  mdiAccountPlus,
  mdiCalendar,
  mdiCalendarPlus,
  mdiFileDocumentMultiple,
  mdiFolder,
  mdiPlus,
} from "@mdi/js";
import { createFileRoute } from "@tanstack/react-router";
import {
  IcButton,
  IcCardVertical,
  IcHero,
  IcSectionContainer,
  IcTypography,
  SlottedSVG,
} from "@ukic/react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  return (
    <div>
      <IcHero
        heading="Investigation Platform"
        subheading="Create statements, manage your documents, and create templates for common statement types"
      >
        <IcButton
          variant="primary"
          slot="interaction"
          onClick={() =>
            navigate({
              to: "/incidents/new",
            })
          }
        >
          Create new incident
        </IcButton>
        <IcButton
          variant="secondary"
          slot="interaction"
          onClick={() =>
            navigate({
              to: "/incidents",
            })
          }
        >
          Explore incidents
        </IcButton>
      </IcHero>
      <IcSectionContainer
        aligned="full-width"
        fullHeight
        className="flex flex-col p-8 gap-8 w-full justify-center"
      >
        <IcTypography variant="h4">Incidents</IcTypography>
        <div className="flex flex-row w-full gap-8">
          <IcCardVertical
            heading="New Incident"
            message="Create a new incident folder"
            href="/incidents/new"
            clickable
            className="w-60"
          >
            <SlottedSVG
              slot="icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#000000"
              path={mdiCalendarPlus}
            />
          </IcCardVertical>
          <IcCardVertical
            heading="Incidents"
            message="View your existing incidents"
            href="/incidents"
            clickable
            className="w-60"
          >
            <SlottedSVG
              slot="icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#000000"
              path={mdiCalendar}
            />
          </IcCardVertical>
        </div>
        <IcTypography variant="h4">People</IcTypography>
        <div className="flex flex-row w-full gap-8">
          <IcCardVertical
            heading="New Person"
            message="Create a new person"
            href="/person/new"
            clickable
            className="w-60"
          >
            <SlottedSVG
              slot="icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#000000"
              path={mdiAccountPlus}
            />
          </IcCardVertical>
          <IcCardVertical
            heading="People"
            message="View your existing people records"
            href="/people"
            clickable
            className="w-60"
          >
            <SlottedSVG
              slot="icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#000000"
              path={mdiAccount}
            />
          </IcCardVertical>
        </div>
        <IcTypography variant="h4">Statements</IcTypography>
        <div className="flex flex-row w-full gap-8">
          <IcCardVertical
            heading="New Statement"
            message="Create a new statement using a template"
            href="/statements/new"
            clickable
            className="w-60"
          >
            <SlottedSVG
              slot="icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#000000"
              path={mdiPlus}
            />
          </IcCardVertical>
          <IcCardVertical
            heading="Statements"
            message="View your existing statements"
            href="/statements"
            clickable
            className="w-60"
          >
            <SlottedSVG
              slot="icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#000000"
              path={mdiFolder}
            />
          </IcCardVertical>
          <IcCardVertical
            heading="Templates"
            message="Manage your statement proformas"
            href="/templates"
            clickable
            className="w-60"
          >
            <SlottedSVG
              slot="icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#000000"
              path={mdiFileDocumentMultiple}
            />
          </IcCardVertical>
        </div>
      </IcSectionContainer>
    </div>
  );
}
