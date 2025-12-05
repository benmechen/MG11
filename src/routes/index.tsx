import { mdiFileDocumentMultiple, mdiFolder, mdiPlus } from "@mdi/js";
import { createFileRoute } from "@tanstack/react-router";
import {
  IcButton,
  IcCard,
  IcHero,
  IcSectionContainer,
  SlottedSVG,
} from "@ukic/react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <IcHero
        heading="Quickly and easily generate MG11s"
        subheading="Create statements, manage your documents, and create templates for common statement types"
      >
        <IcButton variant="primary" slot="interaction">
          Create new statement
        </IcButton>
        <IcButton variant="secondary" slot="interaction">
          Explore templates
        </IcButton>
      </IcHero>
      <IcSectionContainer
        aligned="full-width"
        fullHeight
        className="flex p-8 gap-8 w-full justify-center"
      >
        <IcCard
          heading="New Document"
          message="Create a new statement using a template"
          href="/documents/new"
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
        </IcCard>
        <IcCard
          heading="Documents"
          message="View your existing documents"
          href="/documents"
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
        </IcCard>
        <IcCard
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
        </IcCard>
      </IcSectionContainer>
      {/* <div >
      </div> */}
    </div>
  );
}
