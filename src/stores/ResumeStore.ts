import { defineStore } from 'pinia';
import { Resume } from '../models/Resume';
type ResumeStoreStatus = {
	resume: Resume;
	isBeingEditingIntroduction: boolean;
};
export const useResumeStore = defineStore('resume', {
	state: (): ResumeStoreStatus => ({
		resume: new Resume(),
		isBeingEditingIntroduction: false,
	}),
	actions: {
		deleteSection(index: number) {
			this.resume.sections.splice(index, 1);
		},
		setResume(resume: Resume) {
			this.resume = resume;
		},
	},
});
