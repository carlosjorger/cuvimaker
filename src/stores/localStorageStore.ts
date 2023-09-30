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
		resume: new Resume('-1'),
	}),
	getters: {
		getResume(): (id: string) => Resume | undefined {
			const resumes = this.loadResumes;
			return (id: string): Resume | undefined =>
				resumes.find((resume) => resume.id === id);
		},
		loadResumes(): Resume[] {
			const resumesStringFormat = window.localStorage.getItem('resumes');
			try {
				const resumes = JSON.parse(
					resumesStringFormat ?? '{}',
					ReviveDateTime
				);
				if (resumes !== '') {
					return Object.assign([new Resume('-1')], resumes) as [
						Resume,
					];
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
		loadResume(id: string) {
			this.resume = new Resume(id);
			const resumes = this.loadResumes;
			this.resume =
				resumes.find((resume) => resume.id === id) ?? this.resume;
		},
		clearResume(id: string) {
			const newResume = new Resume(id);
			const resumes = this.loadResumes;
			const resumeIndex = resumes.findIndex((r) => r.id === id);
			if (resumeIndex >= 0) {
				resumes[resumeIndex] = newResume;
			} else {
				resumes.push(newResume);
			}
			window.localStorage.setItem('resumes', JSON.stringify(resumes));
		},
		saveResume(resume: Resume) {
			const resumes = this.loadResumes;
			const resumeIndex = resumes.findIndex((r) => r.id === resume.id);
			if (resumeIndex >= 0) {
				resumes[resumeIndex] = resume;
			} else {
				resumes.push(resume);
			}
			window.localStorage.setItem('resumes', JSON.stringify(resumes));
		},
	},
});
