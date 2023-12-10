import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import type { Resume } from '../../models/Resume';
import type { Section } from '../../models/Section';
import { createIntroductionDefinition } from './introductionPDF';
import { creatreSectionDefinition } from './sectionPDF';
import { latoBold } from '../../../public/fonts/Lato';
export function createResumePDFDefinition(
	resume: Resume
): TDocumentDefinitions {
	return {
		content: [
			createIntroductionDefinition(resume.introduction),
			...createSectionsDefinition(resume.sections),
		],
		styles: {
			h1: {
				fontSize: 30,
				bold: true,
				font: 'Lato',
			},
			h2: {
				marginTop: 4,
				fontSize: 22,
				bold: true,
				font: 'Lato',
			},
			h3: {
				fontSize: 17,
				marginTop: 4,
			},
			h4: {
				fontSize: 14,
				marginTop: 3,
				bold: true,
				font: 'Lato',
			},
			h5: {
				fontSize: 12,
				marginTop: 2,
			},
			h6: {
				marginTop: 2,
			},
			introductionColumn: {
				fontSize: 10,
				marginTop: 2,
				marginBottom: 2,
			},
			link: {
				color: 'blue',
			},
			br: {
				background: 'black',
			},
			ul: {
				marginTop: 5,
				marginBottom: 5,
			},
			introduction: {
				marginBottom: 12,
			},
			introductionRow: {
				marginTop: 3,
			},
			introductionColumnsBlock: {
				marginTop: 5,
			},
			timeInterval: {
				marginTop: 3,
			},
			location: {
				marginTop: 5,
			},
		},
	};
}
// TODO: improve design
function createSectionsDefinition(sections: Section[]) {
	return sections.map((section) => creatreSectionDefinition(section));
}

export async function savePDF(resumeDefinition: TDocumentDefinitions) {
	const { createPdf } = await import('pdfmake/build/pdfmake.min');
	const pdfFonts = await import('pdfmake/build/vfs_fonts');

	const vsf =
		pdfFonts && pdfFonts.pdfMake
			? pdfFonts.pdfMake.vfs
			: globalThis.pdfMake.vfs;
	vsf['Lato-Bold.tff'] = latoBold;
	const fonts = {
		Roboto: {
			normal: 'Roboto-Regular.ttf',
			bold: 'Roboto-Medium.ttf',
			italics: 'Roboto-Italic.ttf',
			bolditalics: 'Roboto-MediumItalic.ttf',
		},
		Lato: {
			bold: 'Lato-Bold.tff',
		},
	};
	const pdf = createPdf(resumeDefinition, undefined, fonts, vsf);
	pdf.open();
}
