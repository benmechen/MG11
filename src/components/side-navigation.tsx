import {
  mdiFolder,
  mdiFileDocumentPlus,
  mdiCalendarPlus,
  mdiAccountPlus,
  mdiHome,
  mdiAccount,
  mdiCalendar,
  mdiPoliceBadge,
} from "@mdi/js";
import {
  IcSideNavigation,
  IcNavigationItem,
  SlottedSVG,
  IcDivider,
} from "@ukic/react";

export const SideNavigation = () => (
  <IcSideNavigation appTitle="IP" version="v0.0.1" status="Alpha">
    <SlottedSVG slot="app-icon" viewBox="0 0 24 24" path={mdiPoliceBadge} />
    <IcNavigationItem slot="primary-navigation" href="/" label="Home">
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiHome} />
    </IcNavigationItem>
    <IcDivider slot="primary-navigation" />
    <IcNavigationItem
      slot="primary-navigation"
      href="/incidents/new"
      label="New Incident"
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiCalendarPlus} />
    </IcNavigationItem>
    <IcNavigationItem
      slot="primary-navigation"
      href="/incidents"
      label="Incidents"
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiCalendar} />
    </IcNavigationItem>
    <IcDivider slot="primary-navigation" />
    <IcNavigationItem
      slot="primary-navigation"
      href="/people/new"
      label="New Person"
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiAccountPlus} />
    </IcNavigationItem>
    <IcNavigationItem slot="primary-navigation" href="/people" label="People">
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiAccount} />
    </IcNavigationItem>
    <IcDivider slot="primary-navigation" />
    <IcNavigationItem
      slot="primary-navigation"
      href="/statements/new"
      label="New Statment"
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiFileDocumentPlus} />
    </IcNavigationItem>
    <IcNavigationItem
      slot="primary-navigation"
      href="/statements"
      label="Statements"
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiFolder} />
    </IcNavigationItem>
    <IcNavigationItem
      slot="primary-navigation"
      href="/templates"
      label="Templates"
    >
      <SlottedSVG slot="icon" viewBox="0 0 24 24" path={mdiFolder} />
    </IcNavigationItem>
  </IcSideNavigation>
);
