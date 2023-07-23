import type {
	ContentColumns,
	Content,
	Column,
	TDocumentDefinitions,
	TFontDictionary,
	ContentSvg,
} from 'pdfmake/interfaces';
import type { Resume } from '../models/Resume';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { Introduction } from '../models/Introduction';
import { getInfoFromUrl } from './urlService';
import type { Section } from '../models/Section';
import type { Subsection } from '../models/Subsection';
import type { SubsectionElement } from '../models/SubsectionElement';
import type { TimeInterval } from '../models/SubsectionTimeInterval';
import { getIconByUrl } from '../utils/urlService';

const dateRange =
	'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24" class="iconify iconify--mdi"><path fill="currentColor" d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10Z"/></svg>';
const enum IntroductionColumnType {
	email,
	link,
	text,
}
const isContentColumns = (
	content: Content | undefined
): content is ContentColumns => {
	return Boolean(content);
};
function createIntroductionColumn(
	link: string,
	introductionColumnType: IntroductionColumnType
): Column {
	const urlInfo = getInfoFromUrl(link);
	if (introductionColumnType == IntroductionColumnType.link) {
		return {
			text: urlInfo,
			link: link,
			style: ['introductionColumn', 'link'],
		};
	} else if (introductionColumnType == IntroductionColumnType.email) {
		return {
			text: urlInfo,
			link: `mailto:${link}`,
			style: ['introductionColumn', 'link'],
		};
	} else {
		return { text: urlInfo, style: 'introductionColumn' };
	}
}
function getSVGIconColunm(svg: string): Column {
	return {
		columns: [
			{
				svg: svg,
				style: ['html-svg'],
			},
		],
		width: 20,
	};
}
function getSocialAccountSVGIconColumn(iconType?: string): Column | undefined {
	const svgElement = iconType ? document.getElementById(iconType) : undefined;
	if (svgElement && svgElement instanceof SVGSVGElement) {
		svgElement.setAttribute('width', '15');
		svgElement.setAttribute('height', '15');
	}
	const svg = iconType
		? document.getElementById(iconType)?.outerHTML
		: undefined;
	if (svg) {
		return getSVGIconColunm(svg);
	}
}
function addIntroductionColumn(
	result: Content[],
	text: string,
	count: number,
	introductionColumnType: IntroductionColumnType,
	iconType?: string
) {
	const svgColumn = getSocialAccountSVGIconColumn(iconType);
	const column = createIntroductionColumn(text, introductionColumnType);
	let currentColumns = [column];
	if (svgColumn) {
		currentColumns = [svgColumn, ...currentColumns];
	}
	const lastColumn: ContentColumns = {
		columns: currentColumns,
	};
	if (count % 3 == 0) {
		result.push({
			columns: [lastColumn],
			style: ['introductionRow'],
		});
	} else {
		const lastColumns = result.pop();
		if (isContentColumns(lastColumns)) {
			const columns = lastColumns as ContentColumns;
			result.push({
				columns: [...columns.columns, lastColumn],
				style: ['introductionRow'],
			});
		}
	}
}
function createIntroductionColumns(introduction: Introduction) {
	const columns = [] as Content[];
	let count = 0;
	if (introduction.location) {
		addIntroductionColumn(
			columns,
			introduction.location,
			count++,
			IntroductionColumnType.text,
			'location'
		);
	}
	if (introduction.email) {
		addIntroductionColumn(
			columns,
			introduction.email,
			count++,
			IntroductionColumnType.email,
			'email'
		);
	}
	if (introduction.website) {
		addIntroductionColumn(
			columns,
			introduction.website,
			count++,
			IntroductionColumnType.link,
			'website'
		);
	}
	for (let index = 0; index < introduction.socialAccounts.length; index++) {
		const element = introduction.socialAccounts[index];
		addIntroductionColumn(
			columns,
			element.link,
			count++,
			IntroductionColumnType.link,
			getIconByUrl(element.link)
		);
	}
	return columns;
}
function createElementsDefinition(elements: SubsectionElement[]) {
	return {
		ul: elements.map((element) => ({ text: element.name })),
		style: 'ul',
	};
}
function createDateDefinition(date: Date) {
	const mount =
		date.toLocaleString('en-US', {
			month: 'long',
		}) ?? '';
	const year = date?.getFullYear().toString() ?? '';
	const simplificedDate = `${mount} ${year}`;
	return simplificedDate;
}
function createSubsectionTimeIntervalDefinition(
	timeInterval: TimeInterval | undefined
): Content {
	let interval = '';
	const result = [] as Column[];
	if (!timeInterval) {
		return { columns: [] };
	}
	if (timeInterval.dateFrom || timeInterval.dateTo) {
		result.push(getSVGIconColunm(dateRange));
	}
	if (timeInterval.dateFrom) {
		interval += createDateDefinition(timeInterval.dateFrom);
	}
	interval += ' - ';
	if (timeInterval.dateTo) {
		interval += createDateDefinition(timeInterval.dateTo);
	}
	result.push({ text: interval, style: 'h5' });
	return { columns: result };
}
function createSubsectionDefinition(subsection: Subsection): Content {
	const result = [{ text: subsection.title, style: 'h3' }] as Content[];
	if (subsection.text) {
		result.push({ text: subsection.text, style: 'h4' });
	}
	result.push(
		createSubsectionTimeIntervalDefinition(
			subsection.subsectionTimeInterval
		)
	);

	result.push(createElementsDefinition(subsection.elements));
	return result;
}
function createSubsectionsDefinition(subsections: Subsection[]): Content {
	const allSubsectionsDoesntHaveChildrens = subsections.every(
		(subsection) => subsection.elements.length == 0
	);
	if (allSubsectionsDoesntHaveChildrens) {
		return {
			ul: subsections.map((subsection) => ({ text: subsection.title })),
			style: 'ul',
		};
	} else {
		return subsections.map((subsection) =>
			createSubsectionDefinition(subsection)
		);
	}
}
function creatreSectionDefinition(section: Section): Content {
	return [
		{ text: section.name, style: 'h2' },
		{
			margin: [0, 3, 0, 3],
			canvas: [
				{
					type: 'line',
					x1: 0,
					y1: 0,
					x2: 514,
					y2: 0,
					lineWidth: 2,
					lineColor: '#000000',
				},
			],
		},
		createSubsectionsDefinition(section.subsections),
	];
}
function creatreSectionsDefinition(sections: Section[]) {
	return sections.map((section) => creatreSectionDefinition(section));
}
function createIntroductionColumnsDefinition(
	introduction: Introduction
): Content {
	return {
		stack: createIntroductionColumns(introduction),
		style: ['introductionColumnsBlock'],
	};
}
function createIntroductionDefinition(introduction: Introduction): Column {
	return {
		stack: [
			{ text: introduction.name, style: 'h1' },
			{ text: introduction.profetion, style: 'h2' },
			createIntroductionColumnsDefinition(introduction),
		],
		style: ['introduction'],
	};
}
export function createResumePDFDefinition(
	resume: Resume
): TDocumentDefinitions {
	return {
		content: [
			createIntroductionDefinition(resume.introduction),
			...creatreSectionsDefinition(resume.sections),
		],
		styles: {
			h1: {
				fontSize: 28,
				bold: true,
			},
			h2: {
				marginTop: 8,
				fontSize: 23,
				bold: true,
				marginBottom: 2,
			},
			h3: {
				fontSize: 18,
				marginTop: 6,
				bold: true,
			},
			h4: {
				fontSize: 15,
				marginTop: 5,
			},
			h5: {
				fontSize: 12,
				marginTop: 5,
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
		},
	};
}
export function savePDF(resumeDefinition: TDocumentDefinitions) {
	const fonts: TFontDictionary = {
		Fontello: {
			normal: 'public/fonts/fontello.ttf',
			bold: 'public/fonts/fontello.ttf',
			italics: 'public/fonts/fontello.ttf',
			bolditalics: 'public/fonts/fontello.ttf',
		},
		Roboto: {
			normal: 'Roboto-Regular.ttf',
			bold: 'Roboto-Medium.ttf',
			italics: 'Roboto-Italic.ttf',
			bolditalics: 'Roboto-Italic.ttf',
		},
		FontAwesome: {
			normal: 'FontAwesome.ttf',
			bold: 'FontAwesome.ttf',
			italics: 'FontAwesome.ttf',
			bolditalics: 'FontAwesome.ttf',
		},
	};
	const vsf = pdfFonts.pdfMake.vfs;
	pdfMake.createPdf(resumeDefinition, undefined, fonts, vsf).open();
}
