import {Subsection} from "./Subsection";

export class Section {
  count: number;
  name: string;
  subsections: Subsection[];
  editingIndex: number;

  constructor(name?: string, subsections?: Subsection[]) {
    this.count = 0;
    this.name = name ?? "";
    this.subsections = subsections ?? [new Subsection(this.count)];
    this.editingIndex = -1;
  }
  get subsectionEditing(): boolean {
    return this.editingIndex != -1;
  }
  addNewSubsection() {
    this.subsections[this.subsections.length - 1].last = false;
    this.count++;
    this.editingIndex = this.subsections.length - 1;
    this.subsections.push(new Subsection(this.count));
  }
  removeSubsection(index: number) {
    if (this.editingIndex == index) {
      this.editingIndex = -1;
    }
    this.subsections.splice(index, 1);
  }
}
