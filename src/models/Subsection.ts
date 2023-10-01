import { SubsectionElement } from './SubsectionElement';
import type { TimeInterval } from './SubsectionTimeInterval';

export class Subsection {
	id: number;
	title: string;
	text: string;
	location: string;
	last: boolean;
	editing: boolean;
	subsectionTimeInterval: TimeInterval | undefined;
	elements: SubsectionElement[];
	count: number;
	constructor(id?: number, title?: string, text?: string, location?: string) {
		this.id = id ?? 0;
		this.title = title ?? '';
		this.text = text ?? '';
		this.location = location ?? '';
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
	addElement(elementName: string) {
		this.elements.push(new SubsectionElement(this.count++, elementName));
	}
}
