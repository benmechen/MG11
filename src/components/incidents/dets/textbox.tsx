import React from "react";
import { IcTypography } from "@ukic/react";

interface ITextboxProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
}

export const Textbox = React.forwardRef<HTMLTextAreaElement, ITextboxProps>(
  ({ label, helperText, ...props }: ITextboxProps, ref) => (
    <div className="pr-4">
      {label && <IcTypography variant="label">{label}</IcTypography>}
      {helperText && (
        <IcTypography
          variant="caption"
          className="text-ic-color-text-secondary"
        >
          {helperText}
        </IcTypography>
      )}
      <textarea
        {...props}
        ref={ref}
        className="pt-2 px-2 caret-ic-text-field-typing-cursor w-full text-ic-text-field-text"
        style={{
          font: "inherit",
        }}
      />
    </div>
  ),
);
