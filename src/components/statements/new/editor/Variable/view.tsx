import { NodeViewWrapper, ReactNodeViewProps } from "@tiptap/react";
import { useState } from "react";

export const VariableView = ({
  node,
  updateAttributes,
}: ReactNodeViewProps) => {
  const [editing, setEditing] = useState(false);

  const { value, fieldType } = node.attrs;

  console.log("VariableView node.attrs:", node.attrs); // Log the node attributes

  if (editing) {
    return (
      <NodeViewWrapper as="span">
        <input
          autoFocus
          type={fieldType === "date" ? "date" : "text"}
          defaultValue={value}
          onBlur={(e) => {
            updateAttributes({
              value: e.target.value,
            });

            setEditing(false);
          }}
        />
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      as="span"
      className="bg-ic-blue-900 hover:bg-ic-blue-1000 text-ic-architectural-white px-1 py-0.5 rounded-sm"
      onClick={() => setEditing(true)}
    >
      Test content
      {value}
    </NodeViewWrapper>
  );
};
