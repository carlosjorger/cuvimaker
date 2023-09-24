import { defineStore } from 'pinia';
import { Resume } from '../models/Resume';
import { Section } from '../models/Section';
import { copySection } from '../extensions/extensions';
type ResumeStoreStatus = {
	resume: Resume;
	isBeingEditingIntroduction: boolean;
};
export const useResumeStore = defineStore('resume', {
	state: (): ResumeStoreStatus => ({
		resume: new Resume('-1'),
		isBeingEditingIntroduction: false,
	}),
	getters: {
		anySectionWithThisName() {
			const sections = this.resume.sections;
			return (index: number | undefined, sectionName: string) =>
				!sections.some((s, i) => i != index && s.name == sectionName);
		},
		getSection() {
			return (index: number) => this.resume.sections[index];
		},
	},
	actions: {
		deleteSection(index: number) {
			this.resume.sections.splice(index, 1);
		},
		addSection(section: Section) {
			this.resume.sections.push(section);
		},

		setSection(index: number, section: Section) {
			this.resume.sections[index] = copySection(section);
		},
		setResume(resume: Resume) {
			this.resume = resume;
		},
	},
});
