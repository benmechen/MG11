import { IcTypography } from "@ukic/react";
import { useGetTemplates } from "../../hooks/useGetTemplates";
import { TemplateCard } from "./template-card";

interface ITemplateCard {
  onCardClick?: (id?: number) => void;
}
export const TemplateGrid = ({ onCardClick }: ITemplateCard) => {
  const templates = useGetTemplates();

  if (!templates || templates.length === 0)
    return (
      <div className="">
        <IcTypography>No templates found</IcTypography>
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((template) => (
        <TemplateCard
          id={template.id}
          name={template.name}
          description={template.description}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};
