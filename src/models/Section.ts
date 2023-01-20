export class Section {
  count: number;
  name: string;
  description: string;
  constructor(name?: string, description?: string) {
    this.count = 0;
    this.name = name ?? "";
    this.description = description ?? "";
  }
}
