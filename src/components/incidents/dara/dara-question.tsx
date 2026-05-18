import { IcSelect } from "@ukic/react";
import { useRhfAutosaveConfig } from "../dets/useRhfAutosaveConfig";
import { useFormContext } from "react-hook-form";
import { Textbox } from "../dets/textbox";

interface IDaraQuestion {
  name: string;
  label: string;
  options: { label: string; value: string; hideAdditionalComments?: boolean }[];
  additionalComments?: string;
  flush: ReturnType<typeof useRhfAutosaveConfig>["flush"];
}

export const DaraQuestion = ({
  name,
  label,
  options,
  flush,
}: IDaraQuestion) => {
  const { register, setValue, watch } = useFormContext();

  const rating = watch(`${name}.rating`);

  return (
    <div className="flex flex-col gap-4">
      <IcSelect
        placeholder="Select your answer"
        label={label}
        options={options}
        onIcChange={(e) => {
          setValue(`${name}.rating`, e.detail.value as string, {
            shouldDirty: true,
          });
          setValue(`${name}.label`, label);
          flush();
        }}
        {...register(`${name}.rating`)}
      />
      {rating &&
        !options.find((o) => o.value === rating)?.hideAdditionalComments && (
          <Textbox
            placeholder="Additional comments"
            {...register(`${name}.comments`)}
          />
        )}
    </div>
  );
};
