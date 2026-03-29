import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

interface IEditor {
  value?: string;
  onChange?: (value: string) => void;
}
const Editor = ({ value, onChange }: IEditor) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    // content: value,
    content: `
    <p>
      This is still the text editor you're used to, but enriched with node views.
    </p>
    <react-component>
      <p>This is editable. You can create a new component by pressing Mod+Enter.</p>
    </react-component>
    <p>
      Did you see that? That's a React component. We are really living in the future.
    </p>
    `,

    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;

      editor.getJSON();
    },
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
