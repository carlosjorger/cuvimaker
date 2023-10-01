import type { Column, Content, ContentColumns } from 'pdfmake/interfaces';
import { getInfoFromUrl } from '../urlService';
import { getIconByUrl } from '../urlService';
import type { Introduction } from '../../models/Introduction';

const enum IntroductionColumnType {
	email,
	link,
	text,
}

export function createIntroductionDefinition(
	introduction: Introduction
): Column {
	return {
		stack: [
			{ text: introduction.name, style: 'h1' },
			{ text: introduction.profetion, style: 'h2' },
			createIntroductionColumnsDefinition(introduction),
		],
		style: ['introduction'],
	};
}
function createIntroductionColumnsDefinition(
	introduction: Introduction
): Content {
	return {
		stack: createIntroductionColumns(introduction),
		style: ['introductionColumnsBlock'],
	};
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
function addIntroductionColumn(
	result: Content[],
	text: string,
	count: number,
	introductionColumnType: IntroductionColumnType,
	iconType?: string
) {
	const svgColumn = getSocialAccountSvgIconColumn(iconType);
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
function getSocialAccountSvgIconColumn(iconType?: string): Column | undefined {
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
