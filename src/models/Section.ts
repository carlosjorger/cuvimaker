import { Subsection } from './Subsection';
import '../extensions/extensions';
import { SectionTemplate } from './SectionTemplate';
export class Section {
	name: string;
	subsections: Subsection[];
	sectionTemplate: SectionTemplate;
	constructor(name?: string, subsections?: Subsection[]) {
		this.name = name ?? '';
		this.subsections = subsections ?? [new Subsection(0)];
		this.sectionTemplate = new SectionTemplate();
	}
}
