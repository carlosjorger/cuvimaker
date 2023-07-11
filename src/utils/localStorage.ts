import { Resume } from '../models/Resume';
export function saveResume(resume: Resume) {
	window.localStorage.setItem('resume', JSON.stringify(resume));
}
export function loadResume() {
	const resumeStringFormat = window.localStorage.getItem('resume');

	const resume = JSON.parse(resumeStringFormat ?? '{}');
	if (resume !== '') {
		return Object.assign(new Resume(), resume);
	}
	return new Resume();
}
