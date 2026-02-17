import { mdiClose } from "@mdi/js";
import { IcDateInput } from "@ukic/canary-react";
import { IcTypography, IcTextField, IcButton, SlottedSVG } from "@ukic/react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface INewPersonFormProps<T extends FieldValues> {
  index: number;
  register: UseFormRegister<T>;
  fieldPrefix?: string;
  header?: boolean;
  onClose?: () => void;
}
export const NewPersonForm = <T extends FieldValues>({
  index,
  fieldPrefix: path,
  header = true,
  register,
  onClose,
}: INewPersonFormProps<T>) => (
  <div className="flex flex-col gap-4">
    {header && (
      <div className="mb-2 flex justify-between items-center">
        <IcTypography variant="h4">Person #{index + 1}</IcTypography>
        <IcButton variant="icon" onClick={onClose}>
          <SlottedSVG viewBox="0 0 24 24" path={mdiClose} />
        </IcButton>
      </div>
    )}
    <div className="flex flex-col md:flex-row gap-4">
      <IcTextField
        label="Forename"
        helperText="All first and middle names"
        placeholder="John"
        fullWidth
        required
        autoCapitalize="on"
        // @ts-expect-error Generic register issue
        {...register(`${path ?? ""}firstName`)}
      />
      <IcTextField
        label="Surname"
        helperText="Last name or family name"
        placeholder="Doe"
        fullWidth
        required
        autoCapitalize="on"
        // @ts-expect-error Generic register issue
        {...register(`${path ?? ""}lastName`)}
      />
    </div>
    <IcDateInput
      label="Date of Birth"
      required
      // @ts-expect-error Generic register issue
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(register(`${path ?? ""}dateOfBirth`) as any)}
    />
    <IcTypography variant="subtitle-large" className="mt-2">
      Address Details
    </IcTypography>
    <div className="flex flex-col md:flex-row gap-4">
      <IcTextField
        label="Line 1"
        placeholder="House number, Street"
        fullWidth
        // @ts-expect-error Generic register issue
        {...register(`${path ?? ""}address.line1`)}
      />
      <IcTextField
        label="Line 2"
        placeholder="Apt, Suite, Unit, Building"
        fullWidth
        // @ts-expect-error Generic register issue
        {...register(`${path ?? ""}address.line2`)}
      />
    </div>
    <div className="flex flex-col md:flex-row gap-4">
      <IcTextField
        label="City"
        placeholder="London"
        fullWidth
        // @ts-expect-error Generic register issue
        {...register(`${path ?? ""}address.city`)}
      />
      <IcTextField
        label="Postcode"
        placeholder="SW1 123"
        fullWidth
        autoCapitalize="characters"
        // className="w-2/5"
        // @ts-expect-error Generic register issue
        {...register(`${path ?? ""}address.postcode`)}
      />
    </div>
    <IcTypography variant="subtitle-large" className="mt-2">
      Contact Details
    </IcTypography>
    <div className="flex flex-col md:flex-row gap-4">
      <IcTextField
        label="Email Address"
        placeholder="example@email.com"
        type="email"
        fullWidth
        // @ts-expect-error Generic register issue
        {...register(`${path ?? ""}emailAddress`)}
      />
      <IcTextField
        label="Mobile Number"
        type="tel"
        placeholder="+44 7123 456789"
        fullWidth
        // @ts-expect-error Generic register issue
        {...register(`${path ?? ""}phoneNumber`)}
      />
    </div>
  </div>
);
