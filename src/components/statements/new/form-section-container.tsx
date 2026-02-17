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
    className={`grow w-full p-4 bg-ic-architectural-40 dark:bg-ic-architectural-700 flex justify-center ${className}`}
  >
    <IcSectionContainer
      className="w-full md:w-2/3 h-full bg-ic-architectural-white dark:bg-ic-background-primary rounded-lg p-4"
      aligned="center"
    >
      {children}
    </IcSectionContainer>
  </div>
);
