import {SubsectionElement} from "./SubsectionElement";

export class Subsection {
  id: number;
  title: string;
  text: string;
  last: boolean;
  editing: boolean;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  elements: SubsectionElement[];
  count: number;
  constructor(id?: number, title?: string, text?: string) {
    this.id = id ?? 0;
    this.title = title ?? "";
    this.text = text ?? "";
    this.last = true;
    this.editing = true;
    this.elements = [];
    this.count = 0;
  }
  addElement(elementName: string) {
    this.elements.push(new SubsectionElement(this.count++, elementName));
  }
}
