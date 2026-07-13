import { InputRule, Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { VariableView } from "./view";

export const Variable = Node.create({
  name: "variable",

  inline: true,
  atom: true,
  selectable: true,
  group: "inline",

  addAttributes() {
    return {
      id: {},
      label: {},
      value: {},
      fieldType: {
        default: "text",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "variable",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["variable", mergeAttributes(HTMLAttributes), 0];
  },

  addInputRules() {
    return [
      new InputRule({
        find: /\{\{([^}]+)\}\}$/,
        handler: ({ state, range, match }) => {
          const variable = match[1].trim();

          const attributes = {
            id: variable,
            label: variable,
            value: variable,
            fieldType: "text",
          };

          const { tr } = state;
          tr.replaceWith(range.from, range.to, this.type.create(attributes));
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariableView);
  },
});
