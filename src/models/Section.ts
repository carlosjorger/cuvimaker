import { Subsection } from './Subsection';
import '../extensions/extensions';
export class Section {
	name: string;
	subsections: Subsection[];

	constructor(name?: string, subsections?: Subsection[]) {
		this.name = name ?? '';
		this.subsections = subsections ?? [new Subsection(0)];
	}
}
