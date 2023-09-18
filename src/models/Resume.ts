import { Introduction } from './Introduction';
import type { Section } from './Section';
type Guid = `${string}-${string}-${string}-${string}-${string}`;
export class Resume {
	id: Guid;
	introduction: Introduction;
	sections: Section[];
	constructor() {
		this.id = crypto.randomUUID();
		this.introduction = new Introduction();
		this.sections = [];
	}
}
