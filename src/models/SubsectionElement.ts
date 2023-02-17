export class SubsectionElement {
  public id: number;
  public name: string;
  constructor(id: number, name?: string) {
    this.id = id;
    this.name = name ?? "";
  }
  copy() {
    return new SubsectionElement(this.id, this.name);
  }
}
