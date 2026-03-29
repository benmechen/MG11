import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export const Variable = () => {
  return (
    <NodeViewWrapper className="bg-blue-500 p-2 rounded-sm">
      <label contentEditable={false}>React Component</label>

      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
};
