import { Introduction } from './Introduction';
import type { Section } from './Section';
export class Resume {
	id: string;
	introduction: Introduction;
	sections: Section[];
	constructor(id: string) {
		this.id = id;
		this.introduction = new Introduction();
		this.sections = [];
	}
}
