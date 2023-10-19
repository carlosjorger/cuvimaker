import { defineStore } from 'pinia';
import { Section } from '../models/Section';
import { Subsection } from '../models/Subsection';
import { copySection } from '../extensions/extensions';
import type { SectionTemplate } from '../models/SectionTemplate';
type SectionStoreState = {
	section: Section;
	editingIndex: number;
	count: number;
};
export const useSectionStore = defineStore('section', {
	state: (): SectionStoreState => ({
		section: new Section(),
		editingIndex: -1,
		count: 0,
	}),
	getters: {
		subsectionEditing(): boolean {
			return this.editingIndex != -1;
		},
		lastSubsectionIndex(): number {
			return this.section.subsections.length - 1;
		},
	},
	actions: {
		setSection(section: Section) {
			const sectionCopy = copySection(section);
			if (sectionCopy) {
				this.section = sectionCopy;
			}
		},
		clear() {
			this.editingIndex = -1;
			this.section = new Section();
		},
		disabledEditing() {
			this.editingIndex = -1;
		},
		setEditingIndex(index: number) {
			this.editingIndex = index;
		},
		addNewSubsection() {
			this.section.subsections[this.lastSubsectionIndex].last = false;
			this.count++;
			this.editingIndex = this.lastSubsectionIndex;
			this.section.subsections.push(new Subsection(this.count));
		},
		setSubsection(index: number, subsection: Subsection) {
			this.section.subsections[index] = subsection;
		},
		setTemplate(template: SectionTemplate) {
			this.section.sectionTemplate = template;
		},
		removeSubsection(index: number) {
			if (this.editingIndex == index) {
				this.disabledEditing();
			} else if (this.editingIndex > index) {
				this.editingIndex--;
			}
			this.section.subsections.splice(index, 1);
		},
	},
});
