import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {} from "@tiptap/suggestion";
import { useController } from "react-hook-form";
import { Variable } from "./Variable/index";

interface IEditorProps {
  name: string;
  label?: string;
  helperText?: string;
  onChange?: (content: string) => void;
}

export const Editor = React.forwardRef<HTMLTextAreaElement, IEditorProps>(
  ({ name }: IEditorProps) => {
    const {
      field: { onChange, value },
    } = useController({
      name,
    });

    const editor = useEditor({
      extensions: [StarterKit, Variable], // define your extension array
      content: value, // initial content
      autofocus: true, // focus the editor on mount
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
    });

    return (
      <>
        <EditorContent editor={editor} className="min-h-full" />
      </>
    );
  },
);
