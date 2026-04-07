import { FieldValues } from "react-hook-form";
import { RhfAutosaveOptions, useRhfAutosave } from "react-hook-form-autosave";

export const useRhfAutosaveConfig = <T extends FieldValues>(
  onUpdate: (data: { [key: string]: string }) => Promise<void>,
  { form }: Partial<RhfAutosaveOptions<T>>,
) =>
  useRhfAutosave({
    form: form!,
    config: {
      debounceMs: 250,
    },
    transport: async (data) => {
      await onUpdate(data as { [key: string]: string });
      return {
        ok: true,
      };
    },
    onSaved: (result) => {
      if (result.ok) {
        form!.reset(form!.getValues(), {
          keepValues: true,
          keepDirty: false,
        });
      } else {
        console.error("❌ Save failed:", result.error?.message);
      }
    },
  });
