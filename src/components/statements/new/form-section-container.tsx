import { IcSectionContainer } from "@ukic/react";

interface IFormSectionContainer {
  children: React.ReactNode;
  className?: string;
}
export const FormSectionContainer = ({
  children,
  className,
}: IFormSectionContainer) => (
  <div
    className={`grow w-full p-4 bg-ic-architectural-40 flex justify-center ${className}`}
  >
    <IcSectionContainer className="w-2/3 h-full bg-ic-architectural-white rounded-lg p-4">
      {children}
    </IcSectionContainer>
  </div>
);
