import { Introduction } from './Introduction';
import { Section } from './Section';

export class Resume {
    introduction: Introduction;
    sections: Section[];
    constructor() {
        this.introduction = new Introduction();
        this.sections = [];
    }
}
