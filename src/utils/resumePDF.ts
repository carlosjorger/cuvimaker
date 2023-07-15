import type {
	Column,
	ContentColumns,
	Content,
	TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { Resume } from '../models/Resume';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Introduction } from '../models/Introduction';

const isContentColumns = (content: any): content is ContentColumns => {
	return content;
};

function addIntroductionColumn(
	result: Content[],
	text: string,
	count: number,
	isALink: boolean
) {
	if (count % 3 == 0) {
		result.push({ columns: [{ text: text }] });
	} else {
		const lastColumns = result.pop();
		if (isContentColumns(lastColumns)) {
			const columns = lastColumns as ContentColumns;
			if (isALink) {
				result.push({
					columns: [...columns.columns, { text: text, link: text }],
				});
			} else {
				result.push({ columns: [...columns.columns, { text: text }] });
			}
		}
	}
}
function createIntroductionColumns(introduction: Introduction) {
	const result = [] as Content[];
	let count = 0;
	if (introduction.location) {
		addIntroductionColumn(result, introduction.location, count++, false);
	}
	if (introduction.email) {
		addIntroductionColumn(result, introduction.email, count++, true);
	}
	if (introduction.website) {
		addIntroductionColumn(result, introduction.website, count++, true);
	}
	for (let index = 0; index < introduction.socialAccounts.length; index++) {
		const element = introduction.socialAccounts[index];
		addIntroductionColumn(result, element.link, count++, true);
	}
	return result;
}
export function createResumePDFDefinition(
	resume: Resume
): TDocumentDefinitions {
	return {
		content: [
			{ text: resume.introduction.name, style: 'h1' },
			{ text: resume.introduction.profetion, style: 'h2' },
			...createIntroductionColumns(resume.introduction),
		],
		styles: {
			h1: {
				fontSize: 28,
				bold: true,
			},
			h2: {
				marginTop: 15,
				fontSize: 23,
				bold: true,
			},
		},
	};
}
export function savePDF(resumeDefinition: TDocumentDefinitions) {
	const vsf = pdfFonts.pdfMake.vfs;
	pdfMake.createPdf(resumeDefinition, undefined, undefined, vsf).open();
}
