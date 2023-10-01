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

const loadResumes = (): Resume[] => {
	const resumesStringFormat = window.localStorage.getItem('resumes');
	try {
		const resumes = JSON.parse(resumesStringFormat ?? '{}', ReviveDateTime);
		if (resumes !== '') {
			return Object.assign([new Resume('-1')], resumes) as [Resume];
		}
	} catch (error) {
		if (typeof error === 'string') {
			console.log('Error: ', error.toUpperCase());
		} else if (error instanceof Error) {
			console.log('Error: ', error.message);
		}
	}
	return [] as Resume[];
};
export const getResume = (id: string) => {
	const resumes = loadResumes();
	return resumes.find((resume) => resume.id === id);
};
export const clearResume = (id: string) => {
	const newResume = new Resume(id);
	const resumes = loadResumes();
	const resumeIndex = resumes.findIndex((r) => r.id === id);
	if (resumeIndex >= 0) {
		resumes[resumeIndex] = newResume;
	} else {
		resumes.push(newResume);
	}
	window.localStorage.setItem('resumes', JSON.stringify(resumes));
};
export const loadResume = (id: string) => {
	const resume = new Resume(id);
	const resumes = loadResumes();
	return resumes.find((resume) => resume.id === id) ?? resume;
};
export const saveResumeInLocalStorage = (resume: Resume) => {
	const resumes = loadResumes();
	const resumeIndex = resumes.findIndex((r) => r.id === resume.id);
	if (resumeIndex >= 0) {
		resumes[resumeIndex] = resume;
	} else {
		resumes.push(resume);
	}
	window.localStorage.setItem('resumes', JSON.stringify(resumes));
};
