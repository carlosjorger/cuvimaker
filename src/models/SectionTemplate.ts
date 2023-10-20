export class SectionTemplate {
	name: string;
	sectionTitleName: string;
	subsectionTitleName: string;
	subtitleName: string;
	isEnableSubtitle: boolean;
	isEnableSite: boolean;
	isEnableList: boolean;
	subsectionElement: string;
	isFixedSectionName: boolean;
	subsectionName: string;
	constructor(
		name = 'Custom',
		sectionTitleName = 'Section Name',
		subsectionTitleName = 'Title',
		subtitleName = 'Subtitle',
		isEnableSubtitle = true,
		isEnableSite = true,
		isEnableList = true,
		subsectionElement = 'element',
		isFixedSectionName = false,
		subsectionName = 'Subsection'
	) {
		this.name = name;
		this.sectionTitleName = sectionTitleName;
		this.subsectionTitleName = subsectionTitleName;
		this.subtitleName = subtitleName;
		this.isEnableSubtitle = isEnableSubtitle;
		this.isEnableSite = isEnableSite;
		this.isEnableList = isEnableList;
		this.subsectionElement = subsectionElement;
		this.isFixedSectionName = isFixedSectionName;
		this.subsectionName = subsectionName;
	}
}
export const sectionTemplates = [
	new SectionTemplate(),
	new SectionTemplate(
		'Work Experience',
		'Work Experience',
		'Company name',
		'Position',
		true,
		true,
		true,
		'description',
		true,
		'work'
	),
	new SectionTemplate(
		'Projects',
		'Projects',
		'Project name',
		'Position',
		false,
		true,
		true,
		'description',
		true,
		'project'
	),
];
