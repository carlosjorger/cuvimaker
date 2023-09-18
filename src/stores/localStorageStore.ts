import { defineStore } from 'pinia';
import { Resume } from '../models/Resume';

function ReviveDateTime(key: unknown, value: unknown): unknown {
	if (typeof value === 'string') {
		const date =
			/^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)$/.exec(
				value
			);
		if (date) {
			return new Date(date[0]);
		}
	}

	return value;
}
type LocalStorageStoreState = {
	resume: Resume;
};
export const useLocalStorageStore = defineStore('localStorageStore', {
	state: (): LocalStorageStoreState => ({
		resume: new Resume(),
	}),
	getters: {
		loadResumes(): Resume[] {
			const resumesStringFormat = localStorage.getItem('resumes');
			try {
				const resumes = JSON.parse(
					resumesStringFormat ?? '{}',
					ReviveDateTime
				);
				if (resumes !== '') {
					return Object.assign([new Resume()], resumes) as [Resume];
				}
			} catch (error) {
				if (typeof error === 'string') {
					console.log('Error: ', error.toUpperCase());
				} else if (error instanceof Error) {
					console.log('Error: ', error.message);
				}
			}
			return [] as Resume[];
		},
	},
	actions: {
		loadResume() {
			//TODO: add guid parameter to the function
			const guid = '5fb8ab5b-de3a-4edf-b84c-2570aeea9b29';
			const resumes = this.loadResumes;

			this.resume =
				resumes.find((resume) => resume.id === guid) ?? this.resume;
		},
		saveResume(resume: Resume) {
			//TODO: take in account that a resume doest exists
			const resumes = this.loadResumes;
			const resumeIndex = resumes.findIndex((r) => r.id === resume.id);
			if (resumeIndex >= 0) {
				resumes[resumeIndex] = resume;
			} else {
				resumes.push(resume);
			}
			console.log(resumes, resumeIndex);
			localStorage.setItem('resumes', JSON.stringify(resumes));
		},
	},
});
