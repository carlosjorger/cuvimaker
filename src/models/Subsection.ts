import { copyElement, copyTimeInterval } from '../extensions/extensions';
import { SubsectionElement } from './SubsectionElement';
import type { TimeInterval } from './SubsectionTimeInterval';

export class Subsection {
	id: number;
	title: string;
	text: string;
	last: boolean;
	editing: boolean;
	subsectionTimeInterval: TimeInterval | undefined;
	elements: SubsectionElement[];
	count: number;
	constructor(id?: number, title?: string, text?: string) {
		this.id = id ?? 0;
		this.title = title ?? '';
		this.text = text ?? '';
		this.last = true;
		this.editing = true;
		this.count = 0;
		this.elements = [];
	}
	get isEmpty(): boolean {
		return (
			(this.title == '' || this.title == undefined) &&
			(this.text == '' || this.text == undefined)
		);
	}
	get hasElements(): boolean {
		return this.elements.length > 0;
	}
	setSubsection(subsection: Subsection) {
		this.title = subsection.title;
		this.text = subsection.text;
		this.last = subsection.last;
		this.editing = subsection.editing;
		this.count = subsection.count;

		this.subsectionTimeInterval = copyTimeInterval(
			subsection.subsectionTimeInterval
		);
		this.elements = subsection.elements.map((element) =>
			copyElement(element)
		);
	}

	addElement(elementName: string) {
		this.elements.push(new SubsectionElement(this.count++, elementName));
	}
}
