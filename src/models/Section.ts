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
  get lastSubsectionIndex(): number {
    return this.subsections.length - 1;
  }
  addNewSubsection() {
    this.subsections[this.lastSubsectionIndex].last = false;
    this.count++;
    this.editingIndex = this.lastSubsectionIndex;
    this.subsections.push(new Subsection(this.count));
  }
  removeSubsection(index: number) {
    if (this.editingIndex == index) {
      this.disabledEditing();
    } else if (this.editingIndex > index) {
      this.editingIndex--;
    }
    this.subsections.splice(index, 1);
  }
  disabledEditing() {
    this.editingIndex = -1;
  }
}
