import { AppDB } from "../../db";
import { TemplateDto } from "./templateDto";

export class TemplateService {
  constructor(private db: AppDB) {}

  async create(template: TemplateDto) {
    const id = await this.db.templates.add({
      ...template,
      created: Date.now(),
      fields: [],
    });
    return id;
  }

  async getAll() {
    return await this.db.templates.toArray();
  }

  async getById(id: number | string) {
    if (Number.isNaN(Number(id))) {
      throw new Error("Invalid template ID");
    }
    return await this.db.templates.get(Number(id));
  }

  async update(id: number | string, updates: Partial<TemplateDto>) {
    if (Number.isNaN(Number(id))) {
      throw new Error("Invalid template ID");
    }
    await this.db.templates.update(Number(id), updates);
  }

  async delete(id: number | string) {
    if (Number.isNaN(Number(id))) {
      throw new Error("Invalid template ID");
    }
    await this.db.templates.delete(Number(id));
  }
}
