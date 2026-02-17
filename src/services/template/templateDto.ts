import Template from "../../db/models/template";

export interface TemplateDto
  extends Omit<Template, "id" | "table" | "db" | "created" | "fields"> {}
