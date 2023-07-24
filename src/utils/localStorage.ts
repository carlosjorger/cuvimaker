// TODO: conver into a pinia store

import { Resume } from '../models/Resume';
export function saveResume(resume: Resume) {
	window.localStorage.setItem('resume', JSON.stringify(resume));
}
export function loadResume() {
	const resumeStringFormat = window.localStorage.getItem('resume');

	const resume = JSON.parse(resumeStringFormat ?? '{}', ReviveDateTime);
	if (resume !== '') {
		return Object.assign(new Resume(), resume);
	}
	return new Resume();
}
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
