import { Subsection } from './Subsection';
import '../extensions/extensions';
import { copySubsection } from '../extensions/extensions';
export class Section {
	count: number;
	name: string;
	subsections: Subsection[];
	editingIndex: number;

	constructor(name?: string, subsections?: Subsection[], count?: number) {
		this.count = count ?? 0;
		this.name = name ?? '';
		this.subsections = subsections?.map((s) => copySubsection(s)) ?? [
			new Subsection(this.count),
		];
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
	setEditingIndex(index: number) {
		this.editingIndex = index;
	}
	disabledEditing() {
		this.editingIndex = -1;
	}
}
