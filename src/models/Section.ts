export class Section {
  title: string;
  text: string;
  last: boolean;
  editing: boolean;
  isNew: boolean;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  constructor(title: string, text: string) {
    this.title = title;
    this.text = text;
    this.last = true;
    this.editing = true;
    this.isNew = true;
  }
}
