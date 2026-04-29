import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  NewDocumentPageHeader,
  NewDocumentPageHeaderStep,
} from "../../../components/statements/new/header";
import { FormSectionContainer } from "../../../components/statements/new/form-section-container";
import { IcSearchBar, IcTextField, IcTypography } from "@ukic/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { INewDocumentFields } from "./route";
import { useAppContext } from "../../../components/app-context";
import Person from "../../../db/models/person";
import { NewPersonForm } from "../../../components/people/new/form";
import { PeopleSelection } from "../../../components/statements/new/people-selection";
import { isValidId } from "../../../utils/isValidId";
import { parseCad } from "../../../utils/parseCad";
import { IncidentDto } from "../../../services/incident/incidentDto";

export const Route = createFileRoute("/statements/$statementId/details")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const incidents = await context.incidentService.getAll();

    return incidents.map((incident) => ({
      label: context.incidentService.toString(incident),
      value: context.incidentService.toString(incident),
    }));
  },
});

function RouteComponent() {
  const { statementService, personService, incidentService } = useAppContext();
  const navigate = useNavigate({ from: "/statements/$statementId/details" });
  const { register, watch, setValue, getValues } =
    useFormContext<INewDocumentFields>();
  const incidents = Route.useLoaderData();
  const { statementId } = Route.useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [personId, setPersonId] = useState<number>();

  const incidentValue = watch("incident");

  useEffect(() => {
    const fetchPeopleFromIncident = async (incidentId: string) => {
      const { cadNumber, date } = parseCad(incidentId);
      const incident = await incidentService.findByCad(cadNumber, date);

      if (!incident) return;

      const people = await personService.findByIncident(incident.id);

      setPeople(people);
    };

    if (incidentValue) fetchPeopleFromIncident(incidentValue);
  }, [incidentValue]);

  const saveStatement = async () => {
    if (!isValidId(statementId)) return;

    const data = getValues();

    let incident: IncidentDto | undefined;
    if (data.incident) {
      const { cadNumber, date } = parseCad(data.incident);
      incident = {
        cadNumber,
        date: incidentService.stringToDate(date),
      };
    }

    await statementService.update(Number(statementId), {
      incident,
      person: {
        ...data.witness,
      },
      statement: data.statement,
      personId,
    });
  };

  return (
    <div className="h-full flex flex-col">
      <NewDocumentPageHeader
        statementId={statementId}
        step={NewDocumentPageHeaderStep.Details}
        onNext={async () => {
          await saveStatement();
          navigate({
            to: "/statements/$statementId/statement",
          });
        }}
        onBack={() =>
          navigate({
            to: "/statements",
          })
        }
      />
      <FormSectionContainer>
        <div className="flex flex-col gap-4">
          <IcTypography variant="h4" className="mb-2">
            Incident Details
          </IcTypography>

          <IcSearchBar
            label="Is there a CAD number for this incident?"
            options={incidents}
            onIcChange={(ev) => setValue("incident", ev.detail.value)}
            onIcSubmitSearch={(ev) => setValue("incident", ev.detail.value)}
            placeholder="000000/DDMMMYY"
            preventFormSubmitOnSearch
            autoCapitalize="characters"
            {...register("incident")}
          />
        </div>
        <div className="flex flex-col gap-4">
          <IcTypography variant="h4" className="mb-2 mt-10">
            Witness Details
          </IcTypography>
          <IcTextField
            label="Occupation"
            helperText="Current or former occupation"
            required
            {...register("witness.occupation")}
          />

          <PeopleSelection
            people={people}
            setPersonId={setPersonId}
            setValue={setValue}
          />

          <NewPersonForm
            index={0}
            header={false}
            register={register}
            fieldPrefix="witness."
          />
        </div>
      </FormSectionContainer>
    </div>
  );
}
