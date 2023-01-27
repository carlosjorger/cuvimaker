export class Subsection {
  id: number;
  title: string;
  text: string;
  last: boolean;
  editing: boolean;
  isNew: boolean;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  description: string;
  elements: String[];

  constructor(id?: number, title?: string, text?: string) {
    this.id = id ?? 0;
    this.title = title ?? "";
    this.text = text ?? "";
    this.last = true;
    this.editing = true;
    this.isNew = true;
    this.description = "";
    this.elements = [];
  }
}
