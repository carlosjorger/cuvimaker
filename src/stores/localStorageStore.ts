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

export const useLocalStorageStore = defineStore('localStorageStore', {
	state: () => ({
		resume: new Resume(),
	}),
	actions: {
		loadResume() {
			const resumeStringFormat = localStorage.getItem('resume');
			try {
				const resume = JSON.parse(
					resumeStringFormat ?? '{}',
					ReviveDateTime
				);
				if (resume !== '') {
					this.resume = Object.assign(new Resume(), resume) as Resume;
				}
			} catch (error) {
				if (typeof error === 'string') {
					console.log('Error: ', error.toUpperCase());
				} else if (error instanceof Error) {
					console.log('Error: ', error.message);
				}
			}
		},
		saveResume(resume: Resume) {
			localStorage.setItem('resume', JSON.stringify(resume));
		},
	},
});
