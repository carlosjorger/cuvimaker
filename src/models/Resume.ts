import { Introduction } from './Introduction';
import type { Section } from './Section';

export class Resume {
	introduction: Introduction;
	isBeingEditingIntroduction: boolean;
	sections: Section[];
	constructor() {
		this.introduction = new Introduction();
		this.sections = [];
		this.isBeingEditingIntroduction = true;
	}
}
