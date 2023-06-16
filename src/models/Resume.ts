import { Introduction } from './Introduction';
import type { Section } from './Section';

export class Resume {
    introduction: Introduction;
    sections: Section[];
    constructor() {
        this.introduction = new Introduction();
        this.sections = [];
    }
}
