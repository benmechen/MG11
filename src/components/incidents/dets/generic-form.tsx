import { IcTextField } from "@ukic/react";
/*import { FieldValues, UseFormRegister } from "react-hook-form";*/

/*interface IGenericFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
}*/

export const GenericForm = () => (
  <div className="flex flex-col gap-4">
      <IcTextField
        label="General Actions"
        helperText="Provide a narrative of what happened, when, where, who was involved and why"
        value="- CAD: 
- Call sign: 
- Attending Officers: 
- Location: 
- Offence: 
- First Aid: 

- Arresting Officer: 
- Time of arrest: 
- Relevant time: 

- Provide a narrative of what happened, when, where, who was involved and why.
- Take care to only record sensitive personal data on relevant person cards.
- Ensure that all officers in attendance are recorded.
- Establish details of all offences alleged.
- What are the points to prove for the offence and are they complete?
"
        spellCheck
        autoCapitalize="on"
        fullWidth
        rows={10} 
        resize 
        /*{...register('generalActions')}*/
      />
  </div>
);
