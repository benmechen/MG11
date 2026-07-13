import { MarkViewContent, MarkViewRendererProps } from "@tiptap/react";
import { useState } from "react";

export const Component = (props: MarkViewRendererProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <span
      className={`${!selected ? "bg-ic-blue-900 hover:bg-ic-blue-1000 text-ic-architectural-white" : "bg-ic-architectural-white text-ic-blue-900 border border-ic-blue-900 select-all"} cursor-pointer px-1 py-0.5 rounded-sm [&>span]:select-all`}
      //   onClick={() => setSelected(!selected)}
      //   on
    >
      <MarkViewContent />
    </span>
  );
};
