import { mdiFolder, mdiPlus, mdiGavel, mdiFileDocumentMultiple } from "@mdi/js";
import { IcSideNavigation, IcNavigationItem, SlottedSVG } from "@ukic/react";

export const SideNavigation = () => (
  <IcSideNavigation appTitle="MG11s" version="v0.0.1" status="Alpha">
    <SlottedSVG slot="app-icon" viewBox="0 0 24 24" path={mdiGavel} />
    <IcNavigationItem
      slot="primary-navigation"
      href="/documents/new"
      label="New Document"
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiPlus} />
    </IcNavigationItem>
    <IcNavigationItem
      slot="primary-navigation"
      href="/documents"
      label="Documents"
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiFolder} />
    </IcNavigationItem>
    <IcNavigationItem
      slot="primary-navigation"
      href="/templates"
      label="Templates"
    >
      <SlottedSVG
        slot="icon"
        viewBox="0 0 24 24"
        path={mdiFileDocumentMultiple}
      />
    </IcNavigationItem>
  </IcSideNavigation>
);
