export class SectionTemplate {
	sectionTitleName: string;
	subsectionTitleName: string;
	subtitleName: string;
	isEnableSubtitle: boolean;
	isEnableSite: boolean;
	isEnableList: boolean;
	subsectionElement: string;
	constructor(
		sectionTitleName = 'Section Name',
		subsectionTitleName = 'Title',
		subtitleName = 'Subtitle',
		isEnableSubtitle = true,
		isEnableSite = true,
		isEnableList = true,
		subsectionElement = 'element'
	) {
		this.sectionTitleName = sectionTitleName;
		this.subsectionTitleName = subsectionTitleName;
		this.subtitleName = subtitleName;
		this.isEnableSubtitle = isEnableSubtitle;
		this.isEnableSite = isEnableSite;
		this.isEnableList = isEnableList;
		this.subsectionElement = subsectionElement;
	}
}
