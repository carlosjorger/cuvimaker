import { Section } from '../models/Section';
import { Subsection } from '../models/Subsection';
import { SubsectionElement } from '../models/SubsectionElement';
import { TimeInterval } from '../models/SubsectionTimeInterval';

export function copySection(section?: Section) {
	if (section) {
		return new Section(
			section.name,
			section.subsections?.map((s) => copySubsection(s)) ?? [
				new Subsection(0),
			]
		);
	}
}
export function copySubsection(subsection: Subsection) {
	const result = new Subsection(
		subsection.id,
		subsection.title,
		subsection.text
	);
	result.last = subsection.last;
	result.editing = subsection.editing;
	result.count = subsection.count;
	result.subsectionTimeInterval = copyTimeInterval(
		subsection.subsectionTimeInterval
	);
	result.elements = subsection.elements.map((element) =>
		copyElement(element)
	);
	return result;
}
export function copyTimeInterval(subsectionTimeInterval?: TimeInterval) {
	if (subsectionTimeInterval) {
		return new TimeInterval(
			subsectionTimeInterval.dateFrom,
			subsectionTimeInterval.dateTo
		);
	}
}
export function copyElement(subsectionElement: SubsectionElement) {
	return new SubsectionElement(subsectionElement.id, subsectionElement.name);
}
export function isEmptySubsection(subsection: Subsection) {
	return (
		(subsection.title == '' || subsection.title == undefined) &&
		(subsection.text == '' || subsection.text == undefined)
	);
}
