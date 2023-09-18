import type { Column, Content } from 'pdfmake/interfaces';

import type { Section } from '../../models/Section';
import type { Subsection } from '../../models/Subsection';
import type { SubsectionElement } from '../../models/SubsectionElement';
import type { TimeInterval } from '../../models/SubsectionTimeInterval';
const dateRange =
	'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="15" height="15" viewBox="0 0 22 22" class="iconify iconify--mdi"><path fill="currentColor" d="M8 14q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm4 0q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm4 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14ZM5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10Z"/></svg>';

export function creatreSectionDefinition(section: Section): Content {
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
function createSubsectionsDefinition(subsections: Subsection[]): Content {
	const allSubsectionsDoesntHaveChildrens = subsections.every(
		(subsection) => subsection.elements.length == 0
	);
	if (allSubsectionsDoesntHaveChildrens) {
		return {
			ul: subsections.map((subsection) =>
				createSubsectionDefinitionWhitoutElements(subsection)
			),
			style: 'ul',
		};
	} else {
		return subsections.map((subsection) =>
			createSubsectionDefinition(subsection)
		);
	}
}
function createSubsectionDefinitionWhitoutElements(
	subsection: Subsection
): Content {
	const result = [{ text: subsection.title, style: 'h4' }] as Content[];
	if (subsection.text) {
		result.push({ text: subsection.text, style: 'h5' });
	}
	result.push(
		createSubsectionTimeIntervalDefinition(
			subsection.subsectionTimeInterval
		)
	);
	return result;
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
	return { columns: result, style: ['timeInterval'] };
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
function createElementsDefinition(elements: SubsectionElement[]) {
	return {
		ul: elements.map((element) => ({ text: element.name, style: 'h6' })),
		style: 'ul',
	};
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