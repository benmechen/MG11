import { IcTypography, IcTextField } from "@ukic/react";
/*import { FieldValues, UseFormRegister } from "react-hook-form";*/

/*interface IGenericFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
}*/

export const GenericForm = () => (
  <div className="flex flex-col gap-4">
      <IcTextField
        label="General Actions"
        helperText="Provide a narrative of what happened, when, where, who was involved and why"
        autoCapitalize="on"
        fullWidth
        rows={10} 
        resize 
        // @ts-expect-error Generic register issue
        /*{...register('generalActions')}*/
      />
    </div>

    <IcTypography variant="subtitle-large" className="mt-2">
      Address Details
    </IcTypography>
  </div>
);
