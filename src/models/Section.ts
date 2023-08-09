import { Subsection } from './Subsection';
import '../extensions/extensions';
import { copySubsection } from '../extensions/extensions';
export class Section {
	name: string;
	subsections: Subsection[];

	constructor(name?: string, subsections?: Subsection[]) {
		this.name = name ?? '';
		this.subsections = subsections?.map((s) => copySubsection(s)) ?? [
			new Subsection(0),
		];
	}
}
