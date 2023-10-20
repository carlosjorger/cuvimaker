import { Subsection } from './Subsection';
import '../extensions/extensions';
import { SectionTemplate } from './SectionTemplate';
export class Section {
	name: string;
	subsections: Subsection[];
	sectionTemplate: SectionTemplate;
	constructor(
		name?: string,
		subsections?: Subsection[],
		sectionTemplate?: SectionTemplate
	) {
		this.name = name ?? '';
		this.subsections = subsections ?? [new Subsection(0)];
		this.sectionTemplate = sectionTemplate ?? new SectionTemplate();
		this.name = this.sectionTemplate.isFixedSectionName
			? this.sectionTemplate.sectionTitleName
			: this.name;
	}
}
